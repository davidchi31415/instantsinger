"use client"

import { useEffect, useState } from "react";
import { CloningStepBar } from "@/components/cloning-step-bar";
import { MicIcon, MoveLeftIcon, MoveRightIcon, UploadCloudIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AudioCard } from "@/components/audio-card";
import { FileUploader } from "@/components/file-uploader";

const songs = [
    {
        url: "https://www.youtube.com/watch?v=TMSIR210mRg&pp=ygUObG92ZSB5b3Vyc2VsZiA%3D"
    },
    {
        url: "https://www.youtube.com/watch?v=hLQl3WQQoQ0&pp=ygUcc29tZWJvZHkgdGhhdCBpIHVzZWQgdG8ga25vdw%3D%3D",
    }
]

const CloningStep3Slides = ({ jobId }) => {
    const [step, setStep] = useState(0);

    return (
        <div className="px-4 lg:px-8 flex justify-center">
            <div className="pt-8 flex flex-col items-center justify-center">
                <div className="pt-2 flex flex-col items-center justify-center gap-2">
                    <CloningStepBar title="Step 3: Singing" steps={songs} step={step} setStep={setStep} />
                    <Card className="w-full lg:max-w-3xl bg-muted mb-4 text-xl">
                        <CardHeader>
                            <CardTitle className="text-md text-muted-foreground">
                                Sing along with any song, and record yourself while doing so.
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <div className="font-bold">Song {step+1}</div>
                                <div className="mb-4">Remember: Keep it between 3 and 5 minutes.</div>
                                <div className="text-primary cursor-pointer"
                                    onClick={() =>  window.open(songs[step].url)}
                                >
                                    Can't think of a song? Click here for a suggestion.
                                </div>
                            </div>
                            <div className="mt-4 bg-white p-4 rounded-md border border-black">
                                <div className="mb-2">Upload your recording for Song {step+1}.</div>
                                <FileUploader uploadEndpoint="/api/clone/upload"
                                    apiParams={{ cloneId: jobId, fileName: `3_${step+1}` }}
                                    durationLimit={6}
                                />
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
                        : <Link href="/clone/step-3-preview">
                            <Button 
                                className="text-md gap-2"
                                variant="outline"
                            >
                                <MoveLeftIcon />Step 3 Preview
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


export default CloningStep3Slides;