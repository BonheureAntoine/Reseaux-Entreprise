"use client";

import { SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { settings } from "@/actions/settings";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";

export const SettingsForm = () => {
    const { update, data } = useSession();

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: data?.user.name || "",
            isTwoFactorEnabled: data?.user.isTwoFactorEnabled || false,
        },
    });

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            startTransition(() => {
                settings({
                    name: values.name,
                    isTwoFactorEnabled: values.isTwoFactorEnabled,
                })
                    .then(() => {
                        update();
                        setSuccess("Settings updated");
                    })
                    .catch(() => {
                        setError("Something went wrong! Please try again.");
                    });
            });
        });
    };

    return (
        <Card className="w-[600px]">
            <CardHeader className="text-2xl font-semibold flex justify-center items-center flex-row">
                <Settings className="mr-2 h-8 w-8" />
                Settings
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-6">
                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-md">
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="John Doe"
                                                disabled={isPending}
                                                type="text"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {data?.user.provider !== "github" &&
                                data?.user.provider !== "google" && (
                                    <FormField
                                        name="isTwoFactorEnabled"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row justify-between items-center">
                                                <FormLabel className="text-md">
                                                    Enable Two Factor
                                                    Authentication
                                                </FormLabel>
                                                <FormControl>
                                                    <Switch
                                                        {...field}
                                                        className="ml-2"
                                                        disabled={isPending}
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                        value={
                                                            field.value
                                                                ? "true"
                                                                : "false"
                                                        } // Fix: Convert boolean value to string
                                                        aria-readonly
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full"
                        >
                            Update
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
