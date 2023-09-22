"use client";

import { cn } from "@/lib/utils";
import { MobileLandingContentClone, MobileLandingContentConvert, MobileLandingContentPricing } from "./landing/content/mobile";
import { Roboto_Slab } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { PhoneComponent } from "./landing/phone/phone";
import { ConverterDemoComponent } from "./landing/converter-demo";
import PricingTable from "./pricing-table";

const font = Roboto_Slab({
    weight: "600",
    subsets: ["latin"]
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const LandingContent = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end end"]
    });
    const [currentIndex, setIndex] = useState(0);
    const [changing, setChanging] = useState(false);

    useEffect(() => {        
        const scrollFunction = scrollYProgress.on("change", async (latest) => {
            if (changing) return;
            let newIndex = -1;
            if (latest < 0.6 && currentIndex !== 0) newIndex = 0;
            else if (latest >= 0.6   && latest < 0.9 && currentIndex !== 1) newIndex = 1;
            else if (latest >= 0.9 && currentIndex !== 2) newIndex = 2;
            if (newIndex !== -1) {
                setChanging(true); await sleep(500);
                setIndex(newIndex);
                setChanging(false);
            }
        });
        
        return () => scrollFunction();
      }, [scrollYProgress, currentIndex, changing]);

    return (
        <div className="bg-primary/5 px-4 md:px-8 py-16">
            <div className="hidden md:grid grid-cols-2 max-w-4xl mx-auto h-[120rem]"
                ref={ref}
            >
                <div className="flex flex-col justify-between max-w-md mx-auto pt-36 pb-72">
                    <div className="flex flex-col">
                        <h3 className={cn("text-4xl md:text-5xl font-bold leading-tight tracking-tight", font.className)}>
                            Clone <span className="underline--fancy">
                                your voice
                            </span>, straight from the browser.
                        </h3>
                        <p className="mt-2 text-lg">
                            Follow our procedure to clone yourself in <b className="text-primary">2 minutes</b>.
                            We'll give you 3 sample songs to hear how it sounds.
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <h3 className={cn("text-4xl md:text-5xl font-bold leading-tight tracking-tight", font.className)}>
                            Convert <span className="underline--fancy">
                                any song
                            </span>. Just paste a link.
                        </h3>
                        <p className="mt-2 text-lg">
                            With your voice cloned, convert any song into your voice
                            by simply pasting a YouTube link.
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <h3 className={cn("text-4xl md:text-5xl font-bold leading-tight tracking-tight", font.className)}>
                            Get started <span className="underline--fancy">
                                for free
                            </span>. No strings attached.
                        </h3>
                        <p className="mt-2 text-lg">
                            Just sign up and try it out! You'll get <b className="text-primary">~4.5 minutes</b> of free converted samples
                            to decide if you like it or not.
                        </p>
                    </div>
                </div>
                <div className="w-full h-[39rem] sticky top-[18vh]">
                    <AnimatePresence>
                        {!changing && currentIndex === 0 &&
                        <motion.div
                            key = "phone"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ amount: 0.25 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{
                                duration: 0.4,
                                ease: [0, 0.71, 0.2, 1.01]
                            }}
                            className="w-fit mx-auto mt-8 lg:mt-0"
                        >
                            <PhoneComponent />
                        </motion.div>}
                        {!changing && currentIndex === 1 &&
                        <motion.div
                            key = "demo"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{
                                duration: 0.4,
                                ease: [0, 0.71, 0.2, 1.01]
                            }}
                            className="w-fit mx-auto mt-8 lg:mt-0"
                        >
                            <ConverterDemoComponent active={true} />
                        </motion.div>}
                        {!changing && currentIndex === 2 &&
                        <motion.div
                            key = "free"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 0.4,
                                ease: [0, 0.71, 0.2, 1.01]
                            }}
                            className="w-fit mx-auto mt-8 lg:mt-0"
                        >
                            <PricingTable freeOnly />
                        </motion.div>}                        
                    </AnimatePresence>
                </div>
            </div>
            <div className="md:hidden w-full">
                <MobileLandingContentClone />
                <MobileLandingContentConvert />
                <MobileLandingContentPricing />
            </div>
        </div>
    )
}