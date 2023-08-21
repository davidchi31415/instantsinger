"use client";

import Link from "next/link";
import { AudioCard } from "./audio-card";
import PricingTable from "./pricing-table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { BsDiscord } from "react-icons/bs";

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
                    <div className="text-center text-xl md:text-3xl p-4 w-fit rounded-xl bg-[gold]/10 border-2 border-[gold] shadow-md">
                        Powerfully <b>accurate</b>, yet incredibly <b>easy</b>
                    </div>
                </div>
            <div className="mb-4 flex justify-center items-center">
                <div className="p-8 rounded-xl bg-white shadow-xl">
                    <div className="lg:max-w-xl mb-8 mx-auto">
                        <p className="mb-2 text-lg md:text-xl">
                            Our AI technology captures the essence of your voice and converts any other voice to match it,
                            keeping pitches and inflections intact.
                        </p>
                        <p className="mb-2 text-lg md:text-xl">
                            All it takes is a <i>30-minute</i> cloning procedure for <i>you</i> to become an instant singer!
                        </p>
                        <p className="mb-8 text-center text-md md:text-lg">
                            P.S. I put my own voice to the test. Give it a listen!
                        </p>
                        <div className="max-w-md mx-auto">
                            <div className="text-lg mb-2">Sample of <b>My Voice</b> (more data needed for cloning)</div>
                            <AudioCard url="https://cdn.discordapp.com/attachments/1140119588424667197/1142877490952540210/my_voice_sample.m4a" />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:w-[50rem] gap-4">
                        <div className="flex flex-col gap-4">
                            <div>
                                <div className="text-xl mb-2">Song 1</div>
                                <AudioCard url="https://cdn.discordapp.com/attachments/1140119588424667197/1142873549506351174/male_sample_hero.wav" />
                            </div>
                            <div>
                                <div className="text-xl mb-2">Song 1 <b>(in my voice)</b></div>
                                <AudioCard url="https://cdn.discordapp.com/attachments/1140119588424667197/1142874702071726080/male_sample_hero_converted.wav" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div>
                                <div className="text-xl mb-2">Song 2</div>
                                <AudioCard url="https://cdn.discordapp.com/attachments/1140119588424667197/1142845493978857553/Ultra_Mainstream_Deep_House_Vocals_Hot_Night_124_BPM_Ebm_Bridge.wav" />
                            </div>
                            <div>
                                <div className="text-xl mb-2">Song 2 <b>(in my voice)</b></div>
                                <AudioCard url="https://cdn.discordapp.com/attachments/1140119588424667197/1142845408096288869/default_sample_hero.wav" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-8 pb-12 md:py-16"
                id="pricing-table"
            >   
                <div className="w-fit h-fit my-8 rounded-xl bg-[white] mx-auto">
                    <div className="text-center text-xl md:text-3xl p-4 w-fit rounded-xl bg-[gold]/10 border-2 border-[gold] shadow-md">
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