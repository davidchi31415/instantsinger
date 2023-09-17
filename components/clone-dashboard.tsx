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
        <div>
            <div className="pt-6 flex justify-center items-center gap-6 flex-wrap">
                <div>
                    <div className="rounded-3xl relative flow-root max-w-sm h-[15rem] px-6 lg:pb-6 mx-auto border-4 border-primary/25 bg-white">
                        <div className="-mt-5">
                            <div className="w-fit mx-auto">
                                <span className="inline-flex items-center justify-center w-12 h-12 p-2 text-lg font-black text-white bg-primary rounded-full shadow">1</span>
                            </div>
                            <h3 className={cn("mt-4 text-2xl font-bold leading-tight tracking-tight text-gray-700 text-center flex items-center justify-center gap-2", font.className)}>Clone your voice</h3>
                            <p className="mt-2 text-lg">
                                Complete a guided procedure to clone your voice in less than <b>3 minutes</b>.
                                We will give you <b>samples</b> to hear how it sounds.
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="rounded-3xl relative flow-root max-w-sm h-[15rem] px-6 lg:pb-6 mx-auto border-4 bg-white">
                        <div className="-mt-5">
                            <div className="w-fit mx-auto">
                                <span className="inline-flex items-center justify-center w-12 h-12 p-2 text-lg font-black text-muted-foreground bg-[white] border-2 rounded-full shadow">2</span>
                            </div>
                            <h3 className={cn("mt-4 text-2xl font-bold leading-tight tracking-tight text-gray-700 text-center", font.className)}>Convert any song</h3>
                            <p className="mt-2 text-lg">
                                Once your voice is cloned, you can convert any song into your voice
                                by pasting a YouTube link or uploading an audio file.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-fit mx-auto mt-8 text-center text-xl md:text-3xl">
                Let's get your voice cloned!
            </div>
            <div className="w-full mt-4 pb-8 flex items-center justify-center">
                <Link href="/dashboard/clone/preview">
                    <Button className="text-3xl gap-2 p-8 border-2 border-black hover:scale-105">
                        Begin<MoveRightIcon />
                    </Button>
                </Link>
            </div>
        </div>
    )
}