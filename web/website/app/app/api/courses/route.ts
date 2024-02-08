import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
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
