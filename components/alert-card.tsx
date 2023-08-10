import { AlertCircle, FileWarning, Terminal } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface AlertCardProps {
  variant?: "default" | "destructive" | "warning" | null;
  title: string;
  message: any;
  size?: string;
}

export function AlertCard({ variant, title, message, size }: AlertCardProps) {
  return (
    <Alert variant={variant}>
      {/* <AlertCircle className={cn(size === "lg" ? "h-5 w-5" : "h-4 w-4")} /> */}
      <AlertTitle className={cn(size === "lg" ? "md:text-2xl" : "")}>{title}</AlertTitle>
      <AlertDescription className={cn(size === "lg" ? "md:text-lg" : "")}>
        {message}
      </AlertDescription>
    </Alert>
  )
}
