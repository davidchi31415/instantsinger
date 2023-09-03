"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { BsDiscord } from "react-icons/bs";
import { usePathname } from "next/navigation";

const font = Montserrat({
    weight: "600",
    subsets: ["latin"]
});

export const LandingNavbar = () => {
    const pathname = usePathname();
    const { isSignedIn } = useAuth(); // useAuth for client-side

    return (
        <nav className="p-4 lg:px-8 w-full flex items-center justify-between md:fixed
            bg-[white] border-b-2 z-[9999]
        ">
            <Link
                href="/"
                className="flex items-center"
            >
                <h1 className={cn("text-2xl font-bold", font.className)}>
                    <span className="text-primary">instant</span>singer
                </h1>
            </Link>
            <div className="flex justify-between items-center text-xl gap-6">
                <Link href="/dashboard" className={pathname === "/dashboard" ? 
                    "text-primary" : ""
                }>
                    Dashboard
                </Link>
                <Link href="/pricing" className={pathname === "/pricing" ? 
                    "text-primary" : ""
                }>
                    Pricing
                </Link>
                <Link href="/contact" className={pathname === "/contact" ? 
                    "text-primary" : ""
                }>
                    Contact
                </Link>
            </div> 
            {isSignedIn ?
                <div className="flex justify-end">
                    <UserButton afterSignOutUrl="/" 
                    appearance={{
                        elements: {
                        userButtonAvatarBox: {
                            width: 48,
                            height: 48
                        }
                        }
                    }}
                    />
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