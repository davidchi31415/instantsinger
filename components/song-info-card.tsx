import { AlertCircle, FileWarning, Terminal } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Card } from "./ui/card";
import { getFileName } from "@/lib/utils";

interface SongInfoCardProps {
  songName: string;
  songSize: number;
  songDuration: number;
}

export function SongInfoCard({ songName, songSize, songDuration }: SongInfoCardProps) {
  return (
    <Card 
      className="flex justify-between items-center
      p-4 bg-muted"
    >
        <div>
            {/* <AlertCircle className="h-4 w-4" /> */}
            <AlertTitle>{getFileName(songName)}</AlertTitle>
            <div className="text-sm text-muted-foreground">
                Duration: {new Date(songDuration * 1000).toISOString().substring(14, 19)}
            </div>
            <div className="text-sm text-muted-foreground">
                Size: {(songSize / 1_000_000).toFixed(2)} MB
            </div>
        </div>
    </Card>
  )
}
