"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CourseSchema } from "@/schemas";
import axios from "axios";
import { useState } from "react";

export const CourseDialog = () => {
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<z.infer<typeof CourseSchema>>({
        resolver: zodResolver(CourseSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const onSubmit = (values: z.infer<typeof CourseSchema>) => {
        axios
            .post("/api/courses", {
                title: values.title,
                description: values.description,
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        form.reset();
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="mb-5">Add new course</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>Add a new course</DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-6">
                            <FormField
                                name="title"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-md">
                                            Title
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Title of the course"
                                                type="text"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                            <FormField
                                name="description"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-md">
                                            Description
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Type your description here..."
                                                type="text"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            ></FormField>
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="mt-4">
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
