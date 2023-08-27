import { AudioCard } from "@/components/audio-card";
import { ConversionResultsComponent } from "@/components/conversion-results";
import { Empty } from "@/components/empty";
import { Button } from "@/components/ui/button";
import { getCloneResults, getConversion, getConversionResults } from "@/lib/runpod";
import { downloadFromURL, getFileName } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { DownloadIcon } from "lucide-react";


const getResults = async ({ cloneId }: { cloneId: string }) => {
    const { userId } = auth();
    if (userId === null) return;

    const res = await getCloneResults({ cloneId });
    return res;
}

const CloneResultsPage = async ({
    searchParams,
}: {
    searchParams?: { [key: string]: string | undefined };
}) => {
    let cloneId = searchParams?.id;
    if (!cloneId) return (
        <div className="px-4 lg:px-8">
            <Empty label="Clone ID required." />
        </div>
    )

    const results = await getResults({ cloneId });

    if (!results) {
        return (
            <div className="px-4 lg:px-8">
                <Empty label="Either the clone does not exist, or results are not ready. :("/> 
            </div>
        )
    } else {
        return (
            <div className="px-4 lg:px-8">
                <div className="mb-2 text-xl">Results for </div>
                {results?.urls?.length ? 
                    <div className="border border-black/10 rounded-md p-4">
                        {results?.urls?.map((url, i) => {
                            return (
                                <div className="mt-4">
                                    <div className="flex items-center justify-between">
                                        <div className="font-medium mb-2">
                                            Sample {i+1}
                                        </div>
                                        <Button variant="ghost" size="icon" 
                                            onClick={() => downloadFromURL(url, `sample_${i+1}.wav`)}
                                        >
                                            <DownloadIcon />
                                        </Button>
                                    </div>
                                    <div>
                                        <AudioCard url={url} />
                                    </div>
                                </div>  
                            )
                        })}
                    </div>
                    : ""}
            </div>
        )
    }
}

export default CloneResultsPage;