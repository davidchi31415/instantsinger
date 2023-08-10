import { HistoryTable } from "@/components/history-table";
import { getConversions, getMostRecentConvertJob } from "@/lib/runpod";
import { isJobDone } from "@/lib/utils";
import { auth } from "@clerk/nextjs";

interface HistoryData {
    conversions: any[];
    currentJob: any;
}

const getUserData = async () => {
    const { userId } = auth();
    if (userId === null) return { conversions: [], currentJob: null };

    const conversions = await getConversions({ userId });
    const res: HistoryData = {
        conversions,
        currentJob: null
    }

    const currentJob = await getMostRecentConvertJob({ userId });
    if (currentJob && !isJobDone({ status: currentJob.status })) {
      res.currentJob = currentJob;
    }

    return res;
}

const HistoryPage = async () => {
    const userData = await getUserData();

    return (
        <div className="px-4 lg:px-8">
            <HistoryTable userData={userData} />
        </div>
    )
}

export default HistoryPage;