import { Heading } from "@/components/heading";
import { getAPILimitCount } from "@/lib/api-limit";
import { getMostRecentCloneJob } from "@/lib/runpod";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { ArrowRightLeftIcon, HistoryIcon } from "lucide-react";

const HistoryLayout = async ({children}: {children: React.ReactNode}) => {
    return (
        <div>
            <Heading
                title="History"
                description="See (and hear) all your past conversions."
                icon={HistoryIcon}
            />
            {children}
        </div>
    )
}

export default HistoryLayout;