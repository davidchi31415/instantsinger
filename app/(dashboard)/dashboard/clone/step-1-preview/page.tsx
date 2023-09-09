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
          <div className="text-2xl text-center w-full mb-2">Voice Cloning: Step 1</div>
          <Card className="w-full lg:max-w-3xl mb-4 p-4 text-xl
            flex flex-col gap-2
          ">
            <p>
              In this step, you will read a series of (non-sensical) sentences <b>out loud</b>, while recording yourself.
            </p>
            <p>
              <b>It is okay if you mess up</b>. The point is to hear how you sound.
            </p>
            
          </Card>
          <div className="w-fit mx-auto mt-4">
            <Link href="/dashboard/clone/step-1">
                <Button className="text-3xl gap-2 p-8 border-2 border-black hover:scale-105">
                    Begin<MoveRightIcon />
                </Button>
            </Link>
          </div>
        </div>
      </div>
    )
}


export default CloningStepPreview;