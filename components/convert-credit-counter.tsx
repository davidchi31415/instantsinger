"use client";

import { useState, useEffect } from "react"
import { Card, CardContent } from "./ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-modal";
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
        <Card className="bg-white border-2 border-primary bg-primary/5 shadow-md rounded-md">
            <CardContent className="px-2 py-1
                 hover:scale-105 transition cursor-pointer"
                onClick={() => proModal.onOpen() }
            >   
                <div className="text-center text-lg flex gap-2 items-center p-2 py-1 mx-1 text-black rounded-md">
                    {convertCredits}
                    <IconContext.Provider
                        value={{ size: "25px", color: "#E1B530" }}
                    >
                            <PiCoinVerticalFill />
                    </IconContext.Provider>
                </div>
            </CardContent>
        </Card>
    )
}