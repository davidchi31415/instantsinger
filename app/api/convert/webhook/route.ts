import { NextRequest, NextResponse } from "next/server";
import { convertWebhookQueue } from "@/lib/bullmq";

export async function POST(req: NextRequest) {
    const jobId = req.nextUrl.searchParams.get("id");
    const jobName:string = jobId ? jobId : (new Date()).toString();
    
    const body = await req.json();
    await convertWebhookQueue.add(jobName, body);

    return new NextResponse("Thanks", { status: 200 });
}