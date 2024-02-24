import { NextRequest, NextResponse } from "next/server";
import prisma, { Prisma, PrismaClient } from "@prisma/client";

export async function GET(){
    const prisma:PrismaClient = new PrismaClient();
    const entries = await prisma.entry.findMany();
    return NextResponse.json(entries, {status: 200})
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    const prisma:PrismaClient = new PrismaClient();

    const newEntry = await prisma.entry.create({
        data: {json: body.json}
    })

    return NextResponse.json(newEntry, {status: 200})
    
}