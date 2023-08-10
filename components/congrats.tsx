import Image from "next/image"

interface CongratsProps {
    label: any
}

export const Congrats = ({label} : CongratsProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
        <div className="relative h-60 w-60">
            <Image 
                alt="Congrats"
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