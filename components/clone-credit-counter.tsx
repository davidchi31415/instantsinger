"use client";

import { useState, useEffect } from "react"
import { Card, CardContent } from "./ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-modal";
import { PiCoinVerticalFill } from "react-icons/pi";
import { IconContext } from "react-icons";

interface CloneCreditCounterProps {
    cloneCredits: number;
}

export const CloneCreditCounter = ({ cloneCredits=0 }: CloneCreditCounterProps) => {
    const proModal = useProModal();
    const [isMounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="w-full">
            <Card className="bg-none border-0">
                <CardContent className="px-4 py-2 rounded-md bg-primary/20 border-2 border-black 
                    shadow-xl hover:scale-105 transition cursor-pointer"
                    onClick={() => proModal.onOpen() }
                >   
                    <div className="text-center text-lg text-black flex gap-2 items-center">
                        <div className="px-2 py-1 mx-1 bg-primary/25 text-black rounded-md">
                                {cloneCredits}
                        </div>
                        <div className="flex items-center gap-1">
                            Clone
                            <IconContext.Provider
                                value={{ size: "25px", color: "#E1B530" }}
                            >
                                    <PiCoinVerticalFill />
                            </IconContext.Provider>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}