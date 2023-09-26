"use client";

import { useEffect, useState } from "react";
import { FakeConverterComponent } from "./converter";
import { ProgressCard } from "../../progress-card";
import { ConversionResultsComponent } from "../../conversion-results";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const views = [
    <FakeConverterComponent />,
    <ProgressCard initStatus="IN_PROGRESS" process="Converting" staticCard={true} 
        noStatus={true} songName="keshi - drunk (live acoustic)"
    />,
    <ConversionResultsComponent
        results={{
            songName: "keshi - drunk (live acoustic)",
            url : "url",
            owner: false,
        }}
        mini={true}
    />
];

interface ConverterDemoComponentProps {
    active: boolean;
    mini?: boolean;
    playOnce?: boolean;
}

export const ConverterDemoComponent = ({ active, mini, playOnce }: ConverterDemoComponentProps) => {
    const [animating, setAnimating] = useState(false);
    const [currentIndex, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const animate = async () => {
            setAnimating(true);
            await sleep(3000);

            setVisible(false);
            await sleep(100);
            const newIndex = (currentIndex + 1) % 3;
            setIndex(e => (e + 1) % 3);
            setVisible(true);

            if (newIndex === 2 && playOnce) setDone(true);
            setAnimating(false);
        };
        if ((active && !done) && !animating) {
            animate();
        }
    }, [active, animating, done, playOnce]);

    if (mini) {
        return (
            <div 
                className="h-[36rem] w-[22rem] flex flex-col items-center pointer-events-none cursor-default"
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
            pointer-events-none cursor-default transition-opacity delay-[100] duration-[1000]", visible ? "" : "opacity-0")}
        >
            {views[currentIndex]}
        </div>
    );
}