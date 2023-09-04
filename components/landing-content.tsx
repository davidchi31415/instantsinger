"use client";

import Link from "next/link";
import { AudioCard } from "./audio-card";
import PricingTable from "./pricing-table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { BsDiscord } from "react-icons/bs";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Check, MicIcon } from "lucide-react";
import { Roboto_Slab } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Roboto_Slab({
    weight: "600",
    subsets: ["latin"]
});

export const LandingContent = () => {
    return (
        <>
            <div className="py-10" >
                <div className="w-fit mx-auto mb-8 text-center text-xl md:text-3xl">
                    Becoming a singer has never been <b>so easy</b>.
                </div>
                <div className="flex justify-center items-center gap-4 flex-wrap">
                    <div className="pt-6">
                        <div className="rounded-3xl relative flow-root max-w-sm h-[12rem] px-6 lg:pb-6 mx-auto border-4 border-[red]/25 bg-white">
                            <div className="-mt-5">
                                <div className="w-fit mx-auto">
                                    <span className="inline-flex items-center justify-center w-12 h-12 p-2 text-lg font-black text-white bg-red-500 rounded-full shadow">1</span>
                                </div>
                                <h3 className={cn("mt-4 text-2xl font-bold leading-tight tracking-tight text-gray-700 text-center flex items-center justify-center gap-2", font.className)}>Clone your voice</h3>
                                <p className="mt-2 text-lg">
                                    Using just your phone, follow our step-by-step procedure to clone your singing voice in 10 minutes.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="pt-6">
                        <div className="rounded-3xl relative flow-root max-w-sm h-[12rem] px-6 lg:pb-6 mx-auto border-4 border-primary/25 bg-white">
                            <div className="-mt-5">
                                <div className="w-fit mx-auto">
                                    <span className="inline-flex items-center justify-center w-12 h-12 p-2 text-lg font-black text-white bg-primary rounded-full shadow">2</span>
                                </div>
                                <h3 className={cn("mt-4 text-2xl font-bold leading-tight tracking-tight text-gray-700 text-center", font.className)}>Convert any song</h3>
                                <p className="mt-2 text-lg">
                                    Once your voice is cloned, converting a song is as easy as pasting a YouTube link or uploading a file!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-fit mx-auto mt-8 text-center text-xl md:text-3xl">
                    And just like that, you're an instant singer!
                </div>
            </div>
            <div className="py-10 md:py-24 px-12 bg-primary/50" >
                <div className="mb-20 pt-8 pb-12 md:py-16 bg-[#FFF1E4] border-4 border-[#FFD7AF]/50 rounded-xl"
                    id="pricing-table"
                >   
                    <div className="w-fit mx-auto mb-8 text-3xl">
                        Did we mention, FREE?
                    </div>
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