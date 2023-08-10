"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Card } from "./ui/card";
import { cn, isJobDone } from "@/lib/utils";

interface ProgressCardProps {
    process: string;
    apiEndpoint: string;
    initStatus?: string;
    onFinish?: Function;
    onFail?: Function;
    onCancel?: Function;
}

export const ProgressCard = ({ process, apiEndpoint, initStatus, onFinish, onFail, onCancel }: ProgressCardProps) => {
    const [currentStatus, setStatus] = useState<string>(initStatus ? initStatus : "");
    const [isFinished, setFinished] = useState(initStatus ? isJobDone({ status: initStatus }) : false);

    const intervalId = useRef<any>(null);

    useEffect(() => {       
        if (!isFinished) {
            if (isJobDone({ status: currentStatus })) {
                setFinished(true);

                if (currentStatus === "FAILED" && onFail) onFail(); 
                else if (currentStatus === "CANCELLED" && onCancel) onCancel();
                else if (onFinish) onFinish();
                return;
            }

            intervalId.current = setInterval(async () => {
                await checkStatus();
            }, 10000);
              
            return () => clearInterval(intervalId.current);
        }
    }, [currentStatus, isFinished]);

    const checkStatus = async () => {
        const response = await axios.get(apiEndpoint);

        if (response.status === 200) {
            const newStatus = response.data.status;
            setStatus(newStatus);
        }
    }

    return (
        <Card className="p-4 flex items-center justify-between">
            <div className="text-md font-medium mt-1">
                {isFinished ? `${process} finished.` : `${process} in progress...`}
            </div>
            <div className={
                cn("text-sm text-muted-foreground rounded-full px-4 py-2 font-bold text-black", 
                currentStatus === "COMPLETED" ? "bg-[#33ff66]" : 
                    (currentStatus === "FAILED" || currentStatus === "CANCELLED"
                        ? "bg-destructive" : "bg-[#6699ff]")
                )}
            >
                {currentStatus}
            </div> 
        </Card>
    )
}