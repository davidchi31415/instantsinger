"use client"

import axios from "axios";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCard } from "@/components/alert-card";
import Link from "next/link";
import { MicIcon, MoveLeftIcon, MoveRightIcon } from "lucide-react";
import Image from "next/image";

const CloningPage = () => {

  return (
    <div className="px-4 lg:px-8 flex justify-center">
        <div className="pt-8 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-center w-full mb-2">Guided Voice Cloning Process</div>
          <Card className="w-full lg:max-w-3xl bg-muted mb-4 p-4 text-xl
            flex flex-col gap-2
          ">
            <p>
              Before you begin, make sure you are in a quiet environment. 
              Prepare a high-quality microphone to <b>record yourself</b> (e.g., your phone).
              You will be told what to record in the following steps.
            </p>
            <p>
              At the end of the procedure, you will <b>upload your recordings.</b>
            </p>
            <div className="mt-2 flex justify-center gap-8 flex-wrap">
              <div className="flex justify-center gap-2">
                <div className="w-[2rem] h-[2rem] rounded-full text-center text-white
                  flex items-center justify-center bg-primary">
                  1
                </div>
                <Image
                    alt="record_step_picture"
                    width={256} height={128}
                    src="/record_step_picture.png"
                />
              </div>
              <div className="flex justify-center gap-2">
                <div className="w-[2rem] h-[2rem] rounded-full text-center text-white
                  flex items-center justify-center bg-primary">
                  2
                </div>
                <Image
                    alt="upload_step_picture"
                    width={128} height={128}
                    src="/upload_step_picture.png"
                />
              </div>
            </div>
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