import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { deleteFile, getUploadURL } from "@/lib/gcloud";
import prismadb from "@/lib/prismadb";


export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { cloneId } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!cloneId) {
            return new NextResponse("Clone Job Id required", { status: 400 });
        }

        let clone = await prismadb.clone.findUnique({ 
            where: { id: cloneId }
        });
        if (!clone) {
            return new NextResponse("No clone found with given id", { status: 400 });
        }
        
        const deletionSuccess = await deleteFile({ directory: 'trained_models', fileName: clone.id });

        if (!deletionSuccess) return new NextResponse("Clone couldn't be deleted", { status: 400 });

        await prismadb.clone.delete({ where: { id: cloneId } });

        return new NextResponse("Clone deleted", { status: 200 });
    } catch (error) {
        console.log("[CONVERT UPLOAD ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}