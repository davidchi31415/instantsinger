"use client";

import { CircleIcon, MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { FakeRecorderComponent } from "./fake-recorder";
import "./styles.css";
import { Card } from "../../ui/card";
import { ConverterDemoComponent } from "../converter-demo";
import { motion, AnimatePresence } from "framer-motion";

const PhoneScreenContent = () => {
    return (
        <div className="mt-14">
            <div className="flex flex-col items-center mb-12">
                <div className="flex items-center gap-2 mb-4 text-base px-4 py-2 rounded-full bg-primary/10">
                    <CircleIcon fill="red" /> RECORDING
                </div>
                <Card className="w-fit px-4 h-fit py-4 shadow-xl">
                    <p className="text-center mb-4 text-lg">Sing the following song:</p>
                    <p className="text-center text-sm mt-2 text-muted-foreground">"Twinkle, Twinkle, Little Star"</p>
                    <div className="text-center italic mt-2 text-base">
                        <p>Twinkle, twinkle, little star</p>
                        <p>How I wonder what you are!</p>
                        <p>Up above the world so high</p>
                        <p>Like a diamond in the sky</p>
                        <p>Twinkle, twinkle, little star</p>
                        <p>How I wonder what you are!</p>
                    </div>
                </Card>
            </div>
            <FakeRecorderComponent />
        </div>
    )
}

export const PhoneComponent = () => {
    return (
        <div className="phone">
            <div className="phone-inner">
                <div className="phone-front-camera"></div>
                <div className="phone-screen-middle bg-white">
                    <div className="phone-screen-content w-full px-4 h-full">
                        <PhoneScreenContent />
                    </div>
                </div>
                <div className="phone-screen-bottom-line"></div>
            </div>
        </div>
    )
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const views = [
    <PhoneScreenContent />,
    <div className="flex justify-center items-start h-full">
        <ConverterDemoComponent active={true} mini={true} playOnce={true} />
    </div>
];

export const AnimatedPhoneComponent = ({ index }) => {
    return (
        <div className="phone">
            <div className="phone-inner">
                <div className="phone-front-camera"></div>
                <div className="phone-screen-middle bg-white">
                    <div className="phone-screen-content w-full h-full px-4 overflow-x-clip">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={{ x: -300 }}
                                animate={{ x: 0 }}
                                exit={{ x: 300 }}
                                transition={{
                                    duration: 0.25,
                                    ease: [0, 0.71, 0.2, 1.01]
                                }}
                            >
                                {views[index]}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
                <div className="phone-screen-bottom-line"></div>
            </div>
        </div>
    )
}