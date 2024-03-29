//http://localhost:3000/api/tasks/12345
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    try {
        const { id } = params;
        
        const task = await prisma.task.findUnique({
            where: {
                id
            },
        });

        if(!task) {
            return NextResponse.json({message: "Task not found"}, 404);
        }

        return NextResponse.json(task);
    } catch (error) {
        return NextResponse.json({message: error.message}, 500);

    }
}

export const PATCH = async (req, { params }) => {
    try {
        const { id } = params;
        const body = await req.json();
        const { title, desc, deadLine, color } = body;

        const updateTask = await prisma.task.update({
            where: {
                id
            },
            data: {
                title,
                desc,
                deadLine,
                color
            },
        });

        return NextResponse.json(updateTask);
    } catch (error) {
        return NextResponse.json({message: error.message}, 500);

    }
}

export const DELETE = async (req, { params }) => {
    try {
        const { id } = params;

        await prisma.subTask.deleteMany({
            where: {
                taskId: id
            },
        });

        await prisma.task.delete({
            where: {
                id
            },
        });

        return NextResponse.json("Task deleted");
    } catch (error) {
        return NextResponse.json({message: error.message}, 500);

    }
}

export const PUT = async (req, { params }) => {
    try {
        const { id } = params;
        const body = await req.json();
        const { completed } = body;

        const updateTask = await prisma.task.update({
            where: {
                id
            },
            data: {
                completed
            },
        });

        return NextResponse.json(updateTask);
    } catch (error) {
        return NextResponse.json({message: error.message}, 500);

    }
}