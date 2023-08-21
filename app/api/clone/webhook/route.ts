import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

// TO-DO - Make sure CORS is activated

export async function POST(req: NextRequest) {
    const jobId = req.nextUrl.searchParams.get("id");
    if (!jobId) {
        console.log("[CLONE WEBHOOK ERROR]: No jobId found.");
        return new NextResponse("Need id query parameter", { status: 400 });
    }

    const cloneJob = await prismadb.cloneJob.findUnique({ where: { id: jobId } });
    if (!cloneJob) {
        return new NextResponse("No clone jobs found with that id", { status: 400 });
    }

    const body = await req.json();
    const { status, output, error } = body;

    if (!status) {
        console.log("[CLONE WEBHOOK ERROR]: No status found.");
        return new NextResponse("Need status parameter", { status: 400 });
    }
            
    if (output?.statusCode === 400) { // Failed from our error return
        await prismadb.cloneJob.update(
            { where: { id: jobId }, data: { status: "FAILED", message: output?.body ? output.body : "" } }
        );

        // TODO - REFUND the user
    } else {
        if (status === "FAILED" || status === "CANCELLED") { // Failed from RunPod exception

            // TODO - REFUND the user
        }

        await prismadb.cloneJob.update({ where: { id: jobId },  data: { status, message: error ? error : "" } });
    }
    
    if (cloneJob.name) {
        await prismadb.clone.create({
            data: { 
                id: jobId,
                userId: cloneJob.userId, 
                name: cloneJob.name
            }
        });
    } else {
        await prismadb.clone.create({
            data: {
                id: jobId,
                userId: cloneJob.userId,
                name: cloneJob.id // TODO - find a way to fix this (although it should never really matter)
            }
        })
    }

    // TO-DO - Delete all training data / also configure Google Cloud to do this

    return new NextResponse(null, { status: 200 }); // IMPORTANT feedback
}