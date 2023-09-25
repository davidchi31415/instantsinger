import { getClone, getCloneResults, getConversions, getCurrentCloneJob, getCurrentUnsubmittedCloneJob, getMostRecentCloneJob, getSubmittedConversions } from "@/lib/runpod";
import { auth } from "@clerk/nextjs";
import { getCredits } from "@/lib/credits";
import { Dashboard } from "@/components/dashboard";
import { isJobDone } from "@/lib/utils";

interface UserData {
    clone: any;
    cloneJob: any;
    cloneResultUrls: any[];
    convertJobs: any[];
    convertCredits: number;
    cloneCredits: number;
    currentConvertJob: any;
}

const getUserData = async () => {
    const { userId } = auth();
    if (userId === null) return {
        clone: null, cloneJob: null, cloneResultUrls: [], convertJobs: [],
        cloneCredits: 0, convertCredits: 0
    };

    const clone = await getClone({ userId });
    let cloneResultUrls:any[] = [];
    let cloneJob = await getCurrentCloneJob({ userId });
    if (!cloneJob) {
        cloneJob = await getCurrentUnsubmittedCloneJob({ userId });
    }
    const convertJobs = await getSubmittedConversions({ userId });
    const currentConvertJob = convertJobs.find(e => !isJobDone({ status: e.status })) || null;
    const { cloneCredits, convertCredits } = await getCredits();
    const res: UserData = { 
        clone, cloneJob, cloneResultUrls, convertJobs,
        cloneCredits, convertCredits,
        currentConvertJob
    };

    return res;
}

const DashboardPage = async () => {
    const userData = await getUserData();

    return (
        <Dashboard userData={userData} />
    )
}

export default DashboardPage;