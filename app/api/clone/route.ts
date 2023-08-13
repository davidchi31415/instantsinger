import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { checkFileExists, getUploadURL } from "@/lib/gcloud";
import { _submitCloneJob } from "@/lib/runpod";
import prismadb from "@/lib/prismadb";


export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { cloneName } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // TO-DO: Properly check cloneName is valid
        if (!cloneName) return new NextResponse("Clone name required", { status: 400 });
        
        // // Check API Limits
        // const freeTrial = await checkAPILimit();
        // const isPro = await checkSubscription();

        // if (!freeTrial && !isPro) {
        //     return new NextResponse("Free trial has expired", { status: 403 });
        // }

        // if (!isPro) {
        //     await increaseAPILimit();
        // }

        // TO-DO: Make sure that there isn't already a job active
        // TO-DO: Check that file size is not too much
        // TO-DO: Check that each file is an audio file and can run

        const currentCloneJob = await prismadb.cloneJob.findFirst({
            where: {
                userId,
                status: "NOT_SUBMITTED"
            }
        });
        if (!currentCloneJob) return new NextResponse("Clone job not found", { status: 400 });

        const requiredFiles = [
            '1', '2', '3.1', '3.4', '3.5', '3.8', '4.1', '4.2'
        ];

        // Make sure necessary files are present
        const missingFiles: string[] = [];
        for (let i = 0; i < requiredFiles.length; i++) {
            const fileExists = await checkFileExists({
                directory: `training_data/${currentCloneJob.id}`, fileName: requiredFiles[i]
            });
            if (!fileExists) {
                missingFiles.push(requiredFiles[i]);
            }
        }
        if (missingFiles.length) {
            return new NextResponse(JSON.stringify({ missingFiles }), { status: 403 })
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

            // TODO - Charge the customer

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