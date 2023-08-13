"use client"

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MicIcon, MoveLeftIcon, MoveRightIcon, UploadCloudIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { CloningStepBar } from "@/components/cloning-step-bar";
import Link from "next/link";

const essay = [
    `Hello and welcome! You are currently reading (out loud) an essay we wrote, for the purpose of collecting voice data to create your AI clone. Take your time: don’t rush through this. As long as you can finish reading this essay in 6 minutes, you are reading fast enough. But try not to read too slowly either; keep to a normal speaking pace.`,
    `We're thrilled to introduce you to this special tool powered by AI, designed especially for those who dream of singing. Imagine being able to transform any song you like into your own voice, sounding just like your favorite singer. Yes, it's possible, no matter how you sing right now.`,
    `Our aim in creating this tool was to provide you with the ultimate practice aid. You can now listen to yourself singing like a professional, helping you practice better and feel more confident. This means you can hear yourself singing as perfectly as your favorite singer. Isn't that amazing?`,
    `Using this AI tool is quite easy. Once your voice is cloned, you're all set. The data you provide helps us create a clone tailored just for you. This clone can then be used with any song you choose. To do this properly, we need a variety of voice data covering your entire vocal range.`,
    `Here are all the steps we need you to do:
    1) Speaking Part 1: You're already doing it by reading this essay!
    2) Speaking Part 2: Provide further speaking data by reading our list of random sentences.
    3) Pitch Matching: Show us your vocal range through simple pitch exercises.
    4) Singing: Sing along to 2 short, well-known songs, just do your best!`,
    `Completing these 4 steps takes about 20 minutes in total, and you're already well on your way. Once you're done and your recordings are uploaded, we train our AI to match your voice. This might take a few hours, but sometimes even as little as 15 minutes, depending on how many other people are doing it.`,
    `We'll let you know when it's ready. Afterward, you can use your voice clone by using song conversion credits. We've given you 3 credits right away, just for cloning your voice. If you need more, we offer subscriptions and pay-as-you-go options. Each credit lasts forever and can be used for songs up to 10 minutes long.`,
    `When choosing songs to convert, remember that the audio quality and style matter. Simple vocal recordings work best. Behind the scenes, your AI clone works to transform voices into your own, but it can only work on voices. Thus, if there are instruments in the song, the vocals will need to be extracted. Don’t worry, we'll handle it for you. 
    If there's a chorus or background vocals, we will separate those too.`,
    `Though we can handle songs with lots of instruments and background sounds, our AI does better with strong lead vocals. As an example, think of songs with just an acoustic guitar – those work great. Reducing background noise helps avoid any odd sounds from the AI.`,
    `Lastly, try to pick songs within your singing range. The AI can't go higher or lower than the notes you provide. This is where the pitch ranges we'll give you come in handy. You've finished speaking for now. It's time for the pitch test. Keep it up – you're doing fantastic!
    `
];

const CloningStep = () => {
    const [step, setStep] = useState(0);

  return (
    <div className="px-4 lg:px-8 flex justify-center">
        <div className="pt-2 flex flex-col items-center justify-center gap-2">
            <CloningStepBar title="Step 1: Speaking Part 1" totalSteps={essay.length} step={step} setStep={setStep} />
            <Card className="w-full lg:max-w-3xl bg-muted mb-4 text-xl">
                <CardHeader>
                    <CardTitle className="text-md text-muted-foreground">
                        Read the following text, and record yourself all the way to the last slide.
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        {
                            essay[step]
                        }
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
                : <Link href="/clone/step-1-preview">
                    <Button 
                        className="text-md gap-2"
                        variant="outline"
                    >
                        <MoveLeftIcon />Step 1 Preview
                    </Button>
                </Link>}
                {step !== essay.length - 1 ?
                <Button
                    onClick={() => setStep(e => Math.min(essay.length - 1, e+1))}
                    className="gap-2 text-md"
                >
                    Continue<MoveRightIcon />
                </Button> 
                : <Link href="/clone/step-2-preview">
                    <Button className="text-md gap-2">
                        Step 2<MoveRightIcon />
                    </Button>
                </Link>}
            </div>
        </div>
    </div>
  )
}


export default CloningStep;