import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { updateCredits } from "@/lib/credits";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any) {
        return new NextResponse(`Webhook error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "invoice.payment_succeeded") {
        if (!session?.metadata?.userId) {
            return new NextResponse("URGENT ERROR: payment successful but processing not - no userId provided", { status: 403});
        }

        if (!session?.metadata?.purchasedClones) {
            return new NextResponse("URGENT ERROR: payment successful but processing not - no purchasedClones provided", { status: 403});
        }

        if (!session?.metadata?.purchasedSongs) {
            return new NextResponse("URGENT ERROR: payment successful but processing not - no purchasedSongs provided", { status: 403});
        }

        const purchaseSuccessful = await updateCredits({
            userId: session.metadata.userId,
            convertDelta: parseInt(session.metadata.purchasedSongs),
            cloneDelta: parseInt(session.metadata.purchasedClones)
        });
        console.log(purchaseSuccessful);

        if (purchaseSuccessful) return new NextResponse(null, { status: 200 }); // IMPORTANT feedback
        else return new NextResponse("URGENT ERROR: payment successful but processing not", { status: 403});
    }

    return new NextResponse(null, { status: 200 }); // IMPORTANT feedback
}