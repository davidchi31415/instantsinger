"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ProgressCard } from "@/components/progress-card";
import { ConversionResultsComponent } from "@/components/conversion-results";
import { useEffect, useState } from "react";
import { ConverterDemoComponent } from ".";

export const FakeConverterComponent = () => {
    return (
        <Card className="shadow-xl border-2">
            <CardHeader>
                <CardTitle>Convert a Song</CardTitle>
                <CardDescription>
                Pick any song. Hear it in your voice.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="mb-4 flex items-center gap-4">
                    <div>URL:</div>
                    <div className="w-[12rem] md:w-[16rem]">
                        <Input 
                            placeholder="ex: https://youtube.com/..."
                            value="https://www.youtube.com/watch?v=pbNs7tAUFkk&pp=ygULa2VzaGkgZHJ1bms%3D"
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div 
                    className="mx-auto w-fit shadow-xl"
                >
                <Button
                    type="submit"
                    size="lg" className="text-xl border-2 border-black"
                >
                    Convert
                </Button>
                </div>
            </CardFooter>
        </Card>
    )
}

const views = [
    <ProgressCard initStatus="IN_PROGRESS" process="Converting" staticCard={true} 
        noStatus={true} songName="keshi - drunk (live acoustic)"
    />,
    <ConversionResultsComponent
        results={{
            songName: "keshi - drunk (live acoustic)",
            url : "https://storage.googleapis.com/instantsinger-public/landing_keshi.mp3",
            owner: false,
        }}
        mini={true}
    />
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const AnimatedConverterComponent = () => {
    const [animating, setAnimating] = useState(false);
    const [currentIndex, setIndex] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const animate = async () => {
            setAnimating(true);
            if (currentIndex === 0) await sleep(3000);

            await sleep(100);
            const newIndex = (currentIndex + 1) % 2;
            setIndex(e => (e + 1) % 2);

            if (newIndex === 0) setDone(true);
            setAnimating(false);
        };
        if (!done && !animating) {
            animate();
        }
    }, [animating, done]);

    return (
        <div className="flex flex-col items-center gap-4 w-[360px] overflow-x-clip">
            <FakeConverterComponent />
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={currentIndex}
                    initial={{ x: -300 }}
                    animate={{ x: 0 }}
                    exit={{ x: 300 }}
                    transition={{
                        duration: 0.25,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                >
                    {views[currentIndex]}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}