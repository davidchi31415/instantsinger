import { getClone, getCloneResults, getCurrentCloneJob, getCurrentUnsubmittedCloneJob, getSubmittedConversions } from "@/lib/runpod";
import { auth } from "@clerk/nextjs";
import { Dashboard } from "@/components/dashboard";
import { isJobDone } from "@/lib/utils";

interface UserData {
    clone: any;
    cloneJob: any;
    cloneResultUrls: any[];
    convertJobs: any[];
    currentConvertJob: any;
}

const getUserData = async () => {
    const { userId } = auth();
    if (userId === null) return {
        clone: null, cloneJob: null, cloneResultUrls: [], convertJobs: [],
    };

    const clone = await getClone({ userId });
    let cloneResultUrls:any[] = [];
    if (clone) {
        const { urls } = await getCloneResults({ clone });
        cloneResultUrls = urls;
    }
    let cloneJob = await getCurrentCloneJob({ userId });
    if (!cloneJob) {
        cloneJob = await getCurrentUnsubmittedCloneJob({ userId });
    }
    const convertJobs = await getSubmittedConversions({ userId });
    const currentConvertJob = convertJobs.find(e => !isJobDone({ status: e.status })) || null;
    const res: UserData = { 
        clone, cloneJob, cloneResultUrls, convertJobs, currentConvertJob
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