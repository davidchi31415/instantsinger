"use client";

import { SignUpButton, useAuth } from "@clerk/nextjs"
import Link from "next/link";
import { Button } from "./ui/button";
import { HeroDemo } from "./hero-demo";
import { Roboto_Slab } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Roboto_Slab({
    weight: "600",
    subsets: ["latin"]
});

export const LandingHero = () => {
    const { isSignedIn } = useAuth();

    return (
        <div className="px-4 md:px-8 pb-32 space-y-5 mx-auto">
            <div className="flex justify-center items-center gap-12 flex-wrap-reverse">
                <div className="max-w-lg font-bold">
                    <div 
                        className={cn("text-5xl sm:text-6xl md:text-6xl \
                        font-extra-bold", font.className)}
                    >
                        <h1>Become a singer in 10 minutes</h1>
                        <h1>
                            <span className="text-primary">with AI</span>.
                        </h1>
                    </div>
                    <div className="text-md md:text-xl font-light text-zinc-400 my-4">
                        Convert any song into your own voice, while keeping the same pitches and inflections of the original singer - all with the click of a button.
                    </div>
                    <div className="flex items-center gap-2 w-full">
                    {isSignedIn ?
                        <Link href="/dashboard" className="w-full" passHref={true}>
                            <Button 
                                variant="default"
                                className="md:text-lg p-4 md:p-6 w-full
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
                    </div>
                </div>
                <HeroDemo />
            </div>
        </div>
    )
}