"use client";

import { Button } from "./ui/button";
import { downloadFromURL } from "@/lib/utils";
import { DownloadIcon } from "lucide-react";
import { AudioCard } from "./audio-card";

interface ConversionResultsComponentProps {
    results: {
        songName: string;
        urls: string[];
        fileNames: string[];
    }
}

export const ConversionResultsComponent = ({ results }: ConversionResultsComponentProps) => {
    return (
        <div>
            <div className="mb-2 text-xl">Results for "{ results?.songName }"</div>
            {results?.urls?.length ? 
                <div className="border border-black/10 rounded-md p-4">
                    {results?.urls?.map((url, i) => {
                        return (
                            <div className="mt-4">
                                <div className="flex items-center justify-between">
                                    <div className="font-medium mb-2">
                                        { results?.fileNames?.[i] }
                                    </div>
                                        <Button variant="ghost" size="icon" 
                                        onClick={() => downloadFromURL(url, results?.fileNames?.[i])}
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