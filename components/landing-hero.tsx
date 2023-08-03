"use client";

import { useAuth } from "@clerk/nextjs"
import Link from "next/link";
import { Button } from "./ui/button";

export const LandingHero = () => {
    const { isSignedIn } = useAuth();

    return (
        <div className="text-white font-bold py-36 text-center space-y-5">
            <div 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                space-y-5 font-extra-bold">
                <h1>The Best AI Tool for</h1>
                <div
                    className="text-transparent bg-clip-text
                    bg-gradient-to-r from-purple-400 to-pink-600"
                >
                    Aspiring Singers
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                Become a singer in less than 20 minutes - for the price of a cup of coffee.
            </div>
            <div>
                <Link href={isSignedIn ? "/dashboard" : "/register"}>
                    <Button 
                        variant="premium"
                        className="md:text-lg p-4 md:p-6 
                        rounded-full font-semibold"
                    >
                        Become an Instant Singer
                    </Button>
                </Link>
            </div>
        </div>
    )
}