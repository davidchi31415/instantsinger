import Image from "next/image"

interface EmptyProps {
    label: any
}

export const Empty = ({label} : EmptyProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
        <div className="relative h-60 w-60">
            <Image 
                alt="Empty"
                fill
                src="/empty.png"
            />
        </div>
        <p className="text-muted-foreground text-md text-center">
            {label}
        </p>
    </div>
  )
}