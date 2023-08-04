import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { increaseAPILimit, checkAPILimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import axios from "axios";
import { checkConvertJob, getMostRecentConvertJob } from "@/lib/runpod";
import prismadb from "@/lib/prismadb";
import { getDownloadURL } from "@/lib/gcloud";

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
        
        // CHECK if file upload completed
        
        const convertJob = await getMostRecentConvertJob({ userId });
        if (!convertJob) return new NextResponse("No jobs found", { status: 400 });
        const convertJobId = convertJob.id;
        
        // Check database, not RunPod - their job IDs expire
        if (convertJob.status !== "COMPLETED") return new NextResponse("Job not completed.", { status: 400 });

        let fileNames;
        if (convertJob.needsSep) {
            fileNames = [`${convertJobId}.instrumentals.wav`, `${convertJobId}.vocals.wav`];
        } else {
            fileNames = [`${convertJobId}.vocals.wav`];
        }

        const urls = await Promise.all(
            fileNames.map(
                async (name) => await getDownloadURL({ directory: "inference_outputs", fileName: name })
            )
        );

        return new NextResponse(JSON.stringify({ urls: urls }), { status: 200 });
    } catch (error) {
        console.log("[CONVERT STATUS ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}