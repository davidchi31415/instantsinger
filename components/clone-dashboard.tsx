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
import { cn, isJobDone } from "@/lib/utils";
import { Roboto_Slab } from "next/font/google";

const font = Roboto_Slab({
    weight: "600",
    subsets: ["latin"]
});

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
                        initStatus={userData.cloneJob.status}
                    />
                </div>
            </div>
        } else if (userData.cloneJob && isJobDone({ status: userData.cloneJob?.status })) {
            if (userData.cloneJob?.status !== "COMPLETED") {
                return <div className="flex flex-col items-center gap-2 text-xl">
                    <Empty label="Cloning job could not complete." />
                    <div className="w-[25rem] mt-2">
                        Contact assistance.
                    </div>
                </div>
            }
        }
    }

    return (
        <div className="px-4 lg:px-8 flex justify-center">
            <div className="pt-8 flex flex-col items-center justify-center">
                <div className="text-2xl text-center w-full mb-2">Voice Cloning Procedure</div>
                <Card className="w-full lg:max-w-3xl mb-4 p-4 text-xl
                flex flex-col gap-2
                ">
                <p>
                    To clone your voice, we ask you to sing some easy nursery songs (such as "Happy Birthday") while recording yourself.
                </p>
                <p>Please take your time, and finish within <b>2</b> to <b>5</b> minutes.</p>
                <p>
                    <b>It is okay if you mess up</b>. The point is to hear how you sound.
                </p>
                </Card>
                <div className="w-fit mx-auto mt-4">
                    <Link href="/dashboard/clone">
                        <Button className="text-3xl gap-2 p-8 border-2 border-black hover:scale-105">
                            Begin<MoveRightIcon />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}