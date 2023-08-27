import { AlertCard } from "@/components/alert-card";
import { Button } from "@/components/ui/button";
import { getClones, getMostRecentCloneJob } from "@/lib/runpod";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClonesDashboard } from "@/components/clones-dashboard";
import { isJobDone } from "@/lib/utils";
import prismadb from "@/lib/prismadb";

interface CloneData {
    clones: any[];
    jobs: any[];
}

const getUserData = async () => {
    const { userId } = auth();
    if (userId === null) return { clones: [], jobs: [] };

    const clones = await getClones({ userId });
    const jobs = await prismadb.cloneJob.findMany({ 
        where: { 
            userId, 
            NOT: { 
                OR: [ 
                    { status: "COMPLETED" }, 
                    { status: "NOT_SUBMITTED" }
                ] 
            }
        }
    });
    const res: CloneData = { clones, jobs };

    return res;
}

interface CloneHomePageProps {
    searchParams?: { [key: string]: string | undefined }
}

const CloneHomePage = async ({ searchParams }: CloneHomePageProps) => {
    const userData = await getUserData();

    const defaultTabClone = (searchParams?.newClone || (!userData.clones?.length && !userData.jobs?.length)) ? true : false;

    return (
        <div>
            <ClonesDashboard userData={userData} defaultTabClone={defaultTabClone} />
        </div>
    );
};

export default CloneHomePage;