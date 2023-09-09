import { auth } from "@clerk/nextjs";
import { getCurrentUnsubmittedCloneJob } from "@/lib/runpod";
import prismadb from "@/lib/prismadb";
import CloningStep2Slides from "./step-2-slides";
import { RecorderComponent } from "@/components/recorder";

const getCloneJobId = async ({ userId }) => {
    let unsubmittedCloneJob = await getCurrentUnsubmittedCloneJob({ userId });
    if (!unsubmittedCloneJob) {
        unsubmittedCloneJob = await prismadb.cloneJob.create({
            data: { userId }
        });
    }

    return unsubmittedCloneJob.id;
}

const CloningStep2Page = async () => {
    const { userId } = auth();

    if (!userId) return null;
    const jobId = await getCloneJobId({ userId });

  return (
    <>
      <CloningStep2Slides jobId={jobId} />
    </>
  )
}


export default CloningStep2Page;