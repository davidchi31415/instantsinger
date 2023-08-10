import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

// TO-DO - Make sure CORS is activated

export async function POST(req: NextRequest) {
    const jobId = req.nextUrl.searchParams.get("id");
    if (!jobId) {
        console.log("[CONVERT WEBHOOK ERROR]: No jobId found.");
        return new NextResponse("Need id query parameter", { status: 400 });
    }

    const body = await req.json();
    const { status } = body;
    if (!status) {
        console.log("[CONVERT WEBHOOK ERROR]: No status found.");
        return new NextResponse("Need status parameter", { status: 400 });
    }

    const job = await prismadb.convertJob.findUnique({
        where: {
            id: jobId
        }
    });
    if (!job) {
        console.log("[CONVERT WEBHOOK ERROR]: No job found with id.");
        return new NextResponse("Invalid id", { status: 400 });
    }
    if (job.status === "COMPLETED" || job.status === "FAILED") {
        return new NextResponse("Job already completed", { status: 400 });
    }

    await prismadb.convertJob.update({
        where: {
            id: jobId
        },
        data: {
            status: status 
        }
    });

    // TO-DO - Charge the customer
    // TO-DO - Delete all training data / also configure Google Cloud to do this

    return new NextResponse(null, { status: 200 }); // IMPORTANT feedback
}