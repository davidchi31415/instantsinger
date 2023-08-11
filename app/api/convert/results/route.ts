import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { increaseAPILimit, checkAPILimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { _getConversion, _getMostRecentConvertJob, getConversionResults } from "@/lib/runpod";

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
        
        // Check database, not RunPod - their job IDs expire
        if (convertJob.status === "FAILED") return new NextResponse("Job failed => no result.", { status: 400 });
        if (convertJob.status === "CANCELLED") return new NextResponse("Job cancelled => no result.", { status: 400 });
        if (convertJob.status !== "COMPLETED") return new NextResponse("Job not completed.", { status: 400 });

        const results = await getConversionResults({ convertJob });
        if (!results) return new NextResponse("Internal error retrieving results", { status: 400 })

        return new NextResponse(JSON.stringify(results), { status: 200 });
    } catch (error) {
        console.log("[CONVERT STATUS ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}