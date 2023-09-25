"use client";

import { useNeedsCloneModal } from "@/hooks/use-modal";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Empty } from "./empty";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";


const views = [
    <>
        <DialogTitle 
            className="flex justify-center items-center
            flex-col pb-2"
        >
            <div className="relative h-40 w-40 md:h-60 md:w-60">
                <Image
                    alt="Logo Placeholder"
                    fill
                    src="/label.svg"
                />
            </div>
            <div className="my-6 md:my-8 text-3xl font-normal">Welcome</div>
        </DialogTitle>
        <DialogDescription
            className="font-normal text-xl text-center"
        >
            Let's start by getting your voice cloned!
        </DialogDescription>
    </>,
    <>
        <DialogDescription
            className="font-normal text-md md:text-xl pt-6"
        >
            <p>
                In this procedure, you will sing
            </p>
            <div className="flex items-center gap-2 ml-2 md:ml-4 mt-4 text-md md:text-xl">
                <div className="text-center p-2 w-9 h-9 rounded-full text-white bg-primary flex items-center justify-center font-bold">
                    1
                </div>
                <i>Happy Birthday</i>
            </div>
            <div className="flex items-center gap-2 ml-2 md:ml-4 mt-2 text-md md:text-xl">
                <div className="text-center p-2 w-9 h-9 rounded-full text-white bg-primary flex items-center justify-center font-bold">
                    2
                </div>
                <i>Twinkle Twinkle Little Star</i>
            </div>
            <div className="flex items-center gap-2 ml-2 md:ml-4 mt-2 text-md md:text-xl">
                <div className="text-center p-2 w-9 h-9 rounded-full text-white bg-primary flex items-center justify-center font-bold">
                    3
                </div>
                <i>Row, Row, Row Your Boat</i>
            </div>
            <div className="mt-4">
                The lyrics will be provided for you. Please take at least <b>2</b> minutes and at most <b>5</b> to finish.
            </div>
            <div className="text-center mt-2">
                <b>It is okay if you mess up</b>.
            </div>
        </DialogDescription>
    </>
];

export const NeedsCloneModal = () => {
    const cloneModal = useNeedsCloneModal();

    const [index, setIndex] = useState(0)
    const [isMounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <Dialog open={cloneModal.isOpen} onOpenChange={cloneModal.onClose}>
            <DialogContent className="max-w-[300px] md:max-w-md rounded-xl shadow-xl">
                <DialogHeader className="overflow-x-clip h-[275px] md:h-[360px]">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={index}
                            initial={{ x: 300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{
                                duration: 0.1,
                                ease: [0, 0.71, 0.2, 1.01]
                            }}
                        >
                            {views[index]}
                        </motion.div>
                    </AnimatePresence>
                </DialogHeader>
                <DialogFooter>
                    {index === 0 &&
                        <Button className="w-fit mx-auto mt-8 p-6 text-xl font-normal"
                            onClick={() => {
                                if (index === 0) setIndex(e => e+1);
                                else {}
                            }}
                        >
                            Next
                        </Button>}
                    {index === 1 &&
                        <Link href="/dashboard/clone" className="w-fit mx-auto">
                            <Button className="mt-8 p-6 text-xl font-normal">
                                Begin
                            </Button>
                        </Link>
                    }
                </DialogFooter>   
            </DialogContent>
        </Dialog>
    )
}