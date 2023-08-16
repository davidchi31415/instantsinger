import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { deleteFile, getUploadURL } from "@/lib/gcloud";
import prismadb from "@/lib/prismadb";


export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { cloneId, fileName } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!cloneId) {
            return new NextResponse("Clone Job Id required", { status: 400 });
        }
        if (!fileName) {
            return new NextResponse("File name required", { status: 400 });
        }

        let currentJob = await prismadb.cloneJob.findUnique({ 
            where: { id: cloneId }
        });
        if (!currentJob) {
            return new NextResponse("No job found with given id", { status: 400 });
        }
        
        const deletionSuccess = await deleteFile({ directory: `training_data/${currentJob.id}`, fileName });

        if (!deletionSuccess) return new NextResponse("File couldn't be deleted", { status: 400 });

        return new NextResponse("File deleted", { status: 200 });
    } catch (error) {
        console.log("[CONVERT UPLOAD ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}