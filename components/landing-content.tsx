"use client";

import Link from "next/link";
import { AudioCard } from "./audio-card";
import PricingTable from "./pricing-table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { BsDiscord } from "react-icons/bs";
import Image from "next/image";
import { Badge } from "./ui/badge";

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
        <div className="py-10 md:py-20 bg-gradient-to-r from-[#e0e0e0] to-primary/10" >
            <div className="w-fit h-fit my-8 rounded-xl bg-[white] mx-auto">
                    <div className="text-center text-xl md:text-3xl p-4 w-fit rounded-xl bg-[#FFF1E4] border-4 border-[#FFD7AF]/50 shadow-md">
                        Becoming a singer has never been <b>so easy</b>.
                    </div>
                </div>
            <div className="flex justify-center items-center gap-4 flex-wrap">
                <div className="pt-6">
                    <div className="rounded-3xl relative flow-root max-w-sm h-[14rem] px-6 lg:pb-6 mx-auto border-4 border-[red]/25 bg-white">
                        <div className="-mt-5">
                            <div className="w-fit mx-auto">
                                <span className="inline-flex items-center justify-center w-12 h-12 p-2 text-lg font-black text-white bg-red-500 rounded-full shadow">1</span>
                            </div>
                            <h3 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-gray-700 text-center">Record yourself</h3>
                            <p className="mt-2 text-lg">
                                Using <u>just your phone</u>, record your voice by following our step-by-step voice cloning procedure - which takes <u>less than 15 minutes</u>!
                            </p>
                        </div>
                    </div>
                </div>
                <div className="pt-6">
                    <div className="rounded-3xl relative flow-root max-w-sm h-[14rem] px-6 lg:pb-6 mx-auto border-4 border-[green]/25 bg-white">
                        <div className="-mt-5">
                            <div className="w-fit mx-auto">
                                <span className="inline-flex items-center justify-center w-12 h-12 p-2 text-lg font-black text-white bg-green-500 rounded-full shadow">2</span>
                            </div>
                            <h3 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-gray-700 text-center">Upload and wait</h3>
                            <p className="mt-2 text-lg">
                                Once we have your recordings, we will construct a personal AI clone for your singing voice. In the meantime,
                                find a song for your AI self to sing!
                            </p>
                        </div>
                    </div>
                </div>
                <div className="pt-6">
                    <div className="rounded-3xl relative flow-root max-w-sm h-[14rem] px-6 lg:pb-6 mx-auto border-4 border-primary/25 bg-white">
                        <div className="-mt-5">
                            <div className="w-fit mx-auto">
                                <span className="inline-flex items-center justify-center w-12 h-12 p-2 text-lg font-black text-white bg-primary rounded-full shadow">3</span>
                            </div>
                            <h3 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-gray-700 text-center">Now, sing!</h3>
                            <p className="mt-2 text-lg">
                                Convert any song into your own voice, while keeping all the pitches and inflections of the original singer intact. You're now an instant singer!
                            </p>
                        </div>
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