import { cn } from "@/lib/utils";

interface CloningStepBarProps {
    title: string;
    totalSteps: number;
    step: number;
    setStep: Function;
}

export const CloningStepBar = ({ title, totalSteps, step, setStep }: CloningStepBarProps) => {
    return (
        <div>
            <div className="text-2xl font-bold text-center w-full mb-2">{title}</div>
            <div className="flex items-center justify-center h-fit gap-2">
                <div className="flex items-center justify-center h-fit gap-0.5 bg-[#eeeeee] rounded-md">
                    {[...Array(totalSteps).keys()].map((_, index) => {
                        return (
                            <div className={cn("h-4 w-8 md:w-12 lg:w-16 border border-black/10",
                                index === 0 ? "rounded-l-md" : "",
                                index === totalSteps - 1 ? "rounded-r-md" : "",
                                index < step ? "bg-[green]" : "",
                                index === step ? "bg-primary" : "cursor-pointer"
                            )} onClick={index !== step ? () => setStep(index) : () => {}}>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}