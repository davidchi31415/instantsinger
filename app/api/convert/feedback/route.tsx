import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { 
            jobId, soundsLike, rating, reason, comment
        } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!jobId) return new NextResponse("jobId not found", { status: 400 });

        if (typeof soundsLike !== "boolean") return new NextResponse("soundsLike not valid", { status: 400 });
        if (typeof rating !== "number") return new NextResponse("Rating must be number", { status: 400 });
        if (rating < 1 || rating > 5) return new NextResponse("Rating not valid", { status: 400 });
        if (!soundsLike && !reason) return new NextResponse("Need a reason", { status: 400 });
        if ((comment + '').length > 100) return new NextResponse("Comment too long", { status: 400 });

        const conversion = await prismadb.convertJob.findUnique({ where: { id: jobId }});
        if (!conversion) return new NextResponse("Conversion not found", { status: 400 });

        await prismadb.feedback.create({ data: { 
            type: "CONVERT",
            jobId, soundsLike, rating, reason: soundsLike ? "" : reason, 
            comment, songName: conversion.songName
        }});

        return new NextResponse(
            "Feedback received",
            { status: 200 }
        );
    } catch (error) {
        console.log("[CONVERT FEEDBACK ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}