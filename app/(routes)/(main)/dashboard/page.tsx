import { handleGetAllProjects } from "@/app/actions/projects"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface ProjectsType {
    id: number;
    name: string;
    description: string;
    contributable: boolean;
    contributionLink: string | null;
    projectLink: string;
    bumps: number;
    userId: number;
    tags: {
        id: number;
        name: string;
    }[];
}

export default async function Dashboard() {
    // const [projects, setProjects] = useState<ProjectsType[]>([])
    // useEffect(() => {
    //     (async function () {
    //         const response = await handleGetAllProjects()
    //         setProjects(response)
    //     }())

    // }, [])
    const projects = await handleGetAllProjects()
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full p-6">
            {projects.map((project:ProjectsType) => (
                <Card className="bg-green-100 shadow-md rounded-lg" key={project.id}>
                    <CardHeader>
                    {project.contributable && <Badge className="bg-red-500 hover:bg-red-600 text-white text-left flex justify-start  w-fit">Contributable</Badge>}
                        <CardTitle className="text-xl font-semibold">{project.name}</CardTitle>
                        <CardDescription className="text-gray-600">{project.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-wrap gap-2 flex-col">


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
                                {/* <Badge className="bg-red-500 text-white py-1 px-3 w-fit">Contributable</Badge> */}
                                <Label className="text-gray-700">Contribute Here</Label>
                                <Link target="_blank"
                                    href={project.contributionLink || "#"}
                                    className="text-green-600 hover:underline truncate"
                                >
                                    {project.contributionLink || "No contribution link"}
                                </Link>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <Badge key={tag.id} className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3">
                                    {tag.name}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>

                    <CardFooter className="p-4">
                        {/* <p className="text-gray-500 text-sm">Project details available above</p> */}
                    </CardFooter>
                </Card>
            ))}
        </div>

    )
}

export const revalidate = 60