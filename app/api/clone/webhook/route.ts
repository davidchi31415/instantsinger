import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

// TO-DO - Make sure CORS is activated

export async function POST(req: NextRequest) {
    const jobId = req.nextUrl.searchParams.get("id");
    if (!jobId) {
        console.log("[CLONE WEBHOOK ERROR]: No jobId found.");
        return new NextResponse("Need id query parameter", { status: 400 });
    }

    const body = await req.json();
    const { status } = body;

    ///////////////////////////////////////////////////////
    // Check params
    ///////////////////////////////////////////////////////
    if (!status) {
        console.log("[CLONE WEBHOOK ERROR]: No status found.");
        return new NextResponse("Need status parameter", { status: 400 });
    }

    const job = await prismadb.cloneJob.findUnique({
        where: {
            id: jobId
        }
    });
    if (!job) {
        console.log("[CLONE WEBHOOK ERROR]: No job found with id.");
        return new NextResponse("Invalid id", { status: 400 });
    }

    ///////////////////////////////////////////////////////
    // Check for double-requests
    ///////////////////////////////////////////////////////
    const clone = await prismadb.clone.findUnique({
        where: {
            id: jobId
        }
    });
    if (clone) { // TODO - add check on whether customer was charged, as error may have occurred before it
        console.log("[CLONE WEBHOOK ERROR]: Clone already initialized. Preventing double-charge/processing.");
        return new NextResponse("Clone already present.", { status: 400 });
    }

    await prismadb.cloneJob.update({
        where: {
            id: jobId
        },
        data: {
            status: status 
        }
    });
    
    await prismadb.clone.create({
        data: { 
            id: jobId,
            userId: job.userId, 
            name: job.name
        }
    });

    // TO-DO - Charge the customer
    // TO-DO - Delete all training data / also configure Google Cloud to do this

    return new NextResponse(null, { status: 200 }); // IMPORTANT feedback
}