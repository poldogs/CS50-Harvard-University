//http://localhost:3000/api/tasks
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const body = await req.json();
        const { title } = body;

        const newTask = await prisma.task.create({
            data: {
                title
            },
        });

        return NextResponse.json(newTask);
    } catch (error) {
        return NextResponse.json({message: error.message}, 500);

    }
}

export const GET = async (req) => {
    try {
        const tasks = await prisma.task.findMany();
        return NextResponse.json(tasks);
    } catch (error) {
        return NextResponse.json({message: error.message}, 500);

    }
}