import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.text();
    
    return new NextResponse(null, { status: 200 }); // IMPORTANT feedback
}