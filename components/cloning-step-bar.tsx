import { cn } from "@/lib/utils";
import { UploadIcon } from "lucide-react";
import { Button } from "./ui/button";

interface CloningStepBarProps {
    title: string;
    steps: any[];
    step: number;
    setStep: Function;
}

export const CloningStepBar = ({ title, steps, step, setStep }: CloningStepBarProps) => {
    return (
        <div>
            <div className="text-2xl font-bold text-center w-full mb-2">{title}</div>
            <div className="flex items-center justify-center h-fit gap-2">
                <div className="flex items-center justify-center h-fit gap-0.5 rounded-md">
                    {steps.map((_, index) => {
                        return (
                            <div className={cn("h-4 w-8 md:w-12 lg:w-16 border border-black/20",
                                index === 0 ? "rounded-l-md" : "",
                                index === steps?.length - 1 ? "rounded-r-md" : "",
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