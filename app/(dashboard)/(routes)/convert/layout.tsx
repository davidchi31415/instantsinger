import { Heading } from "@/components/heading";
import { getAPILimitCount } from "@/lib/api-limit";
import { getMostRecentCloneJob } from "@/lib/runpod";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { ArrowRightLeftIcon } from "lucide-react";

const CloneLayout = async ({children}: {children: React.ReactNode}) => {
    return (
        <div>
            <Heading
            title="Convert"
            description="Convert any song into your own voice."
            icon={ArrowRightLeftIcon}
            iconColor="text-violet-500"
            bgColor="bg-violet-500/10"
        />
            {children}
        </div>
    )
}

export default CloneLayout;