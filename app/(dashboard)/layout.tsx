import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";

import { AlertCard } from "@/components/alert-card";
import { Button } from "@/components/ui/button";
import { getClone, getConversions, getMostRecentCloneJob, getSubmittedConversions } from "@/lib/runpod";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CloneDashboard } from "@/components/clone-dashboard";
import { isJobDone } from "@/lib/utils";
import prismadb from "@/lib/prismadb";
import { getCredits } from "@/lib/credits";
import { Dashboard } from "@/components/dashboard";
import { Footer } from "@/components/footer";

interface UserData {
    clone: any;
    cloneJob: any;
    convertJobs: any[];
    convertCredits: number;
    cloneCredits: number;
}

const getUserData = async () => {
    const { userId } = auth();
    if (userId === null) return { 
        clone: null, cloneJob: null, convertJobs: [],
        cloneCredits: 0, convertCredits: 0
    };

    const clone = await getClone({ userId });
    const cloneJob = await getMostRecentCloneJob({ userId });
    const convertJobs = await getSubmittedConversions({ userId });
    const { cloneCredits, convertCredits } = await getCredits();
    const res: UserData = { 
        clone, cloneJob: cloneJob, convertJobs: convertJobs,
        cloneCredits, convertCredits
    };

    return res;
}

const DashboardLayout = async ({children}: {children: React.ReactNode}) => {
    const userData = await getUserData();

    return (
        <div className="h-full relative">
            <Navbar 
                convertCredits={userData.convertCredits} 
            />
            <main className="h-full">
                <div className="pt-24">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default DashboardLayout;