import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { _getClone, _submitConvertJob, getConversion } from "@/lib/runpod";
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { 
            isPublic, conversionId
        } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const conversion = await getConversion({ userId, conversionId });
        if (!conversion) return new NextResponse("Could not find conversion", { status: 400 });

        await prismadb.convertJob.update({ where: { id: conversionId }, data: { public: isPublic } });
        
        return new NextResponse("Updated publicity", { status: 200 });
    } catch (error) {
        console.log("[PUBLICITY UPDATE ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}