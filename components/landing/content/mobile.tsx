import { cn } from "@/lib/utils";
import { PhoneComponent } from "../phone/phone";
import { Roboto_Slab } from "next/font/google";
import { motion } from "framer-motion";
import { ConverterDemoComponent } from "../converter-demo";
import { useRef, useState } from "react";
import PricingTable from "@/components/pricing-table";

const font = Roboto_Slab({
    weight: "600",
    subsets: ["latin"]
});

export const MobileLandingContentClone = () => {
    return (
        <div className="flex justify-between w-full items-center flex-wrap md:mb-20">
            <div className="flex flex-col max-w-md mx-auto">
                <h3 className={cn("text-3xl md:text-5xl font-bold leading-tight tracking-tight", font.className)}>
                    Clone <span className="underline--fancy">
                        your voice
                    </span>, straight from the browser.
                </h3>
                <p className="mt-2 text-lg">
                    Following our procedure takes just <b className="text-primary">2 minutes</b>.
                    That's gotta be some kind of record!
                </p>
            </div>
            <div className="hidden md:block w-fit mx-auto mt-10">
                <PhoneComponent />
            </div>
            <div className="md:hidden w-fit mx-auto mt-2 scale-90">
                <PhoneComponent />
            </div>
        </div>
    )
}

export const MobileLandingContentConvert = () => {
    return (
        <div className="flex justify-between w-full items-center flex-wrap">
            <div className="flex flex-col max-w-md mx-auto lg:mr-0]">
                <h3 className={cn("text-3xl md:text-5xl font-bold leading-tight tracking-tight", font.className)}>
                    Convert <span className="underline--fancy">
                        any song
                    </span>. Just paste a link.
                </h3>
                <p className="mt-2 text-lg">
                    Convert any song into your voice by simply pasting a YouTube link. We'll do
                    the magic for you.
                </p>
            </div>
            <div className="w-fit mx-auto h-fit">
                <ConverterDemoComponent active={true} />
            </div>
        </div>
    )
}

export const MobileLandingContentPricing = () => {
    return (
        <div className="lg:mt-20 flex justify-between w-full items-center flex-wrap">
            <div className="flex flex-col max-w-md mx-auto">
                <h3 className={cn("text-3xl md:text-5xl font-bold leading-tight tracking-tight", font.className)}>
                    Get started <span className="underline--fancy">
                        for free
                    </span>. No strings attached.
                </h3>
                <p className="mt-2 text-lg">
                    Just sign up and try it out! You'll get <b className="text-primary">6 minutes</b> of free converted samples
                    to decide if you like it or not.
                </p>
            </div>
            <div className="w-full md:w-fit mx-auto mt-8 lg:mt-0">
                <PricingTable freeOnly={true} />
            </div>
        </div>
    )
}