import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { updateCredits } from "@/lib/credits";

// TO-DO - Make sure CORS is activated

export async function POST(req: NextRequest) {
    const jobId = req.nextUrl.searchParams.get("id");
    if (!jobId) {
        console.log("[CONVERT WEBHOOK ERROR]: No jobId found.");
        return new NextResponse("Need id query parameter", { status: 400 });
    }

    const job = await prismadb.convertJob.findUnique({ where: { id: jobId } });
    if (!job) {
        console.log("[CONVERT WEBHOOK ERROR]: No job found with id.");
        return new NextResponse("Invalid id", { status: 400 });
    }

    const body = await req.json();
    const { status, output, error } = body;
            
    if (output?.statusCode === 400) { // Failed from our error return
        await prismadb.convertJob.update(
            { where: { id: jobId }, data: { status: "FAILED", message: output?.body ? output.body : "" } }
        );

        // REFUND the user
        await updateCredits({ userId: job.userId, convertDelta: 1 });
    } else if (output?.statusCode === 403) {
        await prismadb.convertJob.update(
            { where: { id: jobId }, data: { status: "FAILED", message: output?.body, 
            userMessage: "Issue downloading song from YouTube. Try another link." } }
        );

        // REFUND the user
        await updateCredits({ userId: job.userId, convertDelta: 1 });
    } else {
        if (status === "FAILED" || status === "CANCELLED" || status === "TIMED_OUT") { // Failed from RunPod exception
            await updateCredits({ userId: job.userId, convertDelta: 1 });
            await prismadb.convertJob.update(
                { where: { id: jobId },  
                data: { status: "FAILED", message: error ? error : "" } 
            });
        } else {
            await prismadb.convertJob.update(
                { where: { id: jobId },  
                data: { status: "COMPLETED" } 
            });
        }
    }

    // TO-DO - Delete input data / also configure Google Cloud to do this

    return new NextResponse(null, { status: 200 }); // IMPORTANT feedback
}