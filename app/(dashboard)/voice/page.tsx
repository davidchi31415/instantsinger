import { CloneResultsComponent } from "@/components/clone-results";
import { ConversionResultsComponent } from "@/components/conversion-results";
import { Empty } from "@/components/empty";
import prismadb from "@/lib/prismadb";
import { _getConversionPublic, getCloneResults, getConversionResults } from "@/lib/runpod";
import { auth } from "@clerk/nextjs";


const getResults = async ({ cloneId }: { cloneId: string }) => {
    const { userId } = auth();
    // if (userId === null) return;

    let clone = await prismadb.clone.findUnique({ where: { id: cloneId }});
    if (!clone) return;

    const cloneResults = await getCloneResults({ clone });
    if (!cloneResults) return;

    const owner = clone.userId === userId;
    const permitted = true; // conversion.public || owner;
    if (!permitted) return;

    cloneResults["owner"] = owner;
    cloneResults["id"] = cloneId;
    return cloneResults;
}

const VoiceResultPage = async ({
    searchParams,
}: {
    searchParams?: { [key: string]: string | undefined };
}) => {
    let cloneId = searchParams?.id;
    if (!cloneId) return (
        <div className="px-4 lg:px-8">
            <Empty label="Voice ID required." />
        </div>
    )

    const results = await getResults({ cloneId });

    if (!results) {
        return (
            <div className="px-4 lg:px-8">
                <Empty label="Either the voice does not exist, or the results are not ready. :("/> 
            </div>
        )
    } else {
        return (
            <div className="px-4 lg:px-8">
                <CloneResultsComponent results={results} />
            </div>
        )
    }
}

export default VoiceResultPage;