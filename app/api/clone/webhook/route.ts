import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { updateCredits } from "@/lib/credits";

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

        // REFUND the user
        await updateCredits({ userId: cloneJob.userId, convertDelta: 1 });
    } else {
        if (status === "FAILED" || status === "CANCELLED" || status === "TIMED_OUT") { // Failed from RunPod exception

            // REFUND the user
            await updateCredits({ userId: cloneJob.userId, convertDelta: 1 });
        } else {
            const prevClone = await prismadb.clone.findUnique({ where: { userId: cloneJob.userId }});
            if (!prevClone) {
                await prismadb.clone.create({
                    data: {
                        id: jobId,
                        userId: cloneJob.userId
                    }
                })
            }
        
            // TO-DO - Delete all training data / also configure Google Cloud to do this        
        }

        await prismadb.cloneJob.update({ where: { id: jobId },  data: { status, message: error ? error : "" } });
    }
    
    return new NextResponse(null, { status: 200 }); // IMPORTANT feedback
}