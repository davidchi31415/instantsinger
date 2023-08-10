import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { increaseAPILimit, checkAPILimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import axios from "axios";
import { _checkCloneJob, _getMostRecentCloneJob } from "@/lib/runpod";
import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request
) {
    try {
        const { userId } = auth();

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
        
        const cloneJob = await _getMostRecentCloneJob({ userId });
        if (!cloneJob) return new NextResponse("No clone job found", { status: 400 });

        const runpodResponse = await _checkCloneJob({ runpodJobId: cloneJob.runpodJobId! });
        
        if (runpodResponse.status == 200) {
            const status = runpodResponse.data.status;
            await prismadb.cloneJob.update({
                where: { id: cloneJob.id }, 
                data: { status }
            });
            
            if (status === "FAILED") console.log("[RUNPOD FAILED]", runpodResponse.data);

            return new NextResponse(JSON.stringify({ status }), { status: 200 });
        }
        else return new NextResponse("Error communicating with Runpod for status", { status: 500});
    } catch (error) {
        console.log("[CLONE STATUS ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}