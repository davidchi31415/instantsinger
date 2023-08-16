"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { BsDiscord } from "react-icons/bs";

const font = Montserrat({
    weight: "600",
    subsets: ["latin"]
});

export const LandingNavbar = () => {
    const { isSignedIn } = useAuth(); // useAuth for client-side

    return (
        <nav className="p-4 mx-[-50vw] px-[50vw] bg-primary/25 flex items-center justify-between">
            <Link
                href="/"
                className="flex items-center"
            >
                <div className="relative h-8 w-8 mr-4">
                    <Image 
                        fill
                        alt="logo"
                        src="/logo.png"
                    />
                </div>
                <h1 className={cn("text-2xl font-bold", font.className)}>
                <span className="text-primary">insant</span>singer
                </h1>
            </Link>
            {/* <div className="flex items-center gap-x-8 text-lg">
                <Link href="/">
                    Features
                </Link>
                <Link href="/">
                    Pricing
                </Link>
                <Link href="/">
                    Discord
                </Link>
            </div> */}
            <div className="flex items-center gap-x-2">
                <Link href={isSignedIn ? "/dashboard" : "/register"}>
                    <Button variant="default" className="rounded-lg">
                        Sign Up
                    </Button>
                </Link>
                <Link href={isSignedIn ? "/dashboard" : "/register"}>
                    <Button variant="outline" className="rounded-lg border border-primary">
                        Login
                    </Button>
                </Link>
            </div>
        </nav>
    )
}