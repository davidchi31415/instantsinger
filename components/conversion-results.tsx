"use client";

import { Button } from "./ui/button";
import { downloadFromURL, getFileName } from "@/lib/utils";
import { DownloadIcon } from "lucide-react";
import { AudioCard } from "./audio-card";
import { AlertCard } from "./alert-card";

export const ConversionResultsComponent = ({ results }) => {
    if (results?.urls) {
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
                                            { getFileName(`converted_${results.songName}`) }
                                        </div>
                                        <Button variant="ghost" size="icon" 
                                            onClick={() => downloadFromURL(url, `converted_${results.songName}.wav`)}
                                        >
                                            <DownloadIcon />
                                        </Button>
                                    </div>
                                    <div>
                                        <AudioCard url={url} />
                                    </div>
                                </div>  
                            )
                        })}
                    </div>
                    : ""}
            </div>
        )
    } else {
        return (
            <div>
                <div className="mb-2 text-xl">Conversion Failed</div>
                <AlertCard variant="destructive" title="Internal Error"
                message={results.message} />
                <p className="pt-4">
                    You have been <b>refunded</b> your conversion credit. 
                    Please contact us for assistance!
                </p>
                <p>
                    Note: If the reason for error was due to the YouTube link,
                    please try a different link or upload a file instead.
                </p>
            </div>
        )
    }
}