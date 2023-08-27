import { CloneResultsComponent } from "@/components/clone-results";
import { Empty } from "@/components/empty";
import { getClone, getCloneJob, getCloneResults } from "@/lib/runpod";
import { auth } from "@clerk/nextjs";


const getResults = async ({ cloneJob }) => {
    const { userId } = auth();
    if (userId === null) return;

    const res = await getCloneResults({ cloneJob });
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

    const cloneJob = await getCloneJob({ cloneJobId: cloneId });
    if (!cloneJob) {
        return (
            <div className="px-4 lg:px-8">
                <Empty label="Could not find clone. :("/> 
            </div>
        )
    }

    const results = await getResults({ cloneJob });
    if (!results) {
        return (
            <div className="px-4 lg:px-8">
                <Empty label="Cloning results are not ready. :("/> 
            </div>
        )
    } else {
        return (
            <div className="px-4 lg:px-8">
                <CloneResultsComponent results={results} cloneJob={cloneJob} />
            </div>
        )
    }
}

export default CloneResultsPage;