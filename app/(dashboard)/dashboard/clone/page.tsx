import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MoveRightIcon } from "lucide-react"
import Link from "next/link"

const ClonePage = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-2xl font-bold text-center w-full mt-8 mb-2">Guided Voice Cloning Process</div>
            <Card className="w-full lg:max-w-3xl mb-4 p-4 text-xl flex flex-col gap-2">
                <p>
                    Before we can begin,
                </p>
                <p>
                    1) Find a <b>quiet</b> environment, with no background noise.
                </p>
                <p>
                    2) Have your phone (or microphone) ready. Keep it <b>close to your face</b> to <b>prevent echo</b> from your surroundings.
                </p>
                <p>Record yourself using an <b>external app</b> and upload your files when instructed.</p>
                <p>
                    Try to record only your voice, with as few other noises as possible.
                </p>
            </Card>
            <div className="w-full mt-2 flex items-center justify-center">
                <Link href="/dashboard/clone/step-1-preview">
                    <Button className="text-xl gap-2 p-4 border-2 border-black hover:scale-105">
                        Begin<MoveRightIcon />
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default ClonePage;