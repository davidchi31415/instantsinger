"use client"

import axios from "axios";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCard } from "@/components/alert-card";
import Link from "next/link";
import { MicIcon } from "lucide-react";

const CloningPage = () => {

  return (
    <div>
        <Heading
            title="Clone"
            description="Clone your voice through a step-by-step, guided process."
            icon={MicIcon}
            iconColor="text-pink-500"
            bgColor="bg-pink-500/10"
        />
        <div className="px-4 lg:px-8 flex justify-center">
          <div className="pt-8 flex flex-col items-center justify-center">
            <Card className="w-full lg:max-w-3xl  bg-muted mb-4 p-4 text-xl">
              {
                `You are about to enter a guided voice cloning process. There are two steps you will complete before we can begin creating
                your AI voice. First, you will read a passage of approximately 300 words while recording it with your microphone.
                In the second step, you will perform a pitch test by singing pitches you hear (while wearing headphones). It is okay if you mess up; the point of this process is to collect enough audio data of your voice 
                and what you sound like over your vocal range.`
              }
            </Card>
            <AlertCard variant="warning" title="Important Note Before Beginning" 
              message="Please find a quiet place (no background noise), with a microphone and headphones ready." 
            />
            <div className="mt-8 flex justify-center">
              <Link href="/clone/step-1">
                <Button size="lg" className="text-lg">Begin</Button>
              </Link>
            </div>
          </div>
        </div>
    </div>
  )
}


export default CloningPage;