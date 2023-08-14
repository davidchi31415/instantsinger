"use client";

import { useState, useEffect } from "react"
import { Card, CardContent } from "./ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";
import { PiCoinVerticalFill } from "react-icons/pi";
import { IconContext } from "react-icons";

interface CloneCreditCounterProps {
    cloneCreditCount: number;
}

export const CloneCreditCounter = ({ cloneCreditCount=0 }: CloneCreditCounterProps) => {
    const proModal = useProModal();
    const [isMounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="flex items-center">
            <Card className="bg-none border-0">
                <CardContent className="px-4 py-2 rounded-md bg-primary/20 border-2 border-black 
                    shadow-xl hover:scale-105 cursor-pointer"
                >   
                    <div className="text-center text-md text-black flex gap-1 items-center">
                        <p>
                            <span className="px-2 py-1 mx-1 bg-primary/25 text-black rounded-md">
                                {cloneCreditCount}
                            </span> Clone
                        </p>
                        <IconContext.Provider
                            value={{ size: "25px", color: "#E1B530" }}
                        >
                                <PiCoinVerticalFill />
                        </IconContext.Provider>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}