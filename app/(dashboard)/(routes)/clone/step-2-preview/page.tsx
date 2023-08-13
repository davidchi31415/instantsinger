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
          <div className="text-2xl font-bold text-center w-full mb-2">Step 2 Preview</div>
          <Card className="w-full lg:max-w-3xl bg-muted mb-4 p-4 text-xl
            flex flex-col gap-2
          ">
            <p>
              You will read aloud a series of sentences we have prepared for you. It will be split into a series of slides,
              and it should take, in total, less than 6 minutes to read.
            </p>
            <p>Please record yourself reading these sentences and save it to <b>a single audio file.</b></p>
            <p>
              <b>It is okay if you mess up</b> at any point. The point is to hear how you sound.
            </p>
            <p>What you will read will not make sense; these are random sentences, because we couldn't think of what to write :)</p>
            
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
            </Link><Link href="/clone/step-2">
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