"use client"

import { useEffect, useState } from "react";
import { SplendidGrandPiano } from "smplr";
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
          <div className="text-2xl font-bold text-center w-full mb-2">Step 1 Preview</div>
          <Card className="w-full lg:max-w-3xl mb-4 p-4 text-xl
            flex flex-col gap-2
          ">
            <p>
              You will read aloud a short essay we have prepared for you. It will be split into a series of slides,
              and it should take, in total, less than 6 minutes to read.
            </p>
            <p>Please record yourself reading it and save it to <b>a single audio file.</b></p>
            <p>You will upload the file at the end of the step.</p>
            <p>
              <b>It is okay if you mess up</b> at any point. The point is to hear how you sound.
            </p>
            
          </Card>
          <div className="w-full mt-4 flex items-center justify-between">
            <Link href="/dashboard">
                <Button 
                    className="text-md gap-2"
                    variant="outline"
                >
                    <MoveLeftIcon />Intro
                </Button>
            </Link>
            <Link href="/dashboard/clone/step-1">
                <Button className="text-md gap-2 border-2 border-black hover:scale-105">
                    Begin Step 1<MoveRightIcon />
                </Button>
            </Link>
          </div>
        </div>
      </div>
    )
}


export default CloningStepPreview;