import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { increaseAPILimit, checkAPILimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import axios from "axios";
import { _checkCloneJob, _getMostRecentCloneJob, getClones } from "@/lib/runpod";
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
        
        const clones = await getClones({ userId });
        if (!clones.length) return new NextResponse("No clones found", { status: 400 });

        return new NextResponse(JSON.stringify({ clones }), { status: 200 });
    } catch (error) {
        console.log("[CLONE STATUS ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}