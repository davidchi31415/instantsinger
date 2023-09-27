"use client";

import { useEffect, useState } from "react";
import { FakeConverterComponent } from "./converter";
import { ProgressCard } from "../../progress-card";
import { ConversionResultsComponent } from "../../conversion-results";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const views = [
    "",
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

interface ConverterDemoComponentProps {
    active: boolean;
    mini?: boolean;
}

export const ConverterDemoComponent = ({ mini }: ConverterDemoComponentProps) => {
    const [animating, setAnimating] = useState(false);
    const [currentIndex, setIndex] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const animate = async () => {
            setAnimating(true);
            await sleep(3000);
            setIndex(2);
            setDone(true);
            setAnimating(false);
        };
        if (!done && !animating && currentIndex === 1) {
            animate();
        }
    }, [animating, currentIndex, done]);

    if (mini) {
        return (
            <div 
                className="h-[36rem] w-[22rem] flex flex-col items-center"
            >
                <div className="scale-[75%] w-[22rem] flex-start mt-12">{views[0]}</div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ amount: 0.25 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                            duration: 0.25, 
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        {currentIndex === 1 && <div className="scale-[80%]">{views[currentIndex]}</div>}
                        {currentIndex === 2 && <div className="scale-[75%] text-xl">{views[currentIndex]}</div>}
                    </motion.div>
                </AnimatePresence>
            </div>
        )
    }
    return (
        <div 
            className={cn("h-[20rem] w-[18rem] md:w-[22rem] flex items-center \
            transition-opacity delay-[100] duration-[1000]")}
        >
            {currentIndex === 0 ? 
                <FakeConverterComponent onPlay={() => setIndex(1)} />
                : views[currentIndex]
            }
        </div>
    );
}