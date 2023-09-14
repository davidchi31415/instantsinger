import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(
    req: Request
) {
    try {
        // const { userId } = auth();
        const body = await req.json();
        const { youtubeId } = body;

        // if (!userId) {
        //     return new NextResponse("Unauthorized", { status: 401 });
        // }
        if (!youtubeId) {
            return new NextResponse("Need Youtube Id", { status: 400 });
        }

        const gcloudResponse = await fetch(
            "https://us-central1-cosmic-axe-393519.cloudfunctions.net/song-downloader",
            { method: "POST", headers: { "Content-type": "application/json" }, body: `youtubeId=${youtubeId}` }
        );

        if (gcloudResponse.status === 200) {
            return new NextResponse("Song downloaded", { status: 200 });
        }

        return new NextResponse("Failed to downlaod", { status: 400 });
    } catch (error) {
        console.log("[SONG DOWNLOAD ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}