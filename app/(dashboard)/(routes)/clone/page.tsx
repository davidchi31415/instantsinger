import { AlertCard } from "@/components/alert-card";
import { Button } from "@/components/ui/button";
import { getClones, getMostRecentCloneJob } from "@/lib/runpod";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClonesDashboard } from "@/components/clones-dashboard";
import { isJobDone } from "@/lib/utils";

interface CloneData {
    clones: any[];
    currentJob: any;
}

const getUserData = async () => {
    const { userId } = auth();
    if (userId === null) return { clones: [], currentJob: null };

    const clones = await getClones({ userId });
    const res: CloneData = { clones, currentJob: null };

    const currentJob = await getMostRecentCloneJob({ userId });
    if (currentJob && currentJob.status !== "NOT_SUBMITTED" && !isJobDone({ status: currentJob.status })) {
        res.currentJob = currentJob;
    }

    return res;
}

const CloneHomePage = async () => {
    const userData = await getUserData();

    return (
        <div>
            <ClonesDashboard userData={userData} />
        </div>
    );
};

export default CloneHomePage;