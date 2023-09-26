"use client";

import { cn } from "@/lib/utils";
import { MobileLandingContentClone, MobileLandingContentConvert, MobileLandingContentPricing } from "./landing/content/mobile";
import { Roboto_Slab } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { AnimatedPhoneComponent, PhoneComponent } from "./landing/phone/phone";
import { ConverterDemoComponent } from "./landing/converter-demo";
import PricingTable from "./pricing-table";
import { AnimatedConverterComponent, FakeConverterComponent } from "./landing/converter-demo/converter";

const font = Roboto_Slab({
    weight: "600",
    subsets: ["latin"]
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const LandingContent = () => {
    const ref = useRef(null);
    const [currentIndex, setIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end -0.25"]
    });

    useEffect(() => {
        const handleChange = scrollYProgress.on("change", (latest) => {
            if (latest <= 0.2 && currentIndex !== 0) setIndex(0);
            else if (latest > 0.2 && latest <= 0.85 && currentIndex !== 1) setIndex(1);
            else if (latest > 0.85 && currentIndex !== 2) setIndex(2);
        });

        return () => handleChange();
    }, [currentIndex, scrollYProgress]);

    return (
        <div className="bg-primary/5 px-4 md:px-8 py-16">
            {/* <div className="hidden md:grid grid-cols-2 max-w-4xl mx-auto h-[120rem]">
                <div className="flex flex-col justify-between max-w-md mx-auto pt-36 pb-80">
                    <div className="flex flex-col">
                        <h3 className={cn("text-4xl md:text-5xl font-bold leading-tight tracking-tight", font.className)}>
                            Clone <span className="underline--fancy">
                                your voice
                            </span>, straight from the browser.
                        </h3>
                        <p className="mt-2 text-lg">
                            Follow our procedure to clone yourself in <b className="text-primary">2 minutes</b>.
                            That's gotta be some kind of record!
                        </p>
                    </div>
                    <motion.div className="flex flex-col"
                        ref={ref}
                    >
                        <h3 className={cn("text-4xl md:text-5xl font-bold leading-tight tracking-tight", font.className)}>
                            Convert <span className="underline--fancy">
                                any song
                            </span>. Just paste a link.
                        </h3>
                        <p className="mt-2 text-lg">
                            Convert any song into your voice by simply pasting a YouTube link. We'll take care of
                            the magic for you.
                        </p>
                    </motion.div>
                    <div className="flex flex-col">
                        <h3 className={cn("text-4xl md:text-5xl font-bold leading-tight tracking-tight", font.className)}>
                            Get started <span className="underline--fancy">
                                for free
                            </span>. No strings attached.
                        </h3>
                        <p className="mt-2 text-lg">
                            Just sign up and try it out! You'll get <b className="text-primary">~4.5 minutes</b> of free converted samples
                            to decide if you like it.
                        </p>
                    </div>
                </div>
                <div className={cn("w-full h-[39rem] sticky overflow-x-clip", 
                    currentIndex === 0 ? "top-[calc(50%-307.5px)]"
                        : currentIndex === 1 ? "top-[calc(50%-256px)]"
                            : "top-[calc(50%-235.2px)]")
                }>
                        {currentIndex === 1 &&
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ amount: 0.25 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{
                                duration: 0.5,
                                ease: [0, 0.71, 0.2, 1.01]
                            }}
                            className="w-fit mx-auto mt-8 lg:mt-0"
                        >  
                            <AnimatedConverterComponent />
                        </motion.div>}
                        {currentIndex === 2 &&
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ amount: 0.25 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0, 0.71, 0.2, 1.01]
                                }}
                                className="w-fit mx-auto mt-8 lg:mt-0"
                            >  
                                <PricingTable freeOnly />
                            </motion.div>}
                </div>
            </div> */}
            <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 md:gap-16 pb-8 md:pb-36">
                <MobileLandingContentClone />
                <MobileLandingContentConvert />
                <MobileLandingContentPricing />
            </div>
            <div className="mt-20 mb-6 md:mt-0 md:mb-20 text-center text-3xl w-fit mx-auto">
                And if you want more, we have you covered :)
            </div>
            <PricingTable paidOnly={true} />
        </div>
    )
}