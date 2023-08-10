import { CloneInProgress } from "@/components/clone-in-progress";
import { Heading } from "@/components/heading";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getAPILimitCount } from "@/lib/api-limit";
import { getMostRecentCloneJob } from "@/lib/runpod";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { MicIcon } from "lucide-react";

const CloneLayout = async ({children}: {children: React.ReactNode}) => {
    // TODO - Get current clone jobs, get past clones, get credits

    return (
        <div className="w-full">
            <Heading
                title="Clone"
                description="Clone your voice. Then use it to convert songs into your voice."
                icon={MicIcon}
                iconColor="text-pink-500"
                bgColor="bg-pink-500/10"
            />
            {children}
        </div>
    )
}

export default CloneLayout;