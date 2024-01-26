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