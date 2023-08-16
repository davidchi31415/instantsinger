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

interface ClonesDashboardProps {
    userData: {
        clones: any[];
        currentJob: any;
    }
}

export const ClonesDashboard = ({ userData }: ClonesDashboardProps) => {
    const [cloningStatus, setCloningStatus] = useState<string>(
        userData.currentJob !== null ? userData.currentJob.status : ""
    )

    return (
        <Tabs defaultValue="my-clones" className="flex flex-col items-center gap-8">
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
                <div className="text-5xl font-bold text-center">Choose a Method</div>
                <div className="mt-8 grid md:grid-cols-3 gap-2 md:gap-0">
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <Link href="/clone/begin">
                            <Button className="text-xl p-4 border-2 border-black" size="lg">
                                Guided
                            </Button>
                        </Link>
                        <div className="text-md text-muted-foreground text-center font-bold">Recommended!</div>
                    </div>
                    <div className="text-center">or</div>
                    <div className="flex flex-col gap-2 items-center justify-center">
                        {/* <Link href="/clone/finish?manual=true"> */}
                            <Button className="text-xl p-4 border-2 border-black" size="lg" disabled={true}>
                                Manual
                            </Button>
                        {/* </Link> */}
                        <div className="text-md text-muted-foreground text-center">Coming Soon</div>
                    </div>
                </div>
                <div className="w-full lg:max-w-xl mt-8">
                    <AlertCard title="Note" variant="default" size="lg" 
                        message={
                            <div>
                                The manual voice cloning process will allow you to use an arbitrary set of files,{" "}
                                if you already have a set of high-quality recordings for your voice. In the meantime,{" "}
                                please use the recommended Guided process.
                                {/* We recommend the Guided voice cloning process. If you already have a set of high-quality
                                recordings that sufficiently covers your vocal range, you may proceed with the Manual process instead.{" "}
                                <b>Only vocal recordings</b> allowed - no instrumentals. */}
                            </div>
                        }
                    />
                </div>
            </TabsContent>
        </Tabs>
    )
}