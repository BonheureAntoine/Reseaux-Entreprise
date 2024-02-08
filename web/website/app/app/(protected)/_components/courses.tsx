"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";

export const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios
            .get("/api/courses")
            .then((res) => {
                setCourses(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    });

    return (
        <div>
            <div className="flex flex-col gap-y-6">
                {courses.map((course: any) => (
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
        </div>
    );
};
