import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Courses } from "../_components/courses";
import { CourseDialog } from "../_components/new-course-dialog";

const DashboardPage = async () => {
    return (
        <Card className="w-[600px]">
            <CardHeader className="text-2xl font-semibold flex justify-center items-center flex-row">
                Dashboard
            </CardHeader>
            <CardContent>
                <CourseDialog />
                <ScrollArea className="h-[400px]">
                    <Courses />
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default DashboardPage;
