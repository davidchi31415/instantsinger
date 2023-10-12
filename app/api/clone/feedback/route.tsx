import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { 
            jobId, soundsLike, rating, comment
        } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!jobId) return new NextResponse("jobId not found", { status: 400 });

        if (typeof soundsLike !== "boolean") return new NextResponse("soundsLike not valid", { status: 400 });
        if (typeof rating !== "number") return new NextResponse("Rating must be number", { status: 400 });
        if (rating < 1 || rating > 5) return new NextResponse("Rating not valid", { status: 400 });
        if ((comment + '').length > 100) return new NextResponse("Comment too long", { status: 400 });

        const clone = await prismadb.clone.findUnique({ where: { id: jobId }});
        if (!clone) return new NextResponse("Clone not found", { status: 400 });

        await prismadb.feedback.create({ data: { 
            type: "CLONE",
            jobId, soundsLike, rating, comment
        }});

        return new NextResponse(
            "Feedback received",
            { status: 200 }
        );
    } catch (error) {
        console.log("[CLONE FEEDBACK ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}