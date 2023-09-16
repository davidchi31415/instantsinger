import { NextRequest, NextResponse } from "next/server";
import { convertWebhookQueue } from "@/lib/bullmq";

export async function POST(req: NextRequest) {
    const jobId = req.nextUrl.searchParams.get("id");
    
    const body = await req.json();
    body["jobId"] = jobId;
    await convertWebhookQueue.add(`convert_${jobId}`, body);

    return new NextResponse("Thanks", { status: 200 });
}