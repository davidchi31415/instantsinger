import { NextRequest, NextResponse } from "next/server";
import { cloneWebhookQueue } from "@/lib/bullmq";

export async function POST(req: NextRequest) {
    const jobId = req.nextUrl.searchParams.get("id");
    
    const body = await req.json();
    body["jobId"] = jobId;
    await cloneWebhookQueue.add(`clone_${jobId}`, body);

    return new NextResponse("Thanks", { status: 200 });
}