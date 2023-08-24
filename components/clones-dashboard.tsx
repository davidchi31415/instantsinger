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
        currentJob: any;
    }
    defaultTabClone?: boolean;
}

export const ClonesDashboard = ({ userData, defaultTabClone }: ClonesDashboardProps) => {
    const [cloningStatus, setCloningStatus] = useState<string>(
        userData.currentJob !== null ? userData.currentJob.status : ""
    )

    return (
        <Tabs defaultValue={defaultTabClone ? "create" : "my-clones"} className="flex flex-col items-center gap-8">
            <TabsList className="py-6 gap-2 bg-primary/20">
                <TabsTrigger value="my-clones" className="text-xl">My Clones</TabsTrigger>
                <TabsTrigger value="create" className="text-xl">Create a Clone</TabsTrigger>
            </TabsList>

            <TabsContent value="my-clones">
                <div className="w-[20rem] lg:w-[40rem] xl:w-[50rem]">
                    <ClonesTable userData={userData} 
                        currentJobStatus={cloningStatus}
                        onCurrentJobUpdate={setCloningStatus} 
                    />
                </div>
            </TabsContent>

            <TabsContent value="create">
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