"use client"

import { MicIcon, MoveLeftIcon, MoveRightIcon, UploadCloudIcon } from "lucide-react";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { AlertCard } from "@/components/alert-card";

const CloningStepPreview = () => {

    return (
        <div className="px-4 lg:px-8 flex justify-center">
            <div className="pt-8 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-center w-full mb-2">Step 2 Preview</div>
                <Card className="w-full lg:max-w-3xl mb-4 p-4 text-xl
                flex flex-col gap-2
                ">
                <p>
                    You will be provided with pitches to sing along with. 
                </p>
                <p>
                    We recommend <b>wearing headphones</b> as you sing along, to prevent
                    our audio from being picked up by your microphone. 
                </p>
                <p>
                    You may use any syllable you prefer, such as "la" or "ah," to sing each pitch.
                </p>
                <p>Please record yourself singing and save it to <b>a single audio file.</b></p>
                <p>
                    <b>It is okay if you cannot match every pitch</b>.
                </p>
                
                </Card>
                <div className="w-full mt-4 flex items-center justify-between">
                    <Link href="/dashboard/clone/step-1">
                        <Button 
                            className="text-md gap-2"
                            variant="outline"
                        >
                            <MoveLeftIcon />Step 1
                        </Button>
                    </Link><Link href="/dashboard/clone/step-2">
                        <Button className="text-md gap-2">
                            Begin Step 2<MoveRightIcon />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default CloningStepPreview;