"use client";

import { useEffect, useState } from "react";
import { FakeConverterComponent } from "./converter";
import { ProgressCard } from "../../progress-card";
import { ConversionResultsComponent } from "../../conversion-results";
import { cn } from "@/lib/utils";

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

export const ConverterDemoComponent = ({ active }) => {
    const [animating, setAnimating] = useState(false);
    const [currentIndex, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const animate = async () => {
            setAnimating(true);
            if (currentIndex === 0) await sleep(5000);
            else await sleep(6000);

            setVisible(false);
            await sleep(100);
            setIndex(e => (e + 1) % 3);
            setVisible(true);

            setAnimating(false);
        };
        if (active && !animating) {
            animate();
        }
    }, [active, animating]);

    return (
        <div 
            className={cn("h-[20rem] w-[18rem] md:w-[22rem] flex items-center \
            pointer-events-none cursor-default transition-opacity delay-[100] duration-[1000]", visible ? "" : "opacity-0")}
        >
            {views[currentIndex]}
        </div>
    );
}