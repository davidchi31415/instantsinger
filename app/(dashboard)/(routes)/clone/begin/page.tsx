"use client"

import axios from "axios";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCard } from "@/components/alert-card";
import Link from "next/link";
import { MicIcon, MoveLeftIcon, MoveRightIcon } from "lucide-react";

const CloningPage = () => {

  return (
    <div className="px-4 lg:px-8 flex justify-center">
        <div className="pt-8 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-center w-full mb-2">Guided Voice Cloning Process</div>
          <Card className="w-full lg:max-w-3xl bg-muted mb-4 p-4 text-xl
            flex flex-col gap-2
          ">
            <p>
              There are two steps you will complete in this process.
            </p>
            <p>1. Speaking: you will read a passage of approximately 300 words while recording it with your microphone.</p>
            <p>2. Pitches: you will sing a set of pitches as we play them for you. It is important that you <b>wear headphones</b>{" "}
              during this step to prevent our audio from being picked up by your microphone.
            </p>
            <p>Finally, we stress that <b>it is okay if you mess up</b> at any point. 
              The point is to collect enough audio data of what your voice sounds like.
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
                      <MoveLeftIcon />Home
                  </Button>
              </Link><Link href="/clone/step-1-preview">
                  <Button className="text-md gap-2">
                      Begin<MoveRightIcon />
                  </Button>
              </Link>
            </div>
        </div>
      </div>
  )
}


export default CloningPage;