"use client";

import { Button } from "./ui/button";
import { cn, downloadFromURL } from "@/lib/utils";
import { ArrowRightIcon, ArrowUpIcon, CopyIcon, DownloadIcon, ExternalLinkIcon } from "lucide-react";
import { AudioCard } from "./audio-card";
import { AlertCard } from "./alert-card";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { SignUpButton, useAuth } from "@clerk/nextjs";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

interface ConversionResultsComponentProps {
    results: any;
    mini?: boolean;
    onPlay?: any;
    onStop?: any;
}

export const ConversionResultsComponent = ({ results, mini=false, onPlay, onStop }: ConversionResultsComponentProps) => {
    const { isSignedIn } = useAuth();
    const [isPublic, setPublic] = useState(results.public);

    const togglePublicity = async () => {
        console.log("Toggling");
        const newPublic = !isPublic;
        try {
            setPublic(newPublic);
            const res = await axios.post("/api/convert/public", 
                { conversionId: results.id, isPublic: newPublic }
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

    if (results?.url) {
        if (mini) {
            return (
                <div className="p-4 border rounded-sm shadow-xl">
                    <div className="mb-2 w-full">
                        <div className="mb-2">
                            Here's "<b>{ results?.songName }</b>" converted into { results.owner ? "your" : "my" } voice!
                        </div>
                        <div className="flex justify-between items-center gap-4">
                            <div className="flex items-center justify-center gap-2">
                                <Tabs defaultValue={isPublic ? "public" : "private"} onValueChange={togglePublicity}>
                                    <TabsList className="grid w-full grid-cols-2 border bg-primary/25">
                                        <TabsTrigger value="private">Private</TabsTrigger>
                                        <TabsTrigger value="public">Public</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                                <div className={cn("flex items-center", !isPublic ? "invisible" : "")}>
                                    <Button variant="outline" className="border-2"
                                        onClick={copyToClipboard}
                                    >
                                        <ExternalLinkIcon />
                                    </Button>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" 
                                onClick={() => downloadFromURL(results.url, `converted_${results.songName}.wav`)}
                            >
                                <DownloadIcon />
                            </Button>
                        </div>
                    </div>
                    <AudioPlayer
                        src={results.url}
                        autoPlay={false}
                        onPlay={onPlay ? onPlay : () => {}}
                        onPause={onStop ? onStop : () => {}}
                        onEnded={onStop ? onStop : () => {}}
                        style={{ border: "none", boxShadow: "none" }}
                    />
                </div>  
            )    
        }

        return (
            <div>
                <div className="p-4 border rounded-sm shadow-xl">
                    <div className="mb-2 w-full">
                        <div className="mb-2">
                            Here's "<b>{ results?.songName }</b>" converted into { results.owner ? "your" : "my" } voice!
                        </div>
                        <div className="flex justify-between items-center gap-4">
                            {results.owner ?
                                <div className="flex items-center justify-center gap-2">
                                    <Tabs defaultValue={isPublic ? "public" : "private"} onValueChange={togglePublicity}>
                                        <TabsList className="grid w-full grid-cols-2 border bg-primary/25">
                                            <TabsTrigger value="private">Private</TabsTrigger>
                                            <TabsTrigger value="public">Public</TabsTrigger>
                                        </TabsList>
                                    </Tabs>
                                    <div className={cn("flex items-center", !isPublic ? "invisible" : "")}>
                                        <Button variant="outline" className="border-2"
                                            onClick={copyToClipboard}
                                        >
                                            <ExternalLinkIcon />
                                        </Button>
                                    </div>
                                </div>
                                :
                                <div className={cn("flex items-center")}>
                                    <Button variant="outline" className="border-2"
                                        onClick={copyToClipboard}
                                    >
                                        <ExternalLinkIcon />
                                    </Button>
                                </div>}
                            <Button variant="ghost" size="icon" 
                                onClick={() => downloadFromURL(results.url, `converted_${results.songName}.wav`)}
                            >
                                <DownloadIcon />
                            </Button>
                        </div>
                    </div>
                    <AudioCard url={results.url} />
                </div>  
                <div className="mt-6 w-full md:max-w-lg mx-auto">
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