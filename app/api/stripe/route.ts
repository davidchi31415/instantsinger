import { auth, currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

import { absoluteUrl } from "@/lib/utils";
import { packages } from "@/lib/packages";

const pricingUrl = absoluteUrl("/pricing");
const dashboardUrl = absoluteUrl("/dashboard");

export async function GET(
    req: NextRequest
) {
    try {
        const { userId } = auth();
        const user = await currentUser();
        const packKey = req.nextUrl.searchParams.get("packKey");
        const quantity = req.nextUrl.searchParams.get("quantity");

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!packKey) {
            return new NextResponse("Need pack key", { status: 400 });
        }
        if (!quantity || !(parseInt(quantity) >= 1)) {
            return new NextResponse("Need valid quantity", { status: 400 });
        }

        const pack = packages.find((e) => e.packKey === packKey);
        if (!pack) return new NextResponse("Pack not found", { status: 400 });

        // Else, go to checkout page
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: dashboardUrl,
            cancel_url: pricingUrl,
            payment_method_types: ["card"],
            mode: "payment",
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: pack.contents.label,
                            description: 
                                `${pack.contents.songs} Song Conversion${pack.contents.songs > 1 ? "s" : ""}`
                        },
                        unit_amount: Math.round(pack.contents.price * 100),
                    },
                    quantity: parseInt(quantity)
                }
            ],
            allow_promotion_codes: true,
            metadata: { // VERY IMPORTANT - need to store userId for purchase
                userId,
                purchasedSongs: pack.contents.songs * parseInt(quantity)
            }
        });

        return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    } catch (error) {
        console.log("[STRIPE ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}