"use client";

import { packages } from "@/lib/packages";
import { SignUpButton, useAuth } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Roboto_Slab } from "next/font/google";

const font = Roboto_Slab({
    weight: "600",
    subsets: ["latin"]
});

interface PricingTableProps {
    freeOnly?: boolean;
    paidOnly?: boolean;
}

const PricingTable = ({ freeOnly, paidOnly }: PricingTableProps) => {
    const { isSignedIn } = useAuth(); // useAuth for client-side
    const [isLoading, setLoading] = useState(false);

    const [quantities, setQuantities] = useState(packages.map(pack => 1));

    const onPurchase = async ({ packKey, quantity }) => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe", { params: { packKey, quantity } });

            if (typeof window !== "undefined") window.location.href = response.data.url;
        } catch (error) {
            toast("Something went wrong.");
            console.log(error, "STRIPE_CLIENT_ERROR");
        } finally {
            setLoading(false);
        }
    }

    const redirectUrl = (typeof window !== "undefined") ? `${window.location.href}/#pricing-table` : "";

    return (
        <div className="flex justify-center gap-8 flex-wrap">
            {!paidOnly &&
            <Card
                className="w-[22rem] py-8 flex flex-col items-center justify-center \
                    gap-2 rounded-xl bg-white text-black shadow-2xl"
                // style={{
                //     boxShadow: "#3b82f6 0px 8px 50px"
                // }}
            >
                <CardTitle 
                    className="px-4 py-2 text-2xl rounded-lg border-2 border-black/25 text-white bg-primary/75"
                >
                    Starter Pack
                </CardTitle>
                <CardContent>
                    <div 
                        className={cn("text-5xl md:text-7xl text-center mt-4 mb-8", font.className)}
                    >
                        <ul className="glowing">
                            <li>F</li>
                            <li>R</li>
                            <li>E</li>
                            <li>E</li>
                        </ul>
                    </div>
                    <div className="text-sm md:text-md text-center my-8">
                        Clone your voice and get 4 free samples.
                    </div>
                    <div className="text-md md:text-lg mt-4 mb-8">
                        <div className="flex gap-2">
                            <Check color="#0c0"/>
                            <div>
                                <b>1</b> Voice Clone
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Check color="#0c0"/>
                            <div>
                                <b>4</b> Samples (in your voice)
                            </div>
                        </div>
                    </div>
                    {isSignedIn ?
                        <Link href="/dashboard">
                            <Button 
                                className="w-full text-2xl rounded-sm border-2 border-black py-6 hover:scale-105 transition"
                            >
                                Get Started
                            </Button>
                        </Link>
                        :
                        <SignUpButton mode="modal">
                            <Button 
                                className="w-full text-2xl rounded-sm border-2 border-black py-6 hover:scale-105 transition"
                            >
                                Get Started
                            </Button>
                        </SignUpButton>}
                </CardContent>
            </Card>}
                {!freeOnly && packages.map((pack, i) => {
                    return (
                        <Card key={pack.packKey} 
                            className="w-[22rem] py-8 flex flex-col items-center justify-center
                            gap-2 rounded-xl bg-white text-black shadow-2xl"
                            style={
                                pack.packKey === "pro" ?
                                { boxShadow: "#E1B530 0px 5px 20px", border: "solid 1px #EBCD73" } : {}
                            } 
                        >
                            <CardTitle 
                                className={cn("px-4 py-2 text-2xl rounded-lg border-2",
                                pack.packKey === "pro" ? 
                                "border-primary/50 bg-white bg-[#EBCD73]/25 text-primary" 
                                : "border-black/25 text-white bg-primary/75")}
                            >
                                {pack.contents.label}
                            </CardTitle>
                            <CardContent>
                                <div className="w-fit mx-auto mt-4 mb-8">
                                    <span 
                                        className={cn("text-5xl md:text-7xl text-center", font.className)}
                                    >
                                        ${pack.contents.pricePerSong}
                                    </span>
                                    <span className="text-2xl">/credit</span>
                                </div>
                                <div className="flex items-center justify-center gap-4">
                                    <Button disabled={quantities[i] <= 1} onClick={() => setQuantities(e => { let h = [...e]; h[i] -= 1; return h; })}>-</Button>
                                    <div className="text-center text-xl w-[6rem]">
                                        {quantities[i] * pack.contents.songs} credits
                                    </div>
                                    <Button onClick={() => setQuantities(e => { let h = [...e]; h[i] += 1; return h; })}>+</Button>
                                </div>
                                <div className="text-md md:text-lg mt-4 mb-8">
                                    <div className="flex gap-2">
                                        <Check color="#0c0"/>
                                        <div>
                                            Convert <b>any song</b>, per credit
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Check color="#0c0"/>
                                        <div>
                                            Support available on Discord
                                        </div>
                                    </div>
                                </div>
                                {isSignedIn ?
                                    <Button 
                                        className="w-full text-2xl rounded-sm border-2 border-black py-6 hover:scale-105 transition"
                                        onClick={() => onPurchase({ packKey: pack.packKey, quantity: quantities[i] })}
                                        disabled={isLoading}
                                    >
                                        Buy Now
                                    </Button>
                                    : 
                                    <SignUpButton mode="modal"
                                        redirectUrl={redirectUrl}
                                    >
                                        <Button 
                                            className="w-full text-2xl rounded-sm border-2 border-black py-6 hover:scale-105 transition"
                                        >
                                            Buy Now
                                        </Button>
                                    </SignUpButton>
                                }
                            </CardContent>
                        </Card>
                    )
                })}
        </div>
    )
}

export default PricingTable;