"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Card } from "./ui/card";
import { cn, isJobDone } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { AlertCard } from "./alert-card";
import { Progress } from "./ui/progress";
import { InfiniteLoaderComponent } from "./loader/infinite-loader";

interface ProgressCardProps {
    process: string;
    apiEndpoint: string;
    apiId?: string;
    initStatus?: string;
    onStatusChange?: Function;
    onFinish?: Function;
    onFail?: Function;
    onCancel?: Function;
    badgeOnly?: boolean;
}

export const ProgressCard = (
    { 
        process, apiEndpoint, apiId,
        initStatus, onStatusChange, 
        onFinish, onFail, onCancel, 
        badgeOnly 
    }: ProgressCardProps
) => {
    const [currentStatus, setStatus] = useState<string>(initStatus ? initStatus : "");
    const [isFinished, setFinished] = useState(initStatus ? isJobDone({ status: initStatus }) : false);
    const [message, setMessage] = useState("");
    const circulating = true;

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
        // console.log(apiId);

        let response;
        if (apiId) response = await axios.get(apiEndpoint, { params: { id: apiId } });
        else response = await axios.get(apiEndpoint);

        if (response.status === 200) {
            const newStatus = response.data.status;
            setStatus(newStatus);
            if (onStatusChange) onStatusChange(newStatus);

            if (response.data?.message) setMessage(response.data?.message);
        }
    }

    if (badgeOnly) {
        return (
            <Badge
                className={
                    currentStatus === "COMPLETED" ? "bg-[#33ff66] text-black" : 
                    (currentStatus === "FAILED" || currentStatus === "CANCELLED"
                        ? "bg-destructive" : "bg-[#6699ff]")
                }
            >
                {currentStatus}
            </Badge>
        )
    }

    return (
        <div>
            <Card className="p-4 flex items-center justify-between rounded-none bg-white">
                <div className="text-md font-normal mt-1">
                    {isFinished ? `${process} finished.` : `${process}...`}
                </div>
                <div className={
                    cn("text-sm text-muted-foreground rounded-md px-4 py-2 font-bold text-black", 
                    currentStatus === "COMPLETED" ? "bg-[#33ff66]/50" : 
                        (currentStatus === "FAILED" || currentStatus === "CANCELLED"
                            ? "bg-destructive" : "bg-primary/25")
                    )}
                >
                    {currentStatus}
                </div>
                
            </Card>
            {/* <Progress value={10} className="w-full rounded-none h-[0.5rem] bg-[#ccc]" /> */}
            {circulating ? <InfiniteLoaderComponent />
            : <Progress value={10} className="w-full rounded-none h-[0.5rem] bg-[#ccc]" />}
            {message !== "" ?
                <AlertCard variant="destructive" title="Internal Error" message={message}/> : ""
            }
        </div>
    )
}