import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { checkFileExists, getFileList, getUploadURL } from "@/lib/gcloud";
import { _submitCloneJob } from "@/lib/runpod";
import prismadb from "@/lib/prismadb";
import { getCredits, updateCredits } from "@/lib/credits";
import axios from "axios";


export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { cloneId } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        
        // Check API Limits
        const { cloneCredits } = await getCredits();

        if (cloneCredits <= 0) {
            return new NextResponse("Not enough credits", { status: 403 });
        } 

        const currentCloneJob = await prismadb.cloneJob.findUnique({
            where: {
                id: cloneId
            }
        });
        if (!currentCloneJob) return new NextResponse("Clone job not found", { status: 400 });

        const requiredFiles = [
            '1', '2'
        ];
        const uploadedFiles = await getFileList({ directory: `training_data/${currentCloneJob.id}` });

        // Make sure necessary files are present
        const missingFiles: string[] = [];
        for (let i = 0; i < requiredFiles.length; i++) {
            const fileExists = uploadedFiles.fileNames.some((fileName) => fileName === requiredFiles[i]);

            if (!fileExists) {
                missingFiles.push(requiredFiles[i]);
            }
        }
        if (missingFiles.length) {
            return new NextResponse(JSON.stringify({ missingFiles }), { status: 402 })
        }

        const railwayResponse = await axios.post(`${process.env.RAILWAY_URL}/api/clone`, {
            modelId: cloneId,
            jobId: currentCloneJob.id
        });
        if (railwayResponse.status !== 200) {
            return new NextResponse("Failed to submit convert job", { status: 500 });
        }

        // Charge the customer
        await updateCredits({ userId, cloneDelta: -1 });
        await prismadb.cloneJob.update({
            where: { id: currentCloneJob.id },
            data: { status: "IN_QUEUE" } 
        })

        return new NextResponse(
            JSON.stringify({ cloneId: currentCloneJob.id, status: "IN_QUEUE" }),
            { status: 200 }
        );
    } catch (error) {
        console.log("[CLONE UPLOAD ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}