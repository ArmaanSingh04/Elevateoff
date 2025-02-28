"use client"

import { handleBump, handleGetMyProjects } from "@/app/actions/projects"
import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface MyProjectsType {
  id: number;
  name: string;
  description: string;
  contributable: boolean;
  contributionLink: string | null;
  projectLink: string;
  bumps: number;
  userId: number;
  lastBumped: Date
}

export default function MyProjects() {
  const [projects, setProjects] = useState<MyProjectsType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  async function getProjects() {
    setLoading(true)
    const response = await handleGetMyProjects()
    if (response) setProjects(response)
    setLoading(false)
  }
  useEffect(() => {
    getProjects()
  }, [])

  if (loading == true) {
    return (
      <div>loading</div>
    )
  }

  if (projects.length === 0 && loading == false) {
    return (
      <div className="p-3">
        <Alert className="bg-blue-300">
          <AlertTitle>No projects found!</AlertTitle>
          <AlertDescription>
            You can add your project by clicking on the upload project button.
          </AlertDescription>
        </Alert>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full p-6">
      {projects.map((project) => (
        <Card className="bg-green-100 shadow-md rounded-lg flex flex-col justify-between" key={project.id}>
          <div>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{project.name}</CardTitle>
            <CardDescription className="text-gray-600">{project.description}</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-3">
            <div className="flex flex-col">
              <Label className="text-gray-700">Project Link </Label>
              <Link target="_blank"
                href={project.projectLink || "#"}
                className="text-blue-600 hover:underline truncate"
              >
                {project.projectLink || "No link available"}
              </Link>
            </div>

            {project.contributable && (
              <div className="flex flex-col gap-2">
                <Badge className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 w-fit">Contributable</Badge>
                <Label className="text-gray-700">Contribute Here</Label>
                <Link target="_blank"
                  href={project.contributionLink || "#"}
                  className="text-green-600 hover:underline truncate"
                >
                  {project.contributionLink || "No contribution link"}
                </Link>
              </div>
            )}
          </CardContent>
          </div>
          <CardFooter className="flex p-4">
            
            {Date.now()-new Date((project.lastBumped)).getTime() > 24*60*60*1000? <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md" onClick={() => {
              handleBump(project.id)
              getProjects()
            }}>
              Bump
            </Button> : <Label className="text-red-500">Bumping will be available in {Math.floor(24 - (Date.now() - new Date(project.lastBumped).getTime()) / (1000 * 60 * 60))} hours</Label>}
            
          </CardFooter>
        </Card>
      ))}
    </div>
  )

}
