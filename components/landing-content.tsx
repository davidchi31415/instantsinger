"use client";

import Link from "next/link";
import { AudioCard } from "./audio-card";
import PricingTable from "./pricing-table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { BsDiscord } from "react-icons/bs";
import Image from "next/image";
import { Badge } from "lucide-react";

const testimonials = [
    {
        name: "Antonio",
        avatar: "A",
        title: "Novice Singer",
        description: "I've never felt more confident about my singing voice, \
        now that I know what is possible."
    },
    {
        name: "Antonio",
        avatar: "A",
        title: "Novice Singer",
        description: "I've never felt more confident about my singing voice, \
        now that I know what is possible."
    },
    {
        name: "Antonio",
        avatar: "A",
        title: "Novice Singer",
        description: "I've never felt more confident about my singing voice, \
        now that I know what is possible."
    },
    {
        name: "Antonio",
        avatar: "A",
        title: "Novice Singer",
        description: "I've never felt more confident about my singing voice, \
        now that I know what is possible."
    }
]

export const LandingContent = () => {
    return (
        <div className="py-10 md:py-20 bg-gradient-to-r from-[#e0e0e0] to-primary/50" >
            <div className="w-fit h-fit my-8 rounded-xl bg-[white] mx-auto">
                    <div className="text-center text-xl md:text-3xl p-4 w-fit rounded-xl bg-[#FFF1E4] border-4 border-[#FFD7AF]/50 shadow-md">
                        Becoming a singer has never been <b>so easy</b>.
                    </div>
                </div>
            <div className="mb-4 flex flex-col justify-center items-center gap-4 md:max-w-2xl mx-auto">
                <div className="p-8 rounded-xl bg-white shadow-xl flex justify-between flex-wrap w-full gap-4">
                    <div className="flex justify-center gap-2 mx-auto">
                        <Image
                            alt="record_step_picture"
                            width={256} height={128}
                            src="/record_step_picture.png"
                        />
                    </div>
                    <div className="max-w-[16rem] mx-auto">
                        <div className="text-2xl font-bold">1. Record Yourself</div>
                        <p>
                            Following a step-by-step, guided procedure, record your voice using
                            your phone (or any high-quality microphone).
                        </p>
                    </div>
                </div>
                <div className="p-8 rounded-xl bg-white shadow-xl flex justify-between flex-wrap w-full gap-4">
                    <div className="flex justify-center gap-2 mx-auto">
                        <Image
                            alt="upload_step_picture"
                            width={256} height={128}
                            src="/hero_step_2_picture.png"
                        />
                    </div>
                    <div className="max-w-[16rem] mx-auto">
                        <div className="text-2xl font-bold">2. Upload and Wait</div>
                        <p>
                            Once we receive your recordings, we will construct a personal AI clone for your
                            voice. And just like that, you're an Instant Singer!
                        </p>
                    </div>
                </div>
            </div>
            <div className="pt-8 pb-12 md:py-16"
                id="pricing-table"
            >   
                <div className="w-fit h-fit my-8 rounded-xl bg-[white] mx-auto">
                    <div className="text-center text-xl md:text-3xl p-4 w-fit rounded-xl bg-[#FFF1E4] border-4 border-[#FFD7AF]/50 shadow-md">
                        <b>No subscriptions</b>! Pay as you go.
                    </div>
                </div>
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
    )
}