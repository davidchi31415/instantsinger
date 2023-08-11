import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { increaseAPILimit, checkAPILimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import axios from "axios";
import { _getConversionResults, _getMostRecentConvertJob, getConversion } from "@/lib/runpod";
import prismadb from "@/lib/prismadb";
import { getDownloadURL } from "@/lib/gcloud";

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
        
        const convertJob = await getConversion({ userId, conversionId });
        if (!convertJob) return new NextResponse("No jobs found", { status: 400 });
        if (convertJob.userId !== userId) return new NextResponse("Permission denied", { status: 401 });
        
        // Check database, not RunPod - their job IDs expire
        if (convertJob.status !== "COMPLETED") return new NextResponse("Job not completed.", { status: 400 });

        const { urls, fileNames } = await _getConversionResults({ convertJob });

        if (!urls.length) return new NextResponse("Error generating urls", { status: 400 });

        return new NextResponse(JSON.stringify({ urls: urls, fileNames: fileNames }), { status: 200 });
    } catch (error) {
        console.log("[CONVERT STATUS ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}