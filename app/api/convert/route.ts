import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { increaseAPILimit, checkAPILimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import axios from "axios";

export async function POST(
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

        const response = await axios.post("https://api.runpod.ai/v2/9afi4omg7sdwt6/run", {
            "input": {   
                "arguments": {
                    "input_uuid": userId,
                    "model_uuid": "f28fbe70-6e39-495a-abee-022d06f7ece8",
                    "audio_is_vocals": 0,
                    "transpose": 0,
                    "pitch_extraction_algorithm": "mangio-crepe",
                    "search_feature_ratio": 0.66,
                    "filter_radius": 3,
                    "resample_output": 0,
                    "volume_envelope": 0.21,
                    "voiceless_protection": 0.33,
                    "hop_len": 120
                }
            }
        }, {
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.RUNPOD_API_KEY}`
            }
        });
        
        if (response.status == 200) return new NextResponse("Convert request successful.", { status: 200 });
        else return new NextResponse("Error communicating with Runpod", { status: 500});
    } catch (error) {
        console.log("[CONVERT ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}