"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Card } from "./ui/card";
import { cn, getFileName, isJobDone, mapColor, mapStatus } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { AlertCard } from "./alert-card";
import { Progress } from "./ui/progress";
import { InfiniteLoaderComponent } from "./loader/infinite-loader";

interface ProgressCardProps {
    process: string;
    apiEndpoint?: string;
    apiId?: string;
    initStatus?: string;
    onStatusChange?: Function;
    onFinish?: Function;
    onFail?: Function;
    onCancel?: Function;
    badgeOnly?: boolean;
    staticCard?: boolean;
    songName?: string;
    noStatus?: boolean;
}

export const ProgressCard = (
    { 
        process, apiEndpoint, apiId,
        initStatus, onStatusChange, 
        badgeOnly, staticCard, songName,
        noStatus
    }: ProgressCardProps
) => {
    const [currentStatus, setStatus] = useState<string>(initStatus ? initStatus : "");
    const [message, setMessage] = useState("");
    const circulating = true;

    const intervalId = useRef<any>(null);
    
    if (!staticCard && apiEndpoint) {
        useEffect(() => {       
            intervalId.current = setInterval(async () => {
                await checkStatus();
            }, 10000);
                
            return () => clearInterval(intervalId.current);
        }, [currentStatus]);

        const checkStatus = async () => {
            let response;
            if (apiId) response = await axios.get(apiEndpoint, { params: { id: apiId } });
            else response = await axios.get(apiEndpoint);
    
            if (response.status === 200) {
                const newStatus = response.data.status;
                if (currentStatus !== newStatus && onStatusChange) onStatusChange(newStatus);
    
                if (response.data?.message) setMessage(response.data?.message);
                setStatus(newStatus);
            }
        }
    }

    if (badgeOnly) {
        return (
            <Badge
                className={mapColor(currentStatus)}
            >
                {mapStatus(currentStatus)}
            </Badge>
        )
    }

    return (
        <div>
            <Card className="p-4 flex items-center justify-between rounded-none bg-white">
                <div className="text-md font-normal mt-1">
                    {songName ? `${process} "${getFileName(songName)}"` : process}
                </div>
                {noStatus ? ""
                    : <div className={
                        cn("text-sm text-muted-foreground rounded-md px-4 py-2 font-bold text-black", 
                            mapColor(currentStatus)
                        )}
                    >
                        {mapStatus(currentStatus)}
                    </div>}
            </Card>
            {circulating ? <InfiniteLoaderComponent />
            : <Progress value={10} className="w-full rounded-none h-[0.5rem] bg-[#ccc]" />}
            {message !== "" ?
                <AlertCard variant="destructive" title="Internal Error" message={message}/> : ""
            }
        </div>
    )
}