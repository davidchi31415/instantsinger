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
        <div className="px-4 md:px-8 pb-20 space-y-5 mx-auto">
            <div className="flex justify-center items-center gap-12">
                <div className="max-w-lg font-bold">
                    <div 
                        className={cn("text-5xl sm:text-6xl md:text-7xl \
                        font-extra-bold", font.className)}
                    >
                        <h1>Unleash</h1>
                        <h1>your voice</h1>
                        <h1>
                            <span className="text-primary">with AI</span>.
                        </h1>
                    </div>
                    <div className="text-lg md:text-xl font-normal text-zinc-400 my-4">
                        <p>
                            Convert any song into your own voice, while keeping the same pitches and inflections of the original singer.
                        </p>
                    </div>
                </div>
            </div>
            <HeroDemo />
            <div className="py-8 flex flex-col items-center gap-2 md:max-w-lg mx-auto">
            <div className="text-xl">You could be a singer too, in 10 minutes*.</div>
            {isSignedIn ?
                <Link href="/dashboard" className="w-full" passHref={true}>
                    <Button 
                        variant="default"
                        className="text-md md:text-lg p-6 w-full
                        rounded-sm font-semibold border-2 border-black/100
                        hover:scale-105 transition shadow-xl"
                    >
                        Get Started for FREE
                    </Button>
                </Link>
                :
                <SignUpButton mode="modal">
                    <Button 
                        variant="default"
                        className="md:text-lg p-4 md:p-6 w-full
                        rounded-sm font-semibold border-2 border-black/100
                        hover:scale-105 transition shadow-xl"
                    >
                        Get Started for FREE
                    </Button>
                </SignUpButton>}
                <div className="flex justify-center gap-2">
                    <ArrowUpIcon fill="black" />
                    <ArrowUpIcon fill="black" />
                    <ArrowUpIcon fill="black" />
                    <ArrowUpIcon fill="black" />
                    <ArrowUpIcon fill="black" />
                </div>
                <div className=" mt-2 text-sm text-muted-foreground">*Not including processing time.</div>
            </div>
        </div>
    )
}