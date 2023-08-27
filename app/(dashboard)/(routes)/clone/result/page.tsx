import { CloneResultsComponent } from "@/components/clone-results";
import { Empty } from "@/components/empty";
import { getClone, getCloneResults } from "@/lib/runpod";
import { auth } from "@clerk/nextjs";


const getResults = async ({ clone }) => {
    const { userId } = auth();
    if (userId === null) return;

    const res = await getCloneResults({ clone });
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

    const clone = await getClone({ cloneId });
    if (!clone) {
        return (
            <div className="px-4 lg:px-8">
                <Empty label="Either the clone does not exist, or results are not ready. :("/> 
            </div>
        )
    }

    const results = await getResults({ clone });
    if (!results) {
        return (
            <div className="px-4 lg:px-8">
                <Empty label="Either the clone does not exist, or results are not ready. :("/> 
            </div>
        )
    } else {
        return (
            <div className="px-4 lg:px-8">
                <CloneResultsComponent results={results} clone={clone} />
            </div>
        )
    }
}

export default CloneResultsPage;