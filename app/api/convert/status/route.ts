import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { increaseAPILimit, checkAPILimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import axios from "axios";
import { _checkConvertJob, _getConversion, _getMostRecentConvertJob, getConversion } from "@/lib/runpod";
import prismadb from "@/lib/prismadb";
import { isJobDone } from "@/lib/utils";

export async function GET(
    req: NextRequest
) {
    try {
        const { userId } = auth();
        const conversionId = req.nextUrl.searchParams.get("id");

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!conversionId) {
            return new NextResponse("Id required", { status: 400});
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
        
        const convertJob = await _getConversion({ userId, conversionId });
        if (!convertJob) return new NextResponse("No jobs found", { status: 400 });
        if (convertJob.userId !== userId) return new NextResponse("Permission denied", { status: 401 });

        if (isJobDone({ status: convertJob.status })) // Already done 
            return new NextResponse(JSON.stringify({ status: convertJob.status }), { status: 200 });
            
        const runpodResponse = await _checkConvertJob({ runpodJobId: convertJob.runpodJobId! });        
        if (runpodResponse.status == 200) {
            const status = runpodResponse.data.status;
            
            if (status !== "COMPLETED" && status !== "FAILED") { // /webhook, not /status, updates DB if job is complete
                await prismadb.convertJob.update({
                    where: { id: convertJob.id }, 
                    data: { status }
                });
            }

            // Otherwise, return old result and wait for webhook to do its job
            return new NextResponse(JSON.stringify({ status: convertJob.status }), { status: 200 });
        }
        else return new NextResponse("Error communicating with GPU server for status", { status: 500});
    } catch (error) {
        console.log("[CONVERT STATUS ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}