import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { checkFileExists, getFileList, getUploadURL } from "@/lib/gcloud";
import { _submitCloneJob } from "@/lib/runpod";
import prismadb from "@/lib/prismadb";
import { getCredits, updateCredits } from "@/lib/credits";


export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { cloneName, cloneId } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // TO-DO: Properly check cloneName is valid
        if (!cloneName) return new NextResponse("Clone name required", { status: 400 });
        if (cloneName.length > 25) return new NextResponse("Clone name too long", { status: 400 });
        
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
            '1', '2', '3'
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

        // Create RunPod job and store it
        const runpodResponse = await _submitCloneJob({
            modelId: currentCloneJob.id,
            jobId: currentCloneJob.id
        });
        const runpodJobId = runpodResponse.data.id;
        const status = runpodResponse.data.status;

        if (runpodResponse.status == 200) {
            await prismadb.cloneJob.update({
                where: { id: currentCloneJob.id },
                data: { runpodJobId, status, name: cloneName }
            });

            // Charge the customer
            await updateCredits({ userId, cloneDelta: -1 });

            return new NextResponse(
                JSON.stringify({ jobId: runpodJobId, status }),
                { status: 200 }
            );
        }
        else {
            return new NextResponse("Error communicating with Runpod for cloning", { status: 500});
        }
    } catch (error) {
        console.log("[CONVERT UPLOAD ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}