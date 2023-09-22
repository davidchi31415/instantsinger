"use client";

import { useEffect, useState } from "react";
import { useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FakeConverterComponent } from "./converter";
import { ProgressCard } from "../progress-card";
import { ConversionResultsComponent } from "../conversion-results";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const views = [
    <div className="w-[18rem] md:w-[22rem]">
        <FakeConverterComponent />
    </div>,
    <div className="w-[18rem] md:w-[22rem]">
        <ProgressCard initStatus="IN_PROGRESS" process="Converting" staticCard={true} 
            noStatus={true} songName="keshi - drunk (live acoustic)"
        />
    </div>,
    <div className="w-[18rem] md:w-[22rem]">
        <ConversionResultsComponent
            results={{
                songName: "keshi - drunk (live acoustic)",
                url : "url",
                owner: false,
            }}
            mini={true}
        />
    </div>
];

export const ConverterDemoComponent = () => {
    // const [loading, setLoading] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [currentIndex, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const animate = async () => {
            setAnimating(true);
            if (currentIndex === 0) await sleep(5000);
            else await sleep(6000);
            
            setIndex(e => (e + 1) % 3);
            setVisible(false);
            await sleep(500);
            setVisible(true);

            setAnimating(false);
        };
        if (!animating) {
            animate();
        }
    }, [animating]);

    return (
        <div className="h-[20rem] w-[18rem] md:w-[22rem] flex items-center pointer-events-none cursor-default">
            <AnimatePresence>
                <motion.div
                    key={currentIndex}
                    initial={{ x: 0, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                >
                    { visible && views[currentIndex] }
                </motion.div>
            </AnimatePresence>
        </div>
    );
}