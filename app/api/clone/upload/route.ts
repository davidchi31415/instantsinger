import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { getUploadURL } from "@/lib/gcloud";
import prismadb from "@/lib/prismadb";


export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { cloneId, stepNumber } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!cloneId) {
            return new NextResponse("Conversion Id required", { status: 400 });
        }
        if (!stepNumber) {
            return new NextResponse("Step number required", { status: 400 });
        }

        let currentJob = await prismadb.cloneJob.findUnique({ 
            where: { id: cloneId }
        });
        if (!currentJob) {
            return new NextResponse("No job found with given id", { status: 400 });
        }
        
        const url = await getUploadURL({
            directory: `training_data/${currentJob.id}`,
            fileName: `${stepNumber}`
        });

        return new NextResponse(JSON.stringify({ url: url }));
    } catch (error) {
        console.log("[CONVERT UPLOAD ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}