import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { increaseAPILimit, checkAPILimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { getUploadURL } from "@/lib/gcloud";
import prismadb from "@/lib/prismadb";


export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { songName } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!songName) {
            return new NextResponse("Song name required", { status: 401 });
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

        let currentJob = await prismadb.convertJob.findFirst({ 
            where: { userId, status: "NOT_SUBMITTED" }, 
            orderBy: { createdAt: "desc" }
        });
        if (!currentJob) {
            currentJob = await prismadb.convertJob.create({ data: { userId, songName } });
        }
        if (currentJob.songName !== songName) {
            await prismadb.convertJob.update({
                where: { id: currentJob.id },
                data: { songName } 
            });
        }
        
        const url = await getUploadURL({
            directory: "inference_inputs",
            fileName: currentJob.id
        });

        return new NextResponse(JSON.stringify({ url: url }));
    } catch (error) {
        console.log("[CONVERT UPLOAD ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}