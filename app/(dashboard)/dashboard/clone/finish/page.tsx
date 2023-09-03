import CloningFinishStep from "./cloning-finish-step";
import { auth } from "@clerk/nextjs";
import { getCurrentUnsubmittedCloneJob, getMostRecentCloneJob } from "@/lib/runpod";
import prismadb from "@/lib/prismadb";
import { getFileList } from "@/lib/gcloud";

interface CloneData {
    currentJob: any;
}

interface CloningFinishPageProps {
    searchParams?: { [key: string]: string | undefined }
}

const CloningFinishPage = async ({ searchParams }: CloningFinishPageProps) => {
    const { userId } = auth();

    if (!userId) return null;

    let unsubmittedCloneJob = await getCurrentUnsubmittedCloneJob({ userId });
    if (!unsubmittedCloneJob) {
        unsubmittedCloneJob = await prismadb.cloneJob.create({
            data: { userId }
        });
    }

    const uploadedFiles = await getFileList({ directory: `training_data/${unsubmittedCloneJob.id}` });

    const isManual = searchParams?.manual ? true : false;

    return (
        <CloningFinishStep jobId={unsubmittedCloneJob.id} 
            uploadedFilenames={uploadedFiles.fileNames}
            isManual={isManual}
        />
    )
}

export default CloningFinishPage;