"use client"

import { handleGetMyProjects } from "@/app/actions/projects"
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



interface MyProjectsType {
  id: number;
  name: string;
  description: string;
  contributable: boolean;
  link: string | null;
  bumps: number;
  userId: number;
}

export default function MyProjects() {
  const [projects, setProjects] = useState<MyProjectsType[]>([])

  useEffect(() => {
    (async function () {
      const response = await handleGetMyProjects()
      if (response) setProjects(response)
    }())
  }, [])

  if (projects.length === 0) {
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
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  )

}