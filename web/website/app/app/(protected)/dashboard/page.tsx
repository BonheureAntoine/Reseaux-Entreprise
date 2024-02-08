import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/db";
import { Course } from "@prisma/client";
import { CourseDialog } from "../_components/new-course-dialog";

const DashboardPage = async () => {
    const courses = await db.course.findMany();

    if (!courses) {
        return (
            <Card className="w-[600px]">
                <CardHeader className="text-2xl font-semibold flex justify-center items-center flex-row">
                    Dashboard
                </CardHeader>
                <CardContent>No courses at the moment</CardContent>
            </Card>
        );
    }
    return (
        <Card className="w-[600px]">
            <CardHeader className="text-2xl font-semibold flex justify-center items-center flex-row">
                Dashboard
            </CardHeader>
            <CardContent>
                <CourseDialog />
                <ScrollArea className="h-[400px]">
                    <div className="flex flex-col gap-y-6">
                        {courses.map((course: Course) => (
                            <Card
                                key={course.id}
                                className="flex flex-row justify-between items-center"
                            >
                                <CardHeader>
                                    {course.title}
                                    <CardDescription>
                                        {course.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="mt-6">
                                    <Button size="lg">Join</Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default DashboardPage;
