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
          <div className="text-2xl font-bold text-center w-full mb-2">Step 1 Preview</div>
          <Card className="w-full lg:max-w-3xl bg-muted mb-4 p-4 text-xl
            flex flex-col gap-2
          ">
            <p>
              You will read aloud a short essay we have prepared for you. It will be split into a series of slides,
              and it should take, in total, less than 5 minutes to read.
            </p>
            <p>Please record yourself reading it and <b>save it to a single audio file.</b></p>
            <p>
              <b>It is okay if you mess up</b> at any point. The point is to hear how you sound.
            </p>
            
          </Card>
          <div className="w-full lg:max-w-3xl">
            <AlertCard variant="warning" title="Important Note" 
              message=
              {<div>Beware of <b>background noise</b> and poor <b>microphone quality</b>, as these will degrade the AI performance. 
              Try to record only your voice, with as few other noises as possible.</div>}
            />
          </div>
          <div className="w-full mt-4 flex items-center justify-between">
            <Link href="/clone">
                <Button 
                    className="text-md gap-2"
                    variant="outline"
                >
                    <MoveLeftIcon />Intro
                </Button>
            </Link><Link href="/clone/step-1">
                <Button className="text-md gap-2">
                    Begin Step 1<MoveRightIcon />
                </Button>
            </Link>
          </div>
        </div>
      </div>
    )
}


export default CloningStepPreview;