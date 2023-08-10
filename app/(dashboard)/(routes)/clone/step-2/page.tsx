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

const context = new AudioContext();
const piano = new SplendidGrandPiano(context);

const CloningStep = () => {
    const [step, setStep] = useState(0);

    return (
        <div className="px-4 lg:px-8 flex justify-center">
            <div className="pt-8 flex flex-col items-center justify-center">
                <div className="pt-2 flex flex-col items-center justify-center gap-2">
                    <CloningStepBar title="Step 2: Pitches" totalSteps={pianoSteps.length} step={step} setStep={setStep} />
                    <PianoCloningComponent piano={piano} context={context} 
                        lowestNote={pianoSteps[step].low} highestNote={pianoSteps[step].high} 
                        goingUp={pianoSteps[step].up} optional={pianoSteps[step].optional}
                    />
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
                        : <Link href="/clone/step-2-preview">
                            <Button 
                                className="text-md gap-2"
                                variant="outline"
                            >
                                <MoveLeftIcon />Step 2 Preview
                            </Button>
                        </Link>}
                        {step !== pianoSteps.length - 1 ?
                        <Button
                            onClick={() => setStep(e => Math.min(pianoSteps.length - 1, e+1))}
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