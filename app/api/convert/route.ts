import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { getCredits, updateCredits } from "@/lib/credits";
import { _getClone, _submitConvertJob } from "@/lib/runpod";
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { 
            hasInstrumentals,
            hasBackingVocals,
            convertBackingVocals,
            youtubeId,
            youtubeName
        } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const clone = await _getClone({ userId });
        if (!clone) return new NextResponse("You don't have a voice clone", { status: 400 });

        // Check API Limits
        const { convertCredits } = await getCredits();

        if (convertCredits <= 0) {
            return new NextResponse("Not enough credits", { status: 403 });
        } 

        let currentJob;
        if (youtubeId) {
            currentJob = await prismadb.convertJob.create({ data: { userId, songName: youtubeName ? youtubeName : "Untitled" } })
        } else {
            currentJob = await prismadb.convertJob.findFirst({ 
                where: { userId, status: "NOT_SUBMITTED" }, 
                orderBy: { createdAt: "desc" }
            });
            if (!currentJob) {
                return new NextResponse("No upload found", { status: 500 });
            }
        }

        const params = {
            modelId: clone.id,
            hasInstrumentals,
            hasBackingVocals,
            convertBackingVocals,
            jobId: currentJob.id
        };
        if (youtubeId) params["youtubeId"] = youtubeId;

        const runpodResponse = await _submitConvertJob(params);
        const runpodJobId = runpodResponse.data.id;
        const status = runpodResponse.data.status;
        
        if (runpodResponse.status == 200) {
            await prismadb.convertJob.update({
                where: { id: currentJob.id },
                data: { 
                    runpodJobId, 
                    status, 
                    hasInstrumentals,
                    hasBackingVocals,
                    convertBackingVocals
                }
            });

            // Charge the customer
            await updateCredits({ userId, convertDelta: -1 });

            return new NextResponse(
                JSON.stringify({ conversionId: currentJob.id, status }),
                { status: 200 }
            );
        } else {
            return new NextResponse("Error communicating with GPU for converting", { status: 500});
        }
    } catch (error) {
        console.log("[CONVERT SUBMIT ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}