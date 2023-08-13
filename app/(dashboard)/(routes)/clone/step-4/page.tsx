"use client"

import { useEffect, useState } from "react";
import 'react-piano/dist/styles.css';
import '@/components/customPianoStyles.css';
import { CloningStepBar } from "@/components/cloning-step-bar";
import { MicIcon, MoveLeftIcon, MoveRightIcon, UploadCloudIcon } from "lucide-react";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AudioCard } from "@/components/audio-card";

const songs = [
    {
        url: "https://cdn.discordapp.com/attachments/1140119588424667197/1140119723724521564/step_4_song_1.wav",
        lyrics: ["O say can you see by the dawn's early light",
        "What so proudly we hailed at the twilight's last gleaming",
        "Whose broad stripes and bright stars through the perilous fight",
        "O'er the ramparts we watched, were so gallantly streaming?",
        "And the rocket's red glare, the bombs bursting in air",
        "Gave proof through the night that our flag was still there",
        "O say does that star-spangled banner yet wave",
        "O'er the land of the free and the home of the brave"]
    }
]

const CloningStep = () => {
    const [step, setStep] = useState(0);

    return (
        <div className="px-4 lg:px-8 flex justify-center">
            <div className="pt-8 flex flex-col items-center justify-center">
                <div className="pt-2 flex flex-col items-center justify-center gap-2">
                    <CloningStepBar title="Step 4: Singing" totalSteps={songs.length} step={step} setStep={setStep} />
                    <Card className="w-full lg:max-w-3xl bg-muted mb-4 text-xl">
                        <CardHeader>
                            <CardTitle className="text-md text-muted-foreground">
                                Sing along with the following song, and record yourself while doing so.
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <div className="text-md mb-4"><b>Song:</b> Star Spangled Banner</div>
                                <div className="text-md mb-4">
                                    {songs[step].lyrics.map((line) => <p>{line}</p>)}
                                </div>
                                <AudioCard url={songs[step].url} />
                            </div>
                        </CardContent>
                    </Card>
                    <div className="w-full flex items-center justify-between">
                        {step !== 0 ?
                        <Button
                            disabled={step <= 0}
                            onClick={() => setStep(e => Math.max(0, e-1))}
                            className="gap-2 text-md"
                            variant="outline"
                        >
                            <MoveLeftIcon />Go Back
                        </Button>
                        : <Link href="/clone/step-4-preview">
                            <Button 
                                className="text-md gap-2"
                                variant="outline"
                            >
                                <MoveLeftIcon />Step 4 Preview
                            </Button>
                        </Link>}
                        {step !== songs.length - 1 ?
                        <Button
                            onClick={() => setStep(e => Math.min(songs.length - 1, e+1))}
                            className="gap-2 text-md"
                        >
                            Continue<MoveRightIcon />
                        </Button> 
                        : <Link href="/clone/finish">
                            <Button className="text-md gap-2">
                                Finish<UploadCloudIcon />
                            </Button>
                        </Link>}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CloningStep;