import { MicIcon, MoveLeftIcon, MoveRightIcon, UploadCloudIcon } from "lucide-react";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { AlertCard } from "@/components/alert-card";
import { FileUploader } from "@/components/file-uploader";
import { getCurrentUnsubmittedCloneJob } from "@/lib/runpod";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

const getCloneJobId = async ({ userId }) => {
    let unsubmittedCloneJob = await getCurrentUnsubmittedCloneJob({ userId });
    if (!unsubmittedCloneJob) {
        unsubmittedCloneJob = await prismadb.cloneJob.create({
            data: { userId }
        });
    }

    return unsubmittedCloneJob.id;
}

const CloningStepPage = async () => {
    const { userId } = auth();

    if (!userId) return null;
    const jobId = await getCloneJobId({ userId });

    return (
        <div className="px-4 lg:px-8 flex justify-center">
            <div className="pt-8 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-center w-full mb-2">Step 3: Singing</div>
                <Card className="w-full lg:max-w-3xl bg-muted mb-4 p-4 text-xl
                flex flex-col gap-2
                ">
                <p>
                    Choose a song, any song, to sing along with.
                </p>
                <p>
                    <b>Wear headphones</b> as you sing along, to prevent
                    the audio from being picked up by your microphone. 
                    OR you may sing without a reference. 
                </p>
                <p>
                    Do not worry about sounding good.
                </p>
                <div>
                    <div>Criteria:</div>
                    <ul className="list-disc p-0 ml-6">
                        <li>
                            ideally at least ~<b>4</b> minutes, at most <b>7</b> minutes
                        </li>
                        <li>
                            cover the type of songs you are most interested in singing
                        </li>
                    </ul>
                </div>
                <p>Please record yourself singing and save it to <b>a single audio file.</b></p>
                <div>
                    If you cannot think of a song, <a target="_blank" href="https://youtube.com/playlist?list=PLeYTmRef46dWKVQeUXTDY1bsSHvxtSDmK&si=bvSXdQXasZOhuGy1" rel="noopener noreferrer">
                        <span className="text-primary cursor-pointer">click here for a list of suggestions.</span>
                    </a>
                </div>
                <div className="mt-4 bg-white p-4 rounded-md border border-black">
                    <div className="mb-2">Upload your recording for Step 3.</div>
                    <FileUploader uploadEndpoint="/api/clone/upload"
                        apiParams={{ cloneId: jobId, fileName: "3" }}
                        durationLimit={7}
                    />
                </div>
                </Card>
                <div className="w-full mt-4 flex items-center justify-between">
                    <Link href="/clone/step-2">
                        <Button 
                            className="text-md gap-2"
                            variant="outline"
                        >
                            <MoveLeftIcon />Go Back to Step 2
                        </Button>
                    </Link><Link href="/clone/finish">
                        <Button className="text-md gap-2">
                            Finish<UploadCloudIcon />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default CloningStepPage;