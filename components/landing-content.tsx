"use client";

import PricingTable from "./pricing-table";
import { Button } from "./ui/button";
import { BsDiscord } from "react-icons/bs";
import { LandingContentClone } from "./landing-content-clone";
import { LandingContentConvert } from "./landing-content-convert";
import handleViewport from "react-in-viewport";

const ViewportClone = handleViewport(LandingContentClone, { threshold: 0.2 });
const ViewportConvert = handleViewport(LandingContentConvert, { threshold: 0.5 });

export const LandingContent = () => {
    return (
        <>
            <div className="px-4 md:px-8 py-16">
                <ViewportClone />
                <ViewportConvert />
            </div>
            <div className="py-10 md:py-24 px-6 md:px-12 bg-primary/50">
                <div className="pb-8">
                    <PricingTable />
                </div>
                <div 
                    className="w-fit py-16 md:py-32 md:px-16 lg:px-32 xl:px-64 rounded-xl mx-auto text-white 
                    border-4 border-primary bg-primary shadow-xl
                    flex flex-col items-center justify-center gap-8 md:gap-16"
                >
                    <div className="px-4 text-2xl md:text-3xl md:text-5xl text-center font-bold">
                        Questions? Concerns?
                    </div>
                    <Button 
                        className="text-xl md:text-2xl py-8 px-4 text-primary gap-2" 
                        variant="outline"
                        onClick={() => window.open("https://discord.com/invite/Z7RvN6JWky")}
                    >
                        Join our Discord <BsDiscord />
                    </Button>
                </div>
            </div>
        </>
    )
}