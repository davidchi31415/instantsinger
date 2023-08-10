import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { increaseAPILimit, checkAPILimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { getUploadURL } from "@/lib/gcloud";


export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { stepNumber } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!stepNumber) {
            return new NextResponse("Step number required", { status: 400 });
        }
        
        // // Check API Limits
        // const freeTrial = await checkAPILimit();
        // const isPro = await checkSubscription();

        // if (!freeTrial && !isPro) {
        //     return new NextResponse("Free trial has expired", { status: 403 });
        // }

        // if (!isPro) {
        //     await increaseAPILimit();
        // }
        
        const url = await getUploadURL({
            directory: `training_data/${userId}`,
            fileName: `${stepNumber}`
        });

        return new NextResponse(JSON.stringify({ url: url }));
    } catch (error) {
        console.log("[CONVERT UPLOAD ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}