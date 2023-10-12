import { getClone, getCloneResults, getCurrentCloneJob, getCurrentUnsubmittedCloneJob, getSubmittedConversions } from "@/lib/runpod";
import { auth } from "@clerk/nextjs";
import { Dashboard } from "@/components/dashboard";
import { isJobDone } from "@/lib/utils";
import prismadb from "@/lib/prismadb";

interface UserData {
    clone: any;
    cloneJob: any;
    cloneResultUrls: any[];
    cloneFeedback: any;
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
    let cloneFeedback;
    if (clone) {
        const { urls } = await getCloneResults({ clone });
        cloneResultUrls = urls;

        try {
            cloneFeedback = await prismadb.feedback.findUnique({ where: { type_jobId: { type: "CLONE", jobId: clone.id } }});
        } catch (err) {
            console.log("Failed to fetch clone feedback");
        }
    }
    let cloneJob = await getCurrentCloneJob({ userId });
    if (!cloneJob) {
        cloneJob = await getCurrentUnsubmittedCloneJob({ userId });
    }
    const convertJobs = await getSubmittedConversions({ userId });
    const currentConvertJob = convertJobs.find(e => !isJobDone({ status: e.status })) || null;
    const res: UserData = { 
        clone, cloneJob, cloneResultUrls, cloneFeedback, convertJobs, currentConvertJob
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