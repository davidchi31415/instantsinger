import { Heading } from "@/components/heading";
import { ArrowRightLeftIcon } from "lucide-react";

const CloneLayout = async ({children}: {children: React.ReactNode}) => {
    return (
        <div>
            <Heading
            title="Convert"
            description="Convert any song into your own voice."
            icon={ArrowRightLeftIcon}
            iconColor="text-orange-500"
            bgColor="bg-orange-500/10"
        />
            {children}
        </div>
    )
}

export default CloneLayout;