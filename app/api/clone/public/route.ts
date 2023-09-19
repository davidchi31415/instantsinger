import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { _getClone, _submitConvertJob, getClone } from "@/lib/runpod";
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { 
            isPublic, cloneId
        } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        console.log(isPublic);

        const clone = await getClone({ userId });
        if (!clone || clone.id !== cloneId) return new NextResponse("Could not find your clone", { status: 400 });

        await prismadb.clone.update({ where: { id: cloneId }, data: { public: isPublic } });
        
        return new NextResponse("Updated publicity", { status: 200 });
    } catch (error) {
        console.log("[PUBLICITY UPDATE ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}