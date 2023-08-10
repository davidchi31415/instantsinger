"use client"

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MicIcon, MoveLeftIcon, MoveRightIcon, UploadCloudIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { CloningStepBar } from "@/components/cloning-step-bar";
import Link from "next/link";

const essay = [
    `Welcome! This is an AI-powered singing tool built for the aspiring singer. 
    By using cutting-edge technology, we provide a cheap and easy process for cloning your singing voice and transforming any song of your choice into your own voice. 
    That's right. You can now hear yourself sing exactly the way your favorite singer would if they had your voice - regardless of your current singing ability.`,
    `We created this tool with the goal of providing you with the perfect audio reference to practice singing with: your own voice, mixed with professional singing ability. 
    This will allow you to practice more effectively and more confidently. You can now, for the first time ever, hear an idealized version of your singing.
    The process is composed of two steps: 1) voice cloning, and 2) voice conversion.`,
    `Right now, we are in step 1. You are reading these words to provide speaking data. You will then be asked to provide your vocal range through a simple pitch exercise. 
    This entire collection process should take around 10 minutes - you have already gone through a significant portion. We will then train our AI for you within 6 hours, 
    although realistically, it will be much faster; we will notify you when it is done.`,
    `Once the cloning process is complete, step 2 is as simple as uploading any song to our website and clicking a button. If you can, we recommend using pure vocal recordings, 
    but we will automatically process full songs to separate the vocal and instrumental stems for you. `,
    `Furthermore, you should aim for songs within your vocal range, as our AI will not be able to extend beyond the pitches you provide - i.e., your voice will strain for notes 
    that are too high or low. That's all for the speaking part. You will now take the pitch test; keep it up, you're doing great!`
];

const CloningStep = () => {
    const [step, setStep] = useState(0);

  return (
    <div className="px-4 lg:px-8 flex justify-center">
        <div className="pt-2 flex flex-col items-center justify-center gap-2">
            <CloningStepBar title="Step 1: Speaking" totalSteps={essay.length} step={step} setStep={setStep} />
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