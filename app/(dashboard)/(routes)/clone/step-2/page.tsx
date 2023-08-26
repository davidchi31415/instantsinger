import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUploader } from "@/components/file-uploader";
import { auth } from "@clerk/nextjs";
import { getCurrentUnsubmittedCloneJob } from "@/lib/runpod";
import prismadb from "@/lib/prismadb";
import Iframe from 'react-iframe';

const getCloneJobId = async ({ userId }) => {
    let unsubmittedCloneJob = await getCurrentUnsubmittedCloneJob({ userId });
    if (!unsubmittedCloneJob) {
        unsubmittedCloneJob = await prismadb.cloneJob.create({
            data: { userId }
        });
    }

    return unsubmittedCloneJob.id;
}

const CloningStep2Page = async () => {
    const { userId } = auth();

    if (!userId) return null;
    const jobId = await getCloneJobId({ userId });
    
    return (
        <div className="px-4 lg:px-8 flex justify-center">
            <div className="pt-8 flex flex-col items-center justify-center">
                <div className="pt-2 flex flex-col items-center justify-center gap-2">
                    <div className="text-2xl font-bold text-center w-full mb-2">Step 2: Pitches</div>
                    <Card className="w-full lg:max-w-3xl bg-muted mb-4 text-xl">
                        <CardHeader>
                            <CardTitle className="text-md text-muted-foreground">
                                Sing along with the following video. Try your best to match each pitch.
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center gap-4">
                            <Iframe url="https://www.youtube.com/embed/_tVSazDrYuA"
                                width="640px"
                                height="320px"
                                id=""
                                className=""
                                display="block"
                                position="relative"
                            />
                            <div className="bg-white p-4 rounded-md border border-black">
                                <div className="mb-2">Upload your recording for Step 2.</div>
                                <FileUploader uploadEndpoint="/api/clone/upload"
                                    apiParams={{ cloneId: jobId, fileName: "2" }}
                                    durationLimit={3}
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <div className="w-full flex items-center justify-between">
                        <Link href="/clone/step-2-preview">
                            <Button 
                                className="text-md gap-2"
                                variant="outline"
                            >
                                <MoveLeftIcon />Step 2 Preview
                            </Button>
                        </Link>
                        <Link href="/clone/step-3-preview">
                            <Button className="text-md gap-2">
                                Step 3 <MoveRightIcon />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CloningStep2Page;