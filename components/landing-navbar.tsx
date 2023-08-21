"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";

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
        <nav className="p-4 lg:px-8 w-full flex items-center justify-between fixed
            bg-[white]
        ">
            <Link
                href="/"
                className="flex items-center"
            >
                <h1 className={cn("text-2xl font-bold", font.className)}>
                    <span className="text-primary">instant</span>singer
                </h1>
            </Link>
            {isSignedIn ?
                <div className="flex items-center gap-x-4">
                    <Link href="/dashboard">
                        <Button variant="default" 
                            className="rounded-lg md:text-lg py-6"
                        >
                            Dashboard
                        </Button>
                    </Link>
                </div>
                :
                <div className="flex items-center gap-x-2">
                    <SignUpButton mode="modal">
                        <Button variant="default" className="rounded-lg">
                            Sign Up
                        </Button>
                    </SignUpButton>
                    <div className="hidden md:block">
                        <SignInButton mode="modal">
                            <Button variant="outline" className="rounded-lg border border-primary">
                                Login
                            </Button>
                        </SignInButton>
                    </div>
                </div>
            }
        </nav>
    )
}