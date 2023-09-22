import { cn } from "@/lib/utils";
import { PhoneComponent } from "../phone/phone";
import { Roboto_Slab } from "next/font/google";
import { motion } from "framer-motion";
import { ConverterDemoComponent } from "../converter-demo";
import { useState } from "react";
import PricingTable from "@/components/pricing-table";

const font = Roboto_Slab({
    weight: "600",
    subsets: ["latin"]
});

export const MobileLandingContentClone = () => {
    return (
        <div className="flex justify-between max-w-4xl mx-auto items-center flex-wrap">
            <div className="flex flex-col max-w-md mx-auto">
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
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                    duration: 2,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01]
                }}
                className="w-fit mx-auto mt-8 lg:mt-0"
            >
                <PhoneComponent />
            </motion.div>
        </div>
    )
}

export const MobileLandingContentConvert = () => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="mt-20 flex justify-between max-w-4xl mx-auto items-center flex-wrap-reverse">
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                onViewportEnter={() => setVisible(true)}
                transition={{
                    duration: 2,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01]
                }}
                className="w-fit mx-auto h-fit"
            >
                <ConverterDemoComponent active={visible} />
            </motion.div>
            <div className="flex flex-col max-w-md mx-auto lg:mr-0]">
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
        </div>
    )
}

export const MobileLandingContentPricing = () => {
    return (
        <div className="flex justify-between max-w-4xl mx-auto items-center flex-wrap">
            <div className="flex flex-col max-w-md mx-auto">
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
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                    duration: 2,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01]
                }}
                className="w-fit mx-auto mt-8 lg:mt-0"
            >
                <PricingTable freeOnly={true} />
            </motion.div>
        </div>
    )
}