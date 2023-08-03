import { AlertCircle, FileWarning, Terminal } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

export function AlertCard({ variant, title, message }) {
  return (
    <Alert variant={variant} className="border border-black/50">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  )
}
