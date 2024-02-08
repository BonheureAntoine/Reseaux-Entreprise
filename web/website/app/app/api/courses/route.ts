import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { NextResponse } from "next/server";

const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "10 s"),
});

export async function GET(req: Request) {
    const ip =
        req.headers.get("x-real-ip") ||
        req.headers.get("x-forwarded-for") ||
        "";
    const { success, reset } = await rateLimit.limit(ip);

    if (!success) {
        return new NextResponse("Too many request", { status: 429 });
    }

    try {
        const courses = await db.course.findMany();

        if (!courses) {
            return new NextResponse("No courses found", { status: 404 });
        }
        return NextResponse.json(courses);
    } catch (error) {
        console.log(error);
    }
}

export async function POST(req: Request) {
    try {
        const user = await currentUser();
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { title, description } = await req.json();

        if (!title) {
            return new NextResponse("Name is required", { status: 400 });
        }

        const course = await db.course.create({
            data: {
                title,
                description,
            },
        });

        return NextResponse.json(course);
    } catch (error) {
        console.log(error);
    }
}
