import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { _getConversion, getConversionResults } from "@/lib/runpod";
import { exclude } from "@/lib/utils";

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
        
        const convertJob = await _getConversion({ userId, conversionId });
        if (!convertJob) return new NextResponse("No jobs found", { status: 400 });
        if (convertJob.userId !== userId) return new NextResponse("Permission denied", { status: 401 });
        
        // Check database, not RunPod - their job IDs expire
        if (convertJob.status !== "COMPLETED") {
            const jobData = exclude(convertJob, ["userId"]);
            return new NextResponse(JSON.stringify(jobData), { status: 200 });
        }

        const results = await getConversionResults({ convertJob });
        if (!results) return new NextResponse("Internal error retrieving results", { status: 400 });

        return new NextResponse(JSON.stringify(results), { status: 200 });
    } catch (error) {
        console.log("[CONVERT STATUS ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}