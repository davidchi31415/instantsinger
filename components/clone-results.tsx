"use client";

import { Button } from "./ui/button";
import { cn, downloadFromURL, getFileName } from "@/lib/utils";
import { ArrowRightIcon, ArrowUpIcon, CopyIcon, DownloadIcon } from "lucide-react";
import { AudioCard } from "./audio-card";
import { AlertCard } from "./alert-card";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { SocialIcon } from 'react-social-icons';
import axios from "axios";
import { toast } from "react-hot-toast";
import { SignUpButton, useAuth } from "@clerk/nextjs";

export const CloneResultsComponent = ({ results }) => {
    const { isSignedIn } = useAuth();
    const [isPublic, setPublic] = useState(results);

    const togglePublicity = async () => {
        const newPublic = !isPublic;
        try {
            setPublic(newPublic);
            const res = await axios.post("/api/clone/public", 
                { cloneId: results.id, isPublic: newPublic }
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
        navigator.clipboard.writeText(`https://www.instantsinger.com/voice?id=${results.id}`);
    }

    if (results?.urls) {
        return (
            <div>
                <div className="p-4">
                    {results.owner ?
                        <div className="flex items-center gap-2 h-[4rem] flex-wrap w-fit mb-10 md:md-4">
                            <div className="flex items-center gap-2">
                                <div className="text-xl">Share it?</div>
                                <Switch checked={isPublic} onCheckedChange={togglePublicity} 
                                    className=""
                                />
                            </div>
                            <div className={cn("flex items-center gap-2", isPublic ? "" : "hidden")}>
                                <div className="text-xl flex items-center gap-2">Copy this! <ArrowRightIcon /></div>
                                <Button variant="outline" className="border-2 py-6"
                                    onClick={copyToClipboard}
                                >
                                    <CopyIcon />
                                </Button>
                            </div>
                        </div> : ""}
                        {results?.urls?.length ? 
                            <div className="border border-black/10 rounded-md p-4">
                                <div className="mb-2">
                                    {results.owner ? ""
                                        : <div className="text-xl">
                                            Here are some songs converted into <b>my voice</b> 🔥!
                                        </div>}
                                </div>
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
                <div className="mt-6 pb-12 w-full md:max-w-lg mx-auto">
                    {isSignedIn ? ""
                        : 
                        <div className="flex flex-col items-center gap-4">
                            <div className="text-2xl text-center">Wanna try it yourself?</div>
                            <SignUpButton mode="modal">
                                <Button 
                                    variant="default"
                                    className="text-xl md:text-3xl p-8 w-full
                                    rounded-sm font-normal border-2 border-black/100
                                    hover:scale-105 transition shadow-xl"
                                >
                                    Get Started for FREE
                                </Button>
                            </SignUpButton>
                            <div className="flex justify-center gap-2">
                                <ArrowUpIcon fill="black" />
                                <ArrowUpIcon fill="black" />
                                <ArrowUpIcon fill="black" />
                                <ArrowUpIcon fill="black" />
                                <ArrowUpIcon fill="black" />
                            </div>
                        </div>}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className="mb-2 text-xl">Clone Failed</div>
                <AlertCard variant="destructive" title="Internal Error"
                message={results.message} />
                <p className="pt-4">
                    You have been <b>refunded</b> your clone credit. 
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