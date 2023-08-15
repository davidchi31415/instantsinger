import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { _checkCloneJob, _getMostRecentCloneJob } from "@/lib/runpod";
import prismadb from "@/lib/prismadb";
import { isJobDone } from "@/lib/utils";

export async function GET(
    req: NextRequest
) {
    try {
        const { userId } = auth();
        const cloneId = req.nextUrl.searchParams.get("id");

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!cloneId) {
            return new NextResponse("Id required", { status: 400 });
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
        
        const cloneJob = await prismadb.cloneJob.findUnique({ where: { id: cloneId } });
        if (!cloneJob) return new NextResponse("No clone job found", { status: 400 });
        if (cloneJob.userId !== userId) return new NextResponse("Permission denied", { status: 401 });

        if (isJobDone({ status: cloneJob.status })) // Already done 
            return new NextResponse(JSON.stringify({ status: cloneJob.status }), { status: 200 });

        const runpodResponse = await _checkCloneJob({ runpodJobId: cloneJob.runpodJobId! });       
        if (runpodResponse.status == 200) {
            const status = runpodResponse.data.status;
            
            if (status !== "COMPLETED" && status !== "FAILED") { // /webhook, not /status, updates DB if job is complete
                await prismadb.cloneJob.update({
                    where: { id: cloneJob.id }, 
                    data: { status }
                });
            }

            // Otherwise, return old result and wait for webhook to do its job
            return new NextResponse(JSON.stringify({ status: cloneJob.status }), { status: 200 });
        }
        else return new NextResponse("Error communicating with Runpod for status", { status: 500});
    } catch (error) {
        console.log("[CLONE STATUS ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}