import { Card } from "./ui/card";
import { Progress } from "./ui/progress";

interface ProgressBarProps {
    text: string;
    progress: number;
}

export const ProgressBar = ({text, progress}: ProgressBarProps) => {
    return (
        <Card className="p-4 border border-black/50">
            <Progress value={progress} className="w-full bg-[lightgray]" />
            <div className="text-sm text-muted-foreground mt-1">{text}: {progress}%</div>      
        </Card>
    )
}