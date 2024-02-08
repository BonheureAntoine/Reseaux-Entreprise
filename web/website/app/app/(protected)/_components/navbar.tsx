"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavBar = () => {
    const pathname = usePathname();
    return (
        <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
            <div className="flex gap-x-2">
                <Button
                    variant={pathname === "/dashboard" ? "default" : "outline"}
                    asChild
                >
                    <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button
                    variant={pathname === "/settings" ? "default" : "outline"}
                    asChild
                >
                    <Link href="/settings">Settings</Link>
                </Button>
            </div>
            <UserButton />
        </nav>
    );
};
