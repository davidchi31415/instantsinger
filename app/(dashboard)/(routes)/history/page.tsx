import { HistoryTable } from "@/components/history-table";
import { getCompletedConversions, getCurrentConversions } from "@/lib/runpod";
import { auth } from "@clerk/nextjs";

interface HistoryData {
    conversions: any[];
    currentJobs: any[];
}

const getUserData = async () => {
    const { userId } = auth();
    if (userId === null) return { conversions: [], currentJobs: [] };

    const conversions = await getCompletedConversions({ userId });
    const res: HistoryData = {
        conversions,
        currentJobs: []
    }

    const currentJobs = await getCurrentConversions({ userId });
    if (currentJobs?.length) {
      res.currentJobs = currentJobs;
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