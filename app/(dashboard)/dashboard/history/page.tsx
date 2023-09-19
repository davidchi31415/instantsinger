import { getClone, getCloneResults, getCurrentCloneJob, getCurrentUnsubmittedCloneJob, getSubmittedConversions } from "@/lib/runpod";
import { auth } from "@clerk/nextjs";
import { getCredits } from "@/lib/credits";
import { HistoryTable } from "@/components/history-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeftIcon } from "lucide-react";

interface UserData {
    convertJobs: any[];
}

const getUserData = async () => {
    const { userId } = auth();
    if (userId === null) return {
        convertJobs: []
    };

    const convertJobs = await getSubmittedConversions({ userId });
    const res: UserData = { 
        convertJobs
    };

    return res;
}

const HistoryPage = async () => {
    const userData = await getUserData();

    return (
        <div className="px-4 lg:px-8">
            <div className="flex items-center justify-between">
                <Link href="/dashboard"><Button variant="outline" className="border-2 gap-2"><MoveLeftIcon /> Back</Button></Link>
                <div className="text-center w-fit mx-auto text-xl mb-4 text-wrap">Here are your song conversions!</div>
                <Link href="/dashboard" className="invisible"><Button variant="outline" className="border-2 gap-2"><MoveLeftIcon /> Back</Button></Link>
            </div>
            <HistoryTable userData={userData} />
        </div>
    )
}

export default HistoryPage;