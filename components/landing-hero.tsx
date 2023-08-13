"use client";

import { useAuth } from "@clerk/nextjs"
import Link from "next/link";
import { Button } from "./ui/button";

export const LandingHero = () => {
    const { isSignedIn } = useAuth();

    return (
        <div className="font-bold px-4 lg:px-8 py-36 space-y-5 w-full md:w-[39rem]">
            <div 
                className="text-5xl sm:text-6xl md:text-7xl
                font-extra-bold">
                <h1>Unleash</h1>
                <h1>your voice</h1>
                <div>
                    <span className="text-primary">with AI</span>.
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                The AI-powered singing tool that lets you hear exactly how <b>any song</b> would sound if{" "}
                <b>you were the singer</b>, regardless of your own current ability.
            </div>
            <div className="flex items-center gap-2">
                <Link href={isSignedIn ? "/dashboard" : "/register"}>
                    <Button 
                        variant="default"
                        className="md:text-lg p-4 md:p-6 
                        rounded-sm font-semibold border-2 border-black/100
                        hover:scale-105 transition"
                    >
                        Get Started
                    </Button>
                </Link>
                <Link href={isSignedIn ? "/dashboard" : "/register"}>
                    <Button 
                        variant="outline"
                        className="md:text-lg p-4 md:p-6 
                        rounded-sm font-semibold border-2 border-black/100
                        hover:scale-105 transition"
                    >
                        See Pricing
                    </Button>
                </Link>
            </div>
        </div>
    )
}