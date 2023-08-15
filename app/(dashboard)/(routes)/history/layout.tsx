import { Heading } from "@/components/heading";
import { HistoryIcon } from "lucide-react";

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