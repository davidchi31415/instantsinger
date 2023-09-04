"use client";

import { useState } from "react";
import { ProgressCard } from "./progress-card";
import { Card } from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import { AlertCard } from "./alert-card";
import Image from "next/image";
import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { Empty } from "./empty";
import { useRouter } from "next/navigation";
import { isJobDone } from "@/lib/utils";

interface ClonesDashboardProps {
    userData: {
        clone: any;
        cloneJob: any;
        convertJobs: any[];
        convertCredits: number;
        cloneCredits: number;
    }
}

export const CloneDashboard = ({ userData }: ClonesDashboardProps) => {
    const router = useRouter();

    if (!userData.clone) {
        const cloningInProgress = (userData.cloneJob && userData.cloneJob?.status !== "NOT_SUBMITTED");
        if (cloningInProgress) {
            return <div className="flex flex-col items-center gap-2 text-xl">
                <Empty label="Congrats! Your AI Voice is on its way." />
                <div className="w-[25rem] mt-2">
                    <ProgressCard 
                        process="Cloning" apiEndpoint="/api/clone/status" apiId={userData.cloneJob.id}
                        onStatusChange={() => router.refresh()}
                        initStatus={userData.cloneJob.}
                    />
                </div>
            </div>
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-2xl font-bold text-center w-full mt-8 mb-2">Guided Voice Cloning Process</div>
            <Card className="w-full lg:max-w-3xl mb-4 p-4 text-xl flex flex-col gap-2">
                <p>
                    Before we can begin,
                </p>
                <p>
                    1) Find a <b>quiet</b> environment, with no background noise.
                </p>
                <p>
                    2) Have your phone (or microphone) ready. Keep it <b>close to your face</b> to <b>prevent echo</b> from your surroundings.
                </p>
                <p>Record yourself using an <b>external app</b> and upload your files when instructed.</p>
                <p>
                    Try to record only your voice, with as few other noises as possible.
                </p>
            </Card>
            <div className="w-full mt-2 flex items-center justify-center">
                <Link href="/dashboard/clone/step-1-preview">
                    <Button className="text-xl gap-2 p-4 border-2 border-black hover:scale-105">
                        Begin<MoveRightIcon />
                    </Button>
                </Link>
            </div>
        </div>
    )
}