import { auth } from "@clerk/nextjs";
import { getCurrentUnsubmittedCloneJob } from "@/lib/runpod";
import prismadb from "@/lib/prismadb";
import CloningSlides from "./slides";

const getCloneJobId = async ({ userId }) => {
    let unsubmittedCloneJob = await getCurrentUnsubmittedCloneJob({ userId });
    if (!unsubmittedCloneJob) {
        unsubmittedCloneJob = await prismadb.cloneJob.create({
            data: { userId }
        });
    }

    return unsubmittedCloneJob.id;
}

const CloningProcedurePage = async () => {
    const { userId } = auth();

    if (!userId) return null;
    const jobId = await getCloneJobId({ userId });

  return (
    <>
      <CloningSlides jobId={jobId} />
    </>
  )
}


export default CloningProcedurePage;