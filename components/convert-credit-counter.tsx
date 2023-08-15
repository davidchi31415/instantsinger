"use client";

import { useState, useEffect } from "react"
import { Card, CardContent } from "./ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";
import { IconContext } from "react-icons";
import { PiCoinVerticalFill } from "react-icons/pi";

interface ConvertCreditCounterProps {
    convertCredits: number;
}

export const ConvertCreditCounter = ({ convertCredits=0 }: ConvertCreditCounterProps) => {
    const proModal = useProModal();
    const [isMounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="w-full">
            <Card className="bg-white/10 border-0">
                <CardContent className="px-4 py-2 rounded-md bg-primary border-2 border-black 
                    shadow-xl hover:scale-105 transition cursor-pointer"
                    onClick={() => proModal.onOpen() }
                >   
                    <div className="text-center text-lg text-white flex gap-2 items-center">
                        <div className="p-2 py-1 mx-1 bg-[#f3f3f3] text-black rounded-md">
                            {convertCredits}
                        </div> 
                        <div className="flex items-center gap-1">
                            Convert
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