"use client"

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MicIcon, MoveLeftIcon, MoveRightIcon, UploadCloudIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { RecorderComponent } from "@/components/recorder";

const contents = [
    <div>
        <p>Sing as <b>DEEP</b> as you can.</p>
        <p className="text-center text-sm mt-2 text-muted-foreground">"The Happy Birthday Song"</p>
        <div className="text-center italic mt-2 text-base md:text-xl">
            <p>Happy birthday to you</p>
            <p>Happy birthday to you</p>
            <p>Happy birthday dear Someone</p>
            <p>Happy birthday to you</p>
        </div>
    </div>,
    <div>
        <p>Now, sing as <b>NORMAL</b>.</p>
        <p className="text-center text-sm mt-2 text-muted-foreground">"The Happy Birthday Song"</p>
        <div className="text-center italic mt-2 text-base md:text-xl">
            <p>Happy birthday to you</p>
            <p>Happy birthday to you</p>
            <p>Happy birthday dear Someone</p>
            <p>Happy birthday to you</p>
        </div>
    </div>,
    <div>
        <p>Now, as <b>HIGH</b> as you can.</p>
        <p className="text-center text-sm mt-2 text-muted-foreground">"The Happy Birthday Song"</p>
        <div className="text-center italic mt-2 text-base md:text-xl">
            <p>Happy birthday to you</p>
            <p>Happy birthday to you</p>
            <p>Happy birthday dear Someone</p>
            <p>Happy birthday to you</p>
        </div>
    </div>,
    <div>
        <p>Sing as <b>DEEP</b> as you can.</p>
        <p className="text-center text-sm mt-2 text-muted-foreground">"Twinkle, Twinkle, Little Star"</p>
        <div className="text-center italic mt-2 text-base md:text-xl">
            <p>Twinkle, twinkle, little star</p>
            <p>How I wonder what you are!</p>
            <p>Up above the world so high</p>
            <p>Like a diamond in the sky</p>
            <p>Twinkle, twinkle, little star</p>
            <p>How I wonder what you are!</p>
        </div>
    </div>,
    <div>
        <p>Now, sing as <b>NORMAL</b>.</p>
        <p className="text-center text-sm mt-2 text-muted-foreground">"Twinkle, Twinkle, Little Star"</p>
        <div className="text-center italic mt-2 text-base md:text-xl">
            <p>Twinkle, twinkle, little star</p>
            <p>How I wonder what you are!</p>
            <p>Up above the world so high</p>
            <p>Like a diamond in the sky</p>
            <p>Twinkle, twinkle, little star</p>
            <p>How I wonder what you are!</p>
        </div>
    </div>,
    <div>
        <p>Now, as <b>HIGH</b> as you can.</p>
        <p className="text-center text-sm mt-2 text-muted-foreground">"Twinkle, Twinkle, Little Star"</p>
        <div className="text-center italic mt-2 text-base md:text-xl">
            <p>Twinkle, twinkle, little star</p>
            <p>How I wonder what you are!</p>
            <p>Up above the world so high</p>
            <p>Like a diamond in the sky</p>
            <p>Twinkle, twinkle, little star</p>
            <p>How I wonder what you are!</p>
        </div>
    </div>,
    <div>
        <p>Sing as <b>DEEP</b> as you can.</p>
        <p className="text-center text-sm mt-2 text-muted-foreground">"Row, Row, Row Your Boat"</p>
        <div className="text-center italic mt-2 text-base md:text-xl">
            <p>Row, row, row your boat</p>
            <p>Gently down the stream</p>
            <p>Merrily merrily, merrily, merrily</p>
            <p>Life is but a dream</p>
        </div>
    </div>,
    <div>
        <p>Now, sing as <b>NORMAL</b>.</p>
        <p className="text-center text-sm mt-2 text-muted-foreground">"Row, Row, Row Your Boat"</p>
        <div className="text-center italic mt-2 text-base md:text-xl">
            <p>Row, row, row your boat</p>
            <p>Gently down the stream</p>
            <p>Merrily merrily, merrily, merrily</p>
            <p>Life is but a dream</p>
        </div>
    </div>,
    <div>
        <p>Now, as <b>HIGH</b> as you can.</p>
        <p className="text-center text-sm mt-2 text-muted-foreground">"Row, Row, Row Your Boat"</p>
        <div className="text-center italic mt-2 text-base md:text-xl">
            <p>Row, row, row your boat</p>
            <p>Gently down the stream</p>
            <p>Merrily merrily, merrily, merrily</p>
            <p>Life is but a dream</p>
        </div>
    </div>,
];

const CloningSlides = ({ jobId }) => {
    const [step, setStep] = useState(0);
    const [isRecording, setRecording] = useState(false);

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
                    {isRecording ?
                        step !== contents.length - 1 ?
                            <div className="text-center text-md text-primary border-t-2 mt-2 pt-2">
                                Keep on recording.
                            </div>
                            :
                            <div className="text-center text-md text-primary border-t-2 mt-2 pt-2">
                                Stop recording here.
                            </div>
                        : ""
                    }
                </CardContent>
            </Card>
        </div>
        <RecorderComponent jobId={jobId} stepNumber={1} minDuration={2} maxDuration={5} onRecordChange={setRecording} />
    </>
  )
}


export default CloningSlides;