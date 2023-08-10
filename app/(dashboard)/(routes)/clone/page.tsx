import { AlertCard } from "@/components/alert-card";
import { Button } from "@/components/ui/button";
import { getClones, getMostRecentCloneJob } from "@/lib/runpod";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClonesDashboard } from "@/components/clones-dashboard";
import { isJobDone } from "@/lib/utils";

interface CloneData {
    clones: any[];
    currentJob: any;
}

const getUserData = async () => {
    const { userId } = auth();
    if (userId === null) return { clones: [], currentJob: null };

    const clones = await getClones({ userId });
    const res: CloneData = { clones, currentJob: null };

    const currentJob = await getMostRecentCloneJob({ userId });
    if (currentJob && !isJobDone({ status: currentJob.status })) {
        res.currentJob = currentJob;
    }

    return res;
}

const CloneHomePage = async () => {
    const userData = await getUserData();
    let defaultTab = "create";
    if (userData.clones.length || userData.currentJob !== null) {
       defaultTab = "my-clones"; 
    }

    return (
        <div>
            <Tabs defaultValue={defaultTab} className="flex flex-col items-center gap-8">
                <TabsList className="p-6 gap-2">
                    <TabsTrigger value="my-clones" className="text-xl">My Clones</TabsTrigger>
                    <TabsTrigger value="create" className="text-xl">Create a Clone</TabsTrigger>
                </TabsList>

                <TabsContent value="my-clones">
                    <ClonesDashboard userData={userData} />
                </TabsContent>

                <TabsContent value="create">
                    <div className="text-5xl font-bold text-center">Choose a Method</div>
                    <div className="mt-8 grid md:grid-cols-3 gap-2 md:gap-0">
                        <div className="flex flex-col gap-2 items-center justify-center">
                            <Link href="/clone/begin">
                                <Button className="text-xl p-4" size="lg">
                                    Guided
                                </Button>
                            </Link>
                            <div className="text-md text-muted-foreground text-center font-bold">Recommended!</div>
                        </div>
                        <div className="text-center">or</div>
                        <div className="flex flex-col gap-2 items-center justify-center">
                            <Link href="/clone/byod">
                                <Button className="text-xl p-4" size="lg">
                                    Manual
                                </Button>
                            </Link>
                            <div className="text-md text-muted-foreground text-center">Bring Your Own Data</div>
                        </div>
                    </div>
                    <div className="w-full lg:max-w-xl mt-8">
                        <AlertCard title="Note" variant="default" size="lg" 
                            message="We recommend the Guided voice cloning process. If you already have a set of high-quality
                            recordings that sufficiently covers your vocal range, you may proceed with the Manual process instead." 
                        />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default CloneHomePage;