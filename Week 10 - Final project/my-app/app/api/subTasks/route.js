import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        const subTasks = await prisma.subTask.findMany();
        return NextResponse.json(subTasks);
    } catch (error) {
        return NextResponse.json({message: error.message}, 500);

    }
}

export const POST = async (req) => {
    try {
        const body = await req.json();
        const { title, desc, deadLine, color, taskId } = body;

        const newSubTask = await prisma.subTask.create({
            data: {
                title : title,
                desc : desc,
                deadLine : deadLine + 'T23:59:59Z',
                color : color,
                taskId: taskId
            }
        });

        return NextResponse.json(newSubTask);
    } catch (error) {
        console.log(error)
        return NextResponse.status(500).json({message: error.message});
    }
}