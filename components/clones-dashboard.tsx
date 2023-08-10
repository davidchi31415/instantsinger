"use client";

import { ProgressCard } from "./progress-card";
import { Card } from "./ui/card";

interface ClonesDashboardProps {
    userData: {
        clones: any[];
        currentJob: any;
    }
}

export const ClonesDashboard = ({ userData }: ClonesDashboardProps) => {
    const noClones = userData.clones.length === 0 && userData.currentJob === null;

    return (
        <div>
            {noClones ? 
                    <div className="text-xl">
                        You do not have a voice clone. Create one in the <b>Create a Clone</b> tab.
                    </div> : ""
            }
            {userData.currentJob !== null ?
                <div className="w-[20rem] lg:w-[40rem] xl:w-[50rem]">
                    <div className="text-xl">Your voice "{userData.currentJob.name}" is being cloned.</div>
                    <ProgressCard process="Cloning" apiEndpoint="/api/clone/status" 
                        initStatus={userData.currentJob.status}
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
                <div className="text-xl">
                    Want another voice clone? Go to the <b>Create a Clone</b> tab.
                </div> : ""
            }
        </div>
    )
}