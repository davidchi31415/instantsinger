"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { BsDiscord } from "react-icons/bs";
import { usePathname } from "next/navigation";
import { ConvertCreditCounter } from "./convert-credit-counter";
import { MobileNavbar } from "./mobile-navbar";

const font = Montserrat({
    weight: "600",
    subsets: ["latin"]
});

export const Navbar = ({ convertCredits }) => {
    const pathname = usePathname();
    const { isSignedIn } = useAuth(); // useAuth for client-side

    return (
        <nav className="px-4 lg:px-8 py-2 md:py-4 w-full
            flex items-center justify-between fixed
            bg-[white] border-b-2 z-[9999]"
        >
            <Link
                href="/"
                className="flex items-center gap-2"
            >
                <Image
                    priority
                    src="/logo.svg"
                    alt="InstantSinger Logo"
                    width={40} height={40}
                />
                <h1 className={cn("text-2xl font-bold hidden md:block", font.className)}>
                    <span className="text-primary">instant</span>singer
                </h1>
            </Link>
            <div className="hidden md:flex justify-between items-center text-xl gap-4 lg:gap-6">
                <Link href="/dashboard" className={pathname.startsWith("/dashboard") ? 
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
                <div className="md:hidden">
                    <Link href="/dashboard">
                        <Button variant="default">
                            Dashboard
                        </Button>
                    </Link>
                </div>
                :
                <div className="md:hidden">
                    <SignUpButton mode="modal">
                        <Button variant="outline" className="rounded-lg border border-primary">
                            Sign Up
                        </Button>
                    </SignUpButton>
                </div>
            }
            {isSignedIn ?
                <div className="hidden md:flex items-center gap-2">
                    <ConvertCreditCounter convertCredits={convertCredits} />
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
                <div className="hidden md:flex items-center gap-x-2">
                    <SignUpButton mode="modal">
                        <Button variant="default" className="rounded-lg">
                            Sign Up
                        </Button>
                    </SignUpButton>
                    <SignInButton mode="modal">
                        <Button variant="outline" className="rounded-lg border border-primary">
                            Login
                        </Button>
                    </SignInButton>
                </div>
            }
            <div className="md:hidden">
                <MobileNavbar convertCredits={convertCredits} />
            </div>
        </nav>
    )
}