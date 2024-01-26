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