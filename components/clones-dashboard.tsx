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

export const ClonesDashboard = ({ userData, defaultTabClone }: ClonesDashboardProps) => {
    return (
        <Tabs defaultValue={defaultTabClone ? "create" : "my-clones"} className="flex flex-col items-center gap-8">
            <TabsList className="py-6 gap-2 bg-primary/20">
                <TabsTrigger value="my-clones" className="text-xl">My Clones</TabsTrigger>
                <TabsTrigger value="create" className="text-xl">Create a Clone</TabsTrigger>
            </TabsList>

            <TabsContent value="my-clones">
                <div className="w-[20rem] lg:w-[40rem] xl:w-[50rem]">
                    <ClonesTable userData={userData} />
                </div>
            </TabsContent>

            <TabsContent value="create">
                <div className="text-2xl font-bold text-center w-full mb-2">Guided Voice Cloning Process</div>
                <Card className="w-full lg:max-w-3xl bg-muted mb-4 p-4 text-xl
                    flex flex-col gap-2
                ">
                    <p>The following is an <b>IMPORTANT</b> checklist before you begin:</p>
                    <p>
                        1) Find a <b>quiet</b> environment, with no background noise.
                    </p>
                    <div>
                        <div>2) Prepare <b>2 devices:</b></div>
                        <ul className="list-disc p-0 ml-6">
                            <li>
                                one for following along with this procedure (e.g., a laptop or tablet)
                            </li>
                            <li>
                                your phone, for recording yourself
                            </li>
                        </ul>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <Image
                            alt="cloning setup"
                            width={500} height={500}
                            src="/cloning_setup.jpeg"
                        />
                    </div>
                    <p>
                        3) Set your phone within <b>1 foot away</b> from your face. Keep it close to you to prevent <b>room echo/reverb</b> from your surroundings.
                        You can even put a blanket over your setup <a target="_blank" href="https://www.youtube.com/watch?v=sq2yoVwpRs8" rel="noopener noreferrer">
                            <span className="text-primary cursor-pointer">as shown in this video</span>
                        </a> for further echo-reduction.
                    </p>
                    <p>
                        4) Have <b>headphones</b>, connected to your laptop, ready for later steps.
                    </p>
                    <div className="mt-4">
                        If you have a studio microphone setup, you may use it instead of your phone.
                    </div>
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
            </TabsContent>
        </Tabs>
    )
}