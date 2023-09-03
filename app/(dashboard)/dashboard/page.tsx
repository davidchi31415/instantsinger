import { getClone, getCloneResults, getConversions, getCurrentUnsubmittedCloneJob, getMostRecentCloneJob, getSubmittedConversions } from "@/lib/runpod";
import { auth } from "@clerk/nextjs";
import { getCredits } from "@/lib/credits";
import { Dashboard } from "@/components/dashboard";

interface UserData {
    clone: any;
    cloneJob: any;
    cloneResultUrls: any[];
    convertJobs: any[];
    convertCredits: number;
    cloneCredits: number;
}

const getUserData = async () => {
    const { userId } = auth();
    if (userId === null) return {
        clone: null, cloneJob: null, cloneResultUrls: [], convertJobs: [],
        cloneCredits: 0, convertCredits: 0
    };

    const clone = await getClone({ userId });
    let cloneResultUrls:any[] = [];
    if (clone) {
        const { urls } = await getCloneResults({ clone });
        cloneResultUrls = urls;
    }
    let cloneJob = await getMostRecentCloneJob({ userId });
    if (!cloneJob) {
        cloneJob = await getCurrentUnsubmittedCloneJob({ userId });
    }
    const convertJobs = await getSubmittedConversions({ userId });
    const { cloneCredits, convertCredits } = await getCredits();
    const res: UserData = { 
        clone, cloneJob, cloneResultUrls, convertJobs,
        cloneCredits, convertCredits
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