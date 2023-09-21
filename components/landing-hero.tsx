"use client";

import { SignUpButton, useAuth } from "@clerk/nextjs"
import Link from "next/link";
import { Button } from "./ui/button";
import { HeroDemo } from "./hero-demo";
import { Roboto_Slab } from "next/font/google";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowDownIcon, ArrowUpIcon } from "lucide-react";

const font = Roboto_Slab({
    weight: "600",
    subsets: ["latin"]
});

export const LandingHero = () => {
    const { isSignedIn } = useAuth();

    return (
        <div>
            <div className="px-4 md:px-8 pb-20 flex justify-center items-center flex-wrap gap-4 md:gap-12 lg:gap-16">
                <div className="max-w-md font-bold">
                    <div 
                        className={cn("text-5xl sm:text-6xl md:text-7xl \
                        font-extra-bold", font.className)}
                    >
                        <h1>Become</h1>
                        <h1>a singer in</h1>
                        <h1>
                            <span className="text-primary"> 2 minutes</span>.
                        </h1>
                    </div>
                    <div className="text-lg md:text-xl font-normal text-zinc-400 my-4">
                        Clone your own voice for free. Then convert any song into your voice with the click of a button.
                    </div>
                </div>
                <HeroDemo />
            </div>
            <div className="px-4 md:px-8 pt-4 pb-8 flex flex-col items-center gap-2 md:max-w-lg mx-auto">
            <div className="text-2xl text-center">Try it yourself - for free!</div>
            {isSignedIn ?
                <Link href="/dashboard" className="w-full" passHref={true}>
                    <Button 
                        variant="default"
                        className="text-xl md:text-3xl p-8 w-full
                        rounded-sm font-normal border-2 border-black/100
                        hover:scale-105 transition shadow-xl"
                    >
                        Get Started
                    </Button>
                </Link>
                :
                <SignUpButton mode="modal">
                    <Button 
                        variant="default"
                        className="text-xl md:text-3xl p-8 w-full
                        rounded-sm font-normal border-2 border-black/100
                        hover:scale-105 transition shadow-xl"
                    >
                        Get Started
                    </Button>
                </SignUpButton>}
                <div className="flex justify-center gap-2">
                    <ArrowUpIcon fill="black" />
                    <ArrowUpIcon fill="black" />
                    <ArrowUpIcon fill="black" />
                    <ArrowUpIcon fill="black" />
                    <ArrowUpIcon fill="black" />
                </div>
            </div>
        </div>
    )
}