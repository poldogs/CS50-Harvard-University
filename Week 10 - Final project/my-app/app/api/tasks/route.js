//http://localhost:3000/api/tasks
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const body = await req.json();
        const { title, desc, deadLine, color } = body;

        const newTask = await prisma.task.create({
            data: {
                title : title,
                desc : desc,
                deadLine : deadLine + 'T23:59:59Z',
                color : color,
            }
        });

        return NextResponse.json(newTask);
    } catch (error) {
        console.log(error)
        return NextResponse.status(500).json({message: error.message});
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