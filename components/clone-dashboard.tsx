"use client";

import { useState } from "react";
import { ProgressCard } from "./progress-card";
import { Card } from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import Link from "next/link";
import { Button } from "./ui/button";
import { AlertCard } from "./alert-card";
import { format } from 'date-fns';
import { ClonesTable } from "./clones-table";
import Image from "next/image";
import { MoveLeftIcon, MoveRightIcon } from "lucide-react";

interface ClonesDashboardProps {
    userData: {
        clones: any[];
        jobs: any[];
    }
    defaultTabClone?: boolean;
}

export const CloneDashboard = ({ userData }: ClonesDashboardProps) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-2xl font-bold text-center w-full mb-2">Guided Voice Cloning Process</div>
            <Card className="w-full lg:max-w-3xl bg-muted mb-4 p-4 text-xl
                flex flex-col gap-2
            ">
                <p>
                    In this procedure, you will record yourself following along, using a device such
                    as your laptop or phone. Record using an <b>external app</b> and save the files locally.
                    You will be told when to upload them to our website.
                </p>
                <p>
                    NOTE: In the instructions below, we <i>suggest</i> using your phone to record, but if your
                    laptop or other device has better microphone quality, use that instead.
                </p>
                <hr className="my-2" />
                <p>The following is an <b>IMPORTANT</b> checklist before you begin:</p>
                <p>
                    1) Find a <b>quiet</b> environment, with no background noise.
                </p>
                <div>
                    <div>2) Prepare the following devices:</div>
                    <ul className="list-disc p-0 ml-6">
                        <li>
                            a laptop or tablet to follow along with this procedure
                        </li>
                        <li>
                            a microphone for recording yourself (e.g., your phone, or your laptop)
                        </li>
                    </ul>
                </div>
                <div className="my-4 flex flex-col justify-center items-center">
                    <Image
                        alt="cloning setup"
                        width={500} height={500}
                        src="/cloning_setup.jpeg"
                    />
                    <div className="mt-2 text-muted-foreground text-sm">Example setup, with a phone for recording</div>
                </div>
                <p>
                    3) Set your microphone <b>close to your face</b>. This is to prevent <b>room echo/reverb</b> from your surroundings.
                    You can even put a blanket over your setup <a target="_blank" href="https://www.youtube.com/watch?v=sq2yoVwpRs8" rel="noopener noreferrer">
                        <span className="text-primary cursor-pointer">as shown in this video</span>
                    </a> for further echo-reduction.
                </p>
                <p>
                    4) Have <b>headphones</b>, connected to your laptop, ready for steps where you will need to sing along with a recording. This is to prevent audio other than your voice from being recorded.
                </p>
            </Card>
            <div className="w-full lg:max-w-3xl">
                <AlertCard variant="warning" title="Caution" 
                message=
                {<div>Beware of <b>background noise</b> and poor <b>microphone quality</b>, as these will degrade the quality of the AI. 
                Try to record only your voice, with as few other noises as possible.</div>}
                />
            </div>
            <div className="w-full mt-4 flex items-center justify-center">
                <Link href="/clone/step-1-preview">
                    <Button className="text-xl gap-2 p-4 border-2 border-black hover:scale-105">
                        Begin<MoveRightIcon />
                    </Button>
                </Link>
            </div>
        </div>
    )
}