"use client";

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"

export const ThankYouView = ({ email }) => {
    useEffect(() => {
        try {
            if (email && Object.hasOwn(window, "rewardful")) {
                (window as any).rewardful("convert", { email });
            }
        } catch (error) {
            console.log("Rewardful conversion error:" + error);
        }
    }, []);

    return (
        <div className="px-4 lg:px-8 h-full">
            <div className="h-full flex flex-col items-center">
                <div className="mt-6 text-xl font-medium">Thank you for your purchase!</div>
                <p className="mb-4 text-muted-foreground text-md text-center">
                    We hope you enjoy using InstantSinger.
                </p>
                <Image
                    alt="Logo Placeholder"
                    width={360}
                    height={360}
                    src="/label.svg"
                />
                <Link href="/dashboard">
                    <Button className="mt-6 text-xl font-normal p-8">
                        Back to Dashboard
                    </Button>
                </Link>
            </div>
        </div>
    )
}