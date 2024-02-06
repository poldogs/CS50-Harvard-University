import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { useSearchParams } from "next/navigation";

export const GET = async (req) => {
    try {
        const url = new URL(req.url)

        const taskId = url.searchParams.get("taskId")

        const subTasks = await prisma.subTask.findMany({
            where: {
                taskId: taskId,
            },
        });

        return NextResponse.json(subTasks);
    } catch (error) {
        console.log(error)
        return NextResponse.status(500).json({message: error.message});
    }
}

export const POST = async (req) => {
    try {
        const body = await req.json();
        const { title, deadLine, taskId } = body;

        const newSubTask = await prisma.subTask.create({
            data: {
                title : title,
                deadLine : deadLine + 'T23:59:59Z',
                taskId: taskId,
            }
        });

        return NextResponse.json(newSubTask);
    } catch (error) {
        console.log(error)
        return NextResponse.status(500).json({message: error.message});
    }
}