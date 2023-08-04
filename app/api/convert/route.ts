import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { increaseAPILimit, checkAPILimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import axios from "axios";
import { cancelConvertJob, submitConvertJob } from "@/lib/runpod";
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { needsSep } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

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
                data: { userId, needsSep }
            });
        } catch (error) {
            console.log("Cancelled job due to database error:", error);
            console.log(userId, needsSep);

            if (convertJob) {
                await prismadb.convertJob.delete({
                    where: {
                        id: convertJob.id
                    }
                });
            }

            return new NextResponse(
                `Cancelled job due to database error, not submitted`, 
                { status: 500 }
            );
        }

        const runpodResponse = await submitConvertJob({ userId, outputId: convertJob.id, needsSep });
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
        else return new NextResponse("Error communicating with Runpod for converting", { status: 500});
    } catch (error) {
        console.log("[CONVERT SUBMIT ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}