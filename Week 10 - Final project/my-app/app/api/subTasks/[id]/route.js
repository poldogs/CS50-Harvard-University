//http://localhost:3000/api/subTasks/12345
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    try {
        const { id } = params;
        
        const subTask = await prisma.subTask.findUnique({
            where: {
                id
            },
        });

        if(!subTask) {
            return NextResponse.json({message: "subTask not found"}, 404);
        }

        return NextResponse.json(subTask);
    } catch (error) {
        return NextResponse.json({message: error.message}, 500);

    }
}

export const PATCH = async (req, { params }) => {
    try {
        const { id } = params;

        const currentSubTask = await prisma.subTask.findUnique({
            where: {
                id
            }
        });

        if (!currentSubTask) {
            return NextResponse.json({message: "Subtask not found"}, 404);
        }

        const subTask = await prisma.subTask.update({
            where: {
                id
            },
            data: {
                completed: !currentSubTask.completed
            }
        });

        return NextResponse.json(subTask);
    } catch (error) {
        return NextResponse.json({message: error.message}, 500);
    }
}