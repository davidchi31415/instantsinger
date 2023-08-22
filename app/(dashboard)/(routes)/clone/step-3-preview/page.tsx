"use client"

import { useEffect, useState } from "react";
import { SplendidGrandPiano } from "smplr";
import 'react-piano/dist/styles.css';
import '@/components/customPianoStyles.css';
import { PianoCloningComponent } from "@/components/piano-cloning-component";
import { CloningStepBar } from "@/components/cloning-step-bar";
import { MicIcon, MoveLeftIcon, MoveRightIcon, UploadCloudIcon } from "lucide-react";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { pianoSteps } from "../constants";
import { Card } from "@/components/ui/card";
import { AlertCard } from "@/components/alert-card";

const CloningStepPreview = () => {

    return (
        <div className="px-4 lg:px-8 flex justify-center">
            <div className="pt-8 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-center w-full mb-2">Step 3 Preview</div>
                <Card className="w-full lg:max-w-3xl bg-muted mb-4 p-4 text-xl
                flex flex-col gap-2
                ">
                <p>
                    In each slide, you will be provided with a set of pitches. Wearing headphones, sing along to these pitches{" "}
                    and record yourself as you do so. You may use whatever syllable you prefer, such as "la" or "ah" to sing each pitch.
                </p>
                <p>Please <b>record each slide separately</b> (i.e., save one file per slide).</p>
                <p>
                    There will be some slides marked <b>OPTIONAL</b>, which means you can skip them if they are out of your{" "}
                    vocal range.
                </p>
                <p>
                    Again, <b>it is okay if you mess up</b> at any point. You do not need to match every pitch perfectly, or at all.
                    The point is to collect audio over your vocal range.
                </p>
                
                </Card>
                <div className="w-full lg:max-w-3xl">
                <AlertCard variant="warning" title="Important Note" 
                    message=
                    {<div>Record using the highest quality microphone you own. Save the file and upload it at the very end.</div>}
                />
                </div>
                <div className="w-full mt-4 flex items-center justify-between">
                    <Link href="/clone/step-2">
                        <Button 
                            className="text-md gap-2"
                            variant="outline"
                        >
                            <MoveLeftIcon />Go Back to Step 2
                        </Button>
                    </Link><Link href="/clone/step-3">
                        <Button className="text-md gap-2">
                            Begin Step 3<MoveRightIcon />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default CloningStepPreview;