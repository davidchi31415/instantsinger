"use client";

import { useState } from "react";
import { ProgressCard } from "./progress-card";
import { Card } from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import Link from "next/link";
import { Button } from "./ui/button";
import { AlertCard } from "./alert-card";

interface ClonesDashboardProps {
    userData: {
        clones: any[];
        currentJob: any;
    }
}

export const ClonesDashboard = ({ userData }: ClonesDashboardProps) => {
    const noClones = userData.clones.length === 0 && userData.currentJob === null;

    const [cloningStatus, setCloningStatus] = useState<string>(
        userData.currentJob !== null ? userData.currentJob.status : ""
    )

    return (
        <Tabs defaultValue="my-clones" className="flex flex-col items-center gap-8">
            <TabsList className="p-6 gap-2">
                <TabsTrigger value="my-clones" className="text-xl">My Clones</TabsTrigger>
                <TabsTrigger value="create" className="text-xl">Create a Clone</TabsTrigger>
            </TabsList>

            <TabsContent value="my-clones">
                <div>
                    {noClones ? 
                            <div className="text-xl">
                                You do not have a voice clone. Create one in the <b>Create a Clone</b> tab.
                            </div> : ""
                    }
                    {userData.currentJob !== null ?
                        <div className="w-[20rem] lg:w-[40rem] xl:w-[50rem]">
                            <div className="text-xl mb-2">Your voice "{userData.currentJob.name}" is being cloned.</div>
                            <ProgressCard process="Cloning" apiEndpoint="/api/clone/status" 
                                initStatus={cloningStatus}
                                onStatusChange={setCloningStatus}
                            />
                        </div> : ""
                    }
                    {userData.clones.map((clone) => {
                        return (
                            <Card className="w-[20rem] lg:w-[40rem] xl:w-[50rem]">
                                <div className="text-center text-xl">"{clone.name}" | {clone.createdAt}</div>
                            </Card>
                        )
                    })}
                    {!noClones ?
                        <div className="text-xl mt-8">
                            Want another voice clone? Go to the <b>Create a Clone</b> tab.
                        </div> : ""
                    }
                </div>
            </TabsContent>

            <TabsContent value="create">
                <div className="text-5xl font-bold text-center">Choose a Method</div>
                <div className="mt-8 grid md:grid-cols-3 gap-2 md:gap-0">
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <Link href="/clone/begin">
                            <Button className="text-xl p-4" size="lg">
                                Guided
                            </Button>
                        </Link>
                        <div className="text-md text-muted-foreground text-center font-bold">Recommended!</div>
                    </div>
                    <div className="text-center">or</div>
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <Link href="/clone/byod">
                            <Button className="text-xl p-4" size="lg">
                                Manual
                            </Button>
                        </Link>
                        <div className="text-md text-muted-foreground text-center">Bring Your Own Data</div>
                    </div>
                </div>
                <div className="w-full lg:max-w-xl mt-8">
                    <AlertCard title="Note" variant="default" size="lg" 
                        message="We recommend the Guided voice cloning process. If you already have a set of high-quality
                        recordings that sufficiently covers your vocal range, you may proceed with the Manual process instead." 
                    />
                </div>
            </TabsContent>
        </Tabs>
    )
}