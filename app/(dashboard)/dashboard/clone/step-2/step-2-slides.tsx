"use client"

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MicIcon, MoveLeftIcon, MoveRightIcon, UploadCloudIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { CloningStepBar } from "@/components/cloning-step-bar";
import Link from "next/link";
import { FileUploader } from "@/components/file-uploader";
import { RecorderComponent } from "@/components/recorder";

const contents = [
    <div>
        <p>Sing as <b>LOW</b> as you can.</p>
        <div className="text-center italic my-4 text-base md:text-xl">
            <p>Happy birthday to you</p>
            <p>Happy birthday to you</p>
            <p>Happy birthday dear Someone</p>
            <p>Happy birthday to you</p>
        </div>
        <p className="text-center text-sm text-muted-foreground">"The Happy Birthday Song"</p>
    </div>,
    <div>
        <p>Now, sing as <b>NORMAL</b>.</p>
        <div className="text-center italic my-4 text-base md:text-xl">
            <p>Happy birthday to you</p>
            <p>Happy birthday to you</p>
            <p>Happy birthday dear Someone</p>
            <p>Happy birthday to you</p>
        </div>
        <p className="text-center text-sm text-muted-foreground">"The Happy Birthday Song"</p>
    </div>,
    <div>
        <p>Now, as <b>HIGH</b> as you can.</p>
        <div className="text-center italic my-4 text-base md:text-xl">
            <p>Happy birthday to you</p>
            <p>Happy birthday to you</p>
            <p>Happy birthday dear Someone</p>
            <p>Happy birthday to you</p>
        </div>
        <p className="text-center text-sm text-muted-foreground">"The Happy Birthday Song"</p>
    </div>,
    <div>
        <p>Sing as <b>LOW</b> as you can.</p>
        <div className="text-center italic my-4 text-base md:text-xl">
            <p>Twinkle, twinkle, little star</p>
            <p>How I wonder what you are!</p>
            <p>Up above the world so high</p>
            <p>Like a diamond in the sky</p>
            <p>Twinkle, twinkle, little star</p>
            <p>How I wonder what you are!</p>
        </div>
        <p className="text-center text-sm text-muted-foreground">"Twinkle Twinkle Litte Star"</p>
    </div>,
    <div>
        <p>Now, sing as <b>NORMAL</b>.</p>
        <div className="text-center italic my-4 text-base md:text-xl">
            <p>Twinkle, twinkle, little star</p>
            <p>How I wonder what you are!</p>
            <p>Up above the world so high</p>
            <p>Like a diamond in the sky</p>
            <p>Twinkle, twinkle, little star</p>
            <p>How I wonder what you are!</p>
        </div>
        <p className="text-center text-sm text-muted-foreground">"Twinkle Twinkle Litte Star"</p>
    </div>,
    <div>
        <p>Now, as <b>HIGH</b> as you can.</p>
        <div className="text-center italic my-4 text-base md:text-xl">
            <p>Twinkle, twinkle, little star</p>
            <p>How I wonder what you are!</p>
            <p>Up above the world so high</p>
            <p>Like a diamond in the sky</p>
            <p>Twinkle, twinkle, little star</p>
            <p>How I wonder what you are!</p>
        </div>
        <p className="text-center text-sm text-muted-foreground">"Twinkle Twinkle Litte Star"</p>
    </div>,
    <div>
        <p>Sing as <b>LOW</b> as you can.</p>
        <div className="text-center italic my-4 text-base md:text-xl">
            <p>ABCDEFG</p>
            <p>HIJKLMNOP</p>
            <p>QRS, TUV</p>
            <p>WX, Y and Z</p>
            <p>Now I know my ABCs</p>
            <p>Next time won't you sing with me</p>
        </div>
        <p className="text-center text-sm text-muted-foreground">"The Alphabet Song"</p>
    </div>,
    <div>
        <p>Now, sing as <b>NORMAL</b>.</p>
        <div className="text-center italic my-4 text-base md:text-xl">
            <p>ABCDEFG</p>
            <p>HIJKLMNOP</p>
            <p>QRS, TUV</p>
            <p>WX, Y and Z</p>
            <p>Now I know my ABCs</p>
            <p>Next time won't you sing with me</p>
        </div>
        <p className="text-center text-sm text-muted-foreground">"The Alphabet Song"</p>
    </div>,
    <div>
        <p>Now, as <b>HIGH</b> as you can.</p>
        <div className="text-center italic my-4 text-base md:text-xl">
            <p>ABCDEFG</p>
            <p>HIJKLMNOP</p>
            <p>QRS, TUV</p>
            <p>WX, Y and Z</p>
            <p>Now I know my ABCs</p>
            <p>Next time won't you sing with me</p>
        </div>
        <p className="text-center text-sm text-muted-foreground">"The Alphabet Song"</p>
    </div>,
];

const CloningStep2Slides = ({ jobId }) => {
    const [step, setStep] = useState(0);

  return (
    <>
        <div className="px-4 lg:px-8 md:max-w-lg mx-auto flex justify-center">
            <Card className="w-full lg:max-w-3xl text-xl">
                <CardHeader>
                    <div className="w-full flex items-center justify-between">
                        <Button
                            disabled={step <= 0}
                            onClick={() => setStep(e => Math.max(0, e-1))}
                            className="gap-2 text-md"
                            variant="outline"
                        >
                            <MoveLeftIcon />
                        </Button>
                        <div>{step+1}/{contents.length}</div>
                        <Button
                            disabled={step >= contents.length - 1}
                            onClick={() => setStep(e => Math.min(contents.length - 1, e+1))}
                            className="text-md gap-2 border-2 border-black hover:scale-105"
                        >
                            <MoveRightIcon />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div>
                        {contents[step]}
                    </div>
                    <div className="text-center text-md text-primary border-t-2 mt-2 pt-2">
                        Do not stop recording.
                    </div>
                </CardContent>
            </Card>
        </div>
        <RecorderComponent jobId={jobId} stepNumber={2} minDuration={2} maxDuration={6} />
    </>
  )
}


export default CloningStep2Slides;