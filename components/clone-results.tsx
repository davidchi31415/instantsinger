"use client";

import { downloadFromURL } from "@/lib/utils"
import { Button } from "./ui/button"
import { DownloadIcon } from "lucide-react"
import { AudioCard } from "./audio-card"

export const CloneResultsComponent = ({ results, clone }) => {
    return (
        <div>
            <div className="mb-2 text-xl">Results for {clone.name}</div>
            {results?.urls?.length ? 
                <div className="border border-black/10 rounded-md p-4">
                    {results?.urls?.map((url, i) => {
                        return (
                            <div className="mt-4">
                                <div className="flex items-center justify-between">
                                    <div className="font-medium mb-2">
                                        Sample {i+1}
                                    </div>
                                    <Button variant="ghost" size="icon" 
                                        onClick={() => downloadFromURL(url, `sample_${i+1}.wav`)}
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
}