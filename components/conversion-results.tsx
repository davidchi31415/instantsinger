"use client";

import { Button } from "./ui/button";
import { cn, downloadFromURL, getFileName } from "@/lib/utils";
import { CopyIcon, DownloadIcon } from "lucide-react";
import { AudioCard } from "./audio-card";
import { AlertCard } from "./alert-card";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { SocialIcon } from 'react-social-icons';
import axios from "axios";
import { toast } from "react-hot-toast";

export const ConversionResultsComponent = ({ results }) => {
    const [isPublic, setPublic] = useState(results.public);

    const togglePublicity = async () => {
        const newPublic = !isPublic;
        try {
            setPublic(newPublic);
            const res = await axios.post("/api/convert/public", 
                { conversionId: results.id, isPublic }
            );

            if (res.status === 200) {
                toast("Publicity updated.", { position: "bottom-center" });
                return;
            } else {
                setPublic(!newPublic);
                toast("Couldn't toggle publicity.", { position: "bottom-center" });
            }
        } catch (error) {
            setPublic(!newPublic);
            toast("Couldn't toggle publicity.", { position: "bottom-center" });
        }
    }

    const copyToClipboard = () => {
        toast("Shareable link copied!", { position: "bottom-center" });
        navigator.clipboard.writeText(`https://www.instantsinger.com/result?id=${results.id}`);
    }

    if (results?.urls) {
        return (
            <div className="p-4 rounded-md border">
                <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-4 h-[4rem] flex-wrap w-fit">
                        <div className="flex items-center gap-2">
                            <div className="text-xl">Public</div>
                            <Switch checked={isPublic} onCheckedChange={togglePublicity} 
                                className=""
                            />
                        </div>
                        <div className={cn("flex items-center gap-1", isPublic ? "" : "hidden")}>
                            <Button variant="outline" className="border-2 py-6"
                                onClick={copyToClipboard}
                            >
                                <CopyIcon />
                            </Button>
                            {/* <SocialIcon target="_blank" url={`https://www.facebook.com/sharer/sharer.php?u=https://www.instantsinger.com/result?id=${results.id}`}/>
                            <SocialIcon target="_blank"url={`https://twitter.com/intent/tweet?text=Wanna%20hear%20me%20sing%20"${results.songName}"%20using%20AI%20%F0%9F%98%82?%20Check%20it%20out%20at&url=
                                    https://www.instantsinger.com/result?id=${results.id}`}/> */}
                        </div>
                    </div>
                </div>
                {results?.urls?.length ? 
                    <>
                        {results?.urls?.map((url, i) => {
                            return (
                                <div className="mt-4">
                                    <div className="flex items-center justify-between">
                                        <div className="font-medium mb-2">
                                            <i>{ results?.songName }</i>
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
                    </>
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