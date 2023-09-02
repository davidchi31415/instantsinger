"use client"

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleIcon, MicIcon, MoveLeftIcon, MoveRightIcon, UploadCloudIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import CounterComponent from "@/components/counter";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { useMicModal } from "@/hooks/use-modal";
import AudioRecorder from "@/components/recorder";

const contents = [
    {isUpload: false, content: `Hello and welcome! You are currently reading (out loud) an essay we wrote, for the purpose of collecting voice data to create your AI clone. Take your time: don’t rush through this. As long as you can finish reading this essay in 6 minutes, you are reading fast enough. But try not to read too slowly either; keep to a normal speaking pace.`},
    {isUpload: false, content: `We're thrilled to introduce you to this special tool powered by AI, designed especially for those who dream of singing. Imagine being able to transform any song you like into your own voice, sounding just like your favorite singer. Yes, it's possible, no matter how you sing right now.`},
    {isUpload: false, content: `Our aim in creating this tool was to provide you with the ultimate practice aid. You can now listen to yourself singing like a professional, helping you practice better and feel more confident. This means you can hear yourself singing as perfectly as your favorite singer. Isn't that amazing?`},
    {isUpload: false, content: `Using this AI tool is quite easy. Once your voice is cloned, you're all set. The data you provide helps us create a clone tailored just for you. This clone can then be used with any song you choose. To do this properly, we need a variety of voice data covering your entire vocal range.`},
    {isUpload: false, content: `Here are all the steps we need you to do:
    1) Part 1: You're already doing it by reading this essay!
    2) Part 2: Show us your vocal range through simple pitch exercises.
    3) Part 3: Sing along to a song of your choice, preferrably one that covers the type of songs you wish to convert.`},
    {isUpload: false, content: `Completing these 3 steps should take less than 15 minutes in total, and you're already well on your way. Once you're done and your recordings are uploaded, we train our AI to match your voice. This might take a few hours, but sometimes even as little as 15 minutes, depending on how many other people are doing it.`},
    {isUpload: false, content: `Once your voice clone is ready, you can use your voice clone by using song conversion credits. If you need more, we offer multiple pay-as-you-go options. Each credit lasts forever and can be used for songs up to 10 minutes long.`},
    {isUpload: false, content: `When choosing songs to convert, remember that the audio quality and style matter. Simple vocal recordings work best. Behind the scenes, your AI clone works to transform voices into your own, but it can only work on voices. Thus, if there are instruments in the song, the vocals will need to be extracted. Don’t worry, we'll handle it for you. 
    If there's a chorus or background vocals, we will separate those too.`},
    {isUpload: false, content: `Though we can handle songs with lots of instruments and background sounds, our AI does better with strong lead vocals. As an example, think of songs with just an acoustic guitar – those work great. Reducing background noise helps avoid any odd sounds from the AI.`},
    {isUpload: true, content: `Lastly, try to pick songs within your singing range. The AI can't go higher or lower than the notes you provide. This is where the following step, Step 2: Pitches, comes in handy. We'll give you a series of pitches to sing along with to cover your vocal range. You've finished speaking for now. It's time for the pitch test. Keep it up – you're doing fantastic!`},
];

const CloningStep1Slides = ({ jobId }) => {
    const micModal = useMicModal();

    const [step, setStep] = useState(0);
    const [started, setStarted] = useState(false);
    const [isCounting, setCounting] = useState(false);

    const begin = () => {
        setStarted(true);
        setCounting(true);
    }

  return (
    <div className="px-4 lg:px-8 flex justify-center">
        <div className="pt-2 flex flex-col items-center justify-center gap-2">
            <Card className="w-full lg:max-w-3xl mb-4 border-2 border-primary/50 shadow-xl text-xl relative">
                <div 
                    className="absolute top-1/2 left-1/2 
                    transform -translate-x-1/2 -translate-y-1/2 z-10
                    text-[red] text-3xl font-bold"
                >
                    {started && isCounting ? <CounterComponent started={isCounting} initialCount={3}
                        onFinished={() => {
                            setCounting(false);
                            // start recording
                        }} />
                        : ""
                    }
                </div>
                <div 
                    className={cn("", isCounting ? "blur-md pointer-events-none" : "")}
                >
                    <CardHeader className={started ? "" : "hidden"}>
                        <CardTitle className="flex justify-between items-center">
                            <div className="text-md text-muted-foreground">
                                Read the following out loud.
                            </div>
                            <div className="flex items-center gap-1 px-2 py-1 rounded-md border-2 border-black bg-primary/25">
                                REC <CircleIcon fill="red" />
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="min-h-[6rem] md:min-h-[12rem]">
                        {started ? contents[step].content
                            :
                            <>
                                <div className="py-8">
                                    <div className="text-center text-3xl mb-4">Step 1: Speaking</div>
                                    <p>You are about to read an essay, split into slides.</p>
                                    <p>Read it out loud. It is <b>okay if you mess up</b>.</p>
                                </div>
                                <div className="mt-2 flex justify-center gap-2">
                                    <Link href="/clone/step-1-preview">
                                        <Button className="py-6 text-2xl font-normal border-2"
                                            variant="outline"
                                        >
                                            Go Back
                                        </Button>
                                    </Link>
                                    <Button className="text-2xl py-6 border-2 border-black font-normal shadow-xl"
                                        onClick={begin}
                                    >
                                        Begin Step 1
                                    </Button>
                                </div>
                            </>
                        }
                        <div className={cn(started ? "w-fit mx-auto" : "hidden")}>
                            <AudioRecorder />
                        </div>
                    </CardContent>
                    <CardFooter className={started ? "" : "hidden"}>
                        <div className="w-full flex items-center justify-between">
                            <Button
                                disabled={step <= 0}
                                onClick={() => setStep(e => Math.max(0, e-1))}
                                className="gap-2 text-md border-2"
                                variant="outline"
                            >
                                <MoveLeftIcon size="36" />
                            </Button>
                            <Button
                                disabled={step >= contents.length - 1}
                                onClick={() => setStep(e => Math.min(contents.length - 1, e+1))}
                                className="gap-2 text-md"
                            >
                                <MoveRightIcon size="36" />
                            </Button>
                        </div>
                    </CardFooter>
                </div>
            </Card>
        </div>
    </div>
  )
}


export default CloningStep1Slides;