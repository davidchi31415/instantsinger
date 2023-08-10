import ConversionDashboard from "@/components/conversion-dashboard";
import { getClones, getMostRecentConvertJob } from "@/lib/runpod";
import { isJobDone } from "@/lib/utils";
import { auth } from "@clerk/nextjs";

interface ConversionData {
  cloneNames: string[];
  currentJob: any;
}

const getUserData = async () => {
  const { userId } = auth();
  if (userId === null) return { cloneNames: [], currentJob: null };

  const clones = await getClones({ userId });
  const res: ConversionData = { 
    cloneNames: clones.map((clone) => clone.name),
    currentJob: null 
  };

  const currentJob = await getMostRecentConvertJob({ userId });
  if (currentJob && !isJobDone({ status: currentJob.status })) {
    res.currentJob = currentJob;
  }
  // res.currentJob = { status: "IN_PROGRESS" };

  return res;
}

const ConversionPage = async () => {
  const userData = await getUserData();

  return (
    <div>
      <ConversionDashboard userData={userData} />
    </div>
  )
}

export default ConversionPage;