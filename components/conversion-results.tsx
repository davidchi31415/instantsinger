"use client";

import { Button } from "./ui/button";
import { downloadFromURL } from "@/lib/utils";
import { DownloadIcon } from "lucide-react";
import { AudioCard } from "./audio-card";

interface ConversionResultsComponentProps {
    fileNames: string[];
    resultURLs: string[];
    songName: string;
}

export const ConversionResultsComponent = ({ songName, fileNames, resultURLs }: ConversionResultsComponentProps) => {
    return (
        <div>
            <div className="mb-2 text-xl">Results for "{ songName }"</div>
            {resultURLs?.length ? 
                <div className="border border-black/10 rounded-md p-4">
                    {resultURLs.map((url, i) => {
                        return (
                            <div className="mt-4">
                                <div className="flex items-center justify-between">
                                    <div className="font-medium mb-2">
                                        { fileNames[i] }
                                    </div>
                                        <Button variant="ghost" size="icon" 
                                        onClick={() => downloadFromURL(url, fileNames[i])}
                                        >
                                            <DownloadIcon />
                                        </Button>
                                </div>
                                <AudioCard url={url} />
                            </div>  
                        )
                    })}
                </div>
                : ""}
        </div>
    )
}