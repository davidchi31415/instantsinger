import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getAPILimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import CloningFinishStep from "./cloning-finish-step";
import { auth } from "@clerk/nextjs";
import { getClones, getMostRecentCloneJob } from "@/lib/runpod";

interface CloneData {
    clones: any[];
    currentJob: any;
}

const getCloneNames = async () => {
    const { userId } = auth();
    const clones = await getClones({ userId });
    const cloneNames = clones.map((clone) => clone.name);

    return cloneNames;
}

const CloningFinishPage = async () => {
    // const apiLimitCount = await getAPILimitCount();
    // const isPro = await checkSubscription();
    const cloneNames = await getCloneNames();

    return (
        <CloningFinishStep usedNames={["My Voice"]} />
    )
}

export default CloningFinishPage;