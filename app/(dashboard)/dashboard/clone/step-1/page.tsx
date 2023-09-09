import { auth } from "@clerk/nextjs";
import { getCurrentUnsubmittedCloneJob } from "@/lib/runpod";
import prismadb from "@/lib/prismadb";
import CloningStep1Slides from "./step-1-slides";
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

const CloningStep1Page = async () => {
    const { userId } = auth();

    if (!userId) return null;
    const jobId = await getCloneJobId({ userId });

  return (
    <>
      <CloningStep1Slides jobId={jobId} />
    </>
  )
}


export default CloningStep1Page;