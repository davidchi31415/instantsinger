"use client";

import { useAuth } from "@clerk/nextjs"
import Link from "next/link";
import { Button } from "./ui/button";

export const LandingHero = () => {
    const { isSignedIn } = useAuth();

    return (
        <div className="font-bold px-4 lg:px-8 py-20 space-y-5 w-fit md:w-[39rem] mx-auto">
            <div 
                className="text-5xl sm:text-6xl md:text-7xl
                font-extra-bold"
            >
                <h1>Unleash</h1>
                <h1>your voice</h1>
                <div>
                    <span className="text-primary">with AI</span>.
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                The AI-powered singing tool that lets you hear <b>any song</b> converted into <b>your own voice</b>,
                regardless of your ability. Become the singer of your dreams, <b>today</b>.
            </div>
            <div className="flex items-center gap-2 w-full">
                <Link href={isSignedIn ? "/dashboard" : "/register"} className="w-full" passHref={true}>
                    <Button 
                        variant="default"
                        className="md:text-lg p-4 md:p-6 w-full
                        rounded-sm font-semibold border-2 border-black/100
                        hover:scale-105 transition"
                    >
                        Get Started
                    </Button>
                </Link>
                {/* <Link href={isSignedIn ? "/dashboard" : "/register"}>
                    <Button 
                        variant="outline"
                        className="md:text-lg p-4 md:p-6 
                        rounded-sm font-semibold border-2 border-black/100
                        hover:scale-105 transition"
                    >
                        See Pricing
                    </Button>
                </Link> */}
            </div>
        </div>
    )
}