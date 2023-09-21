"use client";

import Link from "next/link";
import { AudioCard } from "./audio-card";
import PricingTable from "./pricing-table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { BsDiscord } from "react-icons/bs";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { ArrowDownIcon, Check, MicIcon } from "lucide-react";
import { Roboto_Slab } from "next/font/google";
import { cn } from "@/lib/utils";
import { HeroDemo } from "./hero-demo";
import { PhoneComponent } from "./phone/phone";

const font = Roboto_Slab({
    weight: "600",
    subsets: ["latin"]
});

export const LandingContent = () => {
    return (
        <>
            <div className="px-4 md:px-8 py-16">
                <div className="flex justify-between max-w-4xl mx-auto items-center flex-wrap">
                    <div className="flex flex-col max-w-md mx-auto">
                        <h3 className={cn("text-4xl md:text-5xl font-bold leading-tight tracking-tight", font.className)}>
                            <span className="underline--fancy">
                                Clone your voice
                            </span>, straight from the browser
                        </h3>
                        <p className="mt-2 text-lg">
                            We provide a guided procedure to clone your voice in just <b className="text-primary">2 minutes</b>.
                            Afterwards, you will receive 3 sample songs to hear how it sounds.
                        </p>
                    </div>
                    <div className="w-fit mx-auto mt-8 md:mt-0">
                        <PhoneComponent />
                    </div>
                </div>
            </div>
            <div className="py-10 md:py-24 px-6 md:px-12 bg-primary/50">
                <div className="pb-8">
                    <PricingTable />
                </div>
                <div 
                    className="w-fit py-16 md:py-32 md:px-16 lg:px-32 xl:px-64 rounded-xl mx-auto text-white 
                    border-4 border-primary bg-primary shadow-xl
                    flex flex-col items-center justify-center gap-8 md:gap-16"
                >
                    <div className="px-4 text-2xl md:text-3xl md:text-5xl text-center font-bold">
                        Questions? Concerns?
                    </div>
                    <Button 
                        className="text-xl md:text-2xl py-8 px-4 text-primary gap-2" 
                        variant="outline"
                        onClick={() => window.open("https://discord.com/invite/Z7RvN6JWky")}
                    >
                        Join our Discord <BsDiscord />
                    </Button>
                </div>
            </div>
        </>
    )
}