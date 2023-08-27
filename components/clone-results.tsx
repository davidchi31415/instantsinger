"use client";

import { downloadFromURL } from "@/lib/utils"
import { Button } from "./ui/button"
import { DownloadIcon } from "lucide-react"
import { AudioCard } from "./audio-card"
import { AlertCard } from "./alert-card";

export const CloneResultsComponent = ({ results, cloneJob }) => {
    if (results?.urls) {
        return (
            <div>
                <div className="mb-2 text-xl">Results for {cloneJob.name}</div>
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
    } else {
        return (
            <div>
                <div className="mb-2 text-xl">Cloning Failed</div>
                <AlertCard variant="destructive" title="Internal Error"
                message={results.message} />
                <p className="pt-4">
                    You have been refunded your cloning credit. 
                    Please contact us for assistance!
                </p>
            </div>
        )
    }
}