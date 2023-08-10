import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { increaseAPILimit, checkAPILimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import axios from "axios";
import { _getClone, _submitConvertJob } from "@/lib/runpod";
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { cloneName, songName, needsSep } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const clone = await _getClone({ userId, cloneName });
        if (!clone) return new NextResponse("No clone found with given name", { status: 400 });

        // Check API Limits
        // const freeTrial = await checkAPILimit();
        // const isPro = await checkSubscription();

        // if (!freeTrial && !isPro) {
        //     return new NextResponse("Free trial has expired", { status: 403 });
        // }

        // if (!isPro) {
        //     await increaseAPILimit();
        // }
        
        // CHECK if file upload completed

        let convertJob;
        try { // FIRST, write to database - do not want to risk creating job and losing track of it
            convertJob = await prismadb.convertJob.create({
                data: { userId, songName, needsSep, cloneName }
            });
        } catch (error) {
            console.log("Cancelled convert job due to database error:", error);
            console.log(userId, needsSep);

            if (convertJob) {
                await prismadb.convertJob.delete({
                    where: {
                        id: convertJob.id
                    }
                });
            }

            return new NextResponse(
                `Cancelled convert job due to database error, not submitted`, 
                { status: 500 }
            );
        }

        const runpodResponse = await _submitConvertJob({
            userId,
            modelId: clone.id,
            needsSep,
            jobId: convertJob.id
        });
        const runpodJobId = runpodResponse.data.id;
        const status = runpodResponse.data.status;
        
        if (runpodResponse.status == 200) {
            await prismadb.convertJob.update({
                where: { id: convertJob.id },
                data: { runpodJobId, status }
            });

            return new NextResponse(
                JSON.stringify({ jobId: runpodJobId, status }),
                { status: 200 }
            );
        }
        else {
            await prismadb.convertJob.delete({
                where: {
                    id: convertJob.id
                }
            });
            
            return new NextResponse("Error communicating with Runpod for converting", { status: 500});
        }
    } catch (error) {
        console.log("[CONVERT SUBMIT ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}