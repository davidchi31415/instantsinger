import { auth, currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

import { absoluteUrl } from "@/lib/utils";
import { packages } from "@/lib/packages";

const pricingUrl = absoluteUrl("/pricing");
const cloningFinishUrl = absoluteUrl("/dashboard/clone/finish");
const dashboardUrl = absoluteUrl("/thank-you");

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
        
        let stripeSession;
        if (packKey === "clone") {
            stripeSession = await stripe.checkout.sessions.create({
                success_url: cloningFinishUrl,
                cancel_url: cloningFinishUrl,
                payment_method_types: ["card"],
                mode: "payment",
                billing_address_collection: "auto",
                customer_email: user.emailAddresses[0].emailAddress,
                line_items: [
                    {
                        price_data: {
                            currency: "USD",
                            product_data: {
                                name: "Voice Clone Pack",
                                description: 
                                    `${quantity} Voice Clone${parseInt(quantity) > 1 ? "s" : ""}`
                            },
                            unit_amount: 99,
                        },
                        quantity: parseInt(quantity)
                    }
                ],
                allow_promotion_codes: true,
                metadata: { // VERY IMPORTANT - need to store userId for purchase
                    userId,
                    purchasedClones: quantity
                }
            });
        } else {
            const pack = packages.find((e) => e.packKey === packKey);
            if (!pack) return new NextResponse("Pack not found", { status: 400 });

            const numPacks = parseInt(quantity);
            const packPrice = pack.contents.pricePerSong * pack.contents.songs;

            // Else, go to checkout page
            stripeSession = await stripe.checkout.sessions.create({
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
                            unit_amount: Math.round(packPrice * 100),
                        },
                        quantity: numPacks
                    }
                ],
                allow_promotion_codes: true,
                metadata: { // VERY IMPORTANT - need to store userId for purchase
                    userId,
                    purchasedSongs: pack.contents.songs * numPacks
                }
            });
        }

        return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    } catch (error) {
        console.log("[STRIPE ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}