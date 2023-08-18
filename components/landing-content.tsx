"use client";

import { AudioCard } from "./audio-card";
import PricingTable from "./pricing-table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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
        <div className="my-20">
            <div className="mb-4 flex justify-center items-center">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="max-w-md">
                        <p className="mb-2 font-bold text-3xl">Powerfully Accurate</p>
                        <p>
                            Ever wish you could hear how your favorite singer would sound, if they had your voice?{" "}
                            Our AI technology captures the essence of your voice and swaps out any reference audio to match it.
                        </p>
                        <ul>
                            <li></li>
                        </ul>
                    </div>
                    <div>
                        <AudioCard url="https://cdn.discordapp.com/attachments/1140119588424667197/1140119723724521564/step_4_song_1.wav" />
                    </div>
                </div>
            </div>
            <PricingTable />
        </div>
    )
}