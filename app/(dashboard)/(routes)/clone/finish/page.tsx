import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import CloningFinishStep from "./cloning-finish-step";
import { auth } from "@clerk/nextjs";
import { getClones, getCurrentUnsubmittedCloneJob, getMostRecentCloneJob } from "@/lib/runpod";
import prismadb from "@/lib/prismadb";
import { getFileList } from "@/lib/gcloud";

interface CloneData {
    clones: any[];
    currentJob: any;
}

const getCloneNames = async () => {
    const { userId } = auth();
    if (userId === null) return [];

    const clones = await getClones({ userId });
    const cloneNames = clones.map((clone) => clone.name);

    return cloneNames;
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

    const cloneNames = await getCloneNames();
    const uploadedFiles = await getFileList({ directory: `training_data/${unsubmittedCloneJob.id}` });

    const isManual = searchParams?.manual ? true : false;

    return (
        <CloningFinishStep usedNames={cloneNames} jobId={unsubmittedCloneJob.id} 
            uploadedFilenames={uploadedFiles.fileNames}
            isManual={isManual}
        />
    )
}

export default CloningFinishPage;