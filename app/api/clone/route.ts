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

        // TO-DO: Check that file size is not too much
        // TO-DO: Check that each file is an audio file and can run

        const requiredFiles = [
            '1', '2.4', '2.5', '2.8'
        ];

        // Make sure necessary files are present
        const missingFiles: string[] = [];
        for (let i = 0; i < requiredFiles.length; i++) {
            const fileExists = await checkFileExists({
                directory: `training_data/${userId}`, fileName: requiredFiles[i]
            });
            if (!fileExists) {
                missingFiles.push(requiredFiles[i]);
            }
        }
        if (missingFiles.length) {
            return new NextResponse(JSON.stringify({ missingFiles }), { status: 403 })
        }

        // FIRST, write to database - do not want to risk creating job and losing track of it
        let cloneJob;
        try {
            cloneJob = await prismadb.cloneJob.create({
                data: { 
                    userId, 
                    name: cloneName
                }
            });
        } catch (error) {
            console.log("Cancelled convert job due to database error:", error);
            console.log(userId, cloneName);

            if (cloneJob) {
                await prismadb.cloneJob.delete({
                    where: {
                        id: cloneJob.id
                    }
                });
            }

            return new NextResponse(
                `Cancelled clone job due to database error, not submitted`, 
                { status: 500 }
            );
        }

        // Create RunPod job and store it
        const runpodResponse = await _submitCloneJob({
            userId,
            modelId: cloneJob.id,
            jobId: cloneJob.id
        });
        const runpodJobId = runpodResponse.data.id;
        const status = runpodResponse.data.status;

        if (runpodResponse.status == 200) {
            await prismadb.cloneJob.update({
                where: { id: cloneJob.id },
                data: { runpodJobId, status }
            });

            return new NextResponse(
                JSON.stringify({ jobId: runpodJobId, status }),
                { status: 200 }
            );
        }
        else {
            await prismadb.cloneJob.delete({
                where: {
                    id: cloneJob.id
                }
            });
            return new NextResponse("Error communicating with Runpod for cloning", { status: 500});
        }
    } catch (error) {
        console.log("[CONVERT UPLOAD ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}