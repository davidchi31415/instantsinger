import { ConversionResultsComponent } from "@/components/conversion-results";
import { Empty } from "@/components/empty";
import { ProgressCard } from "@/components/progress-card";
import { getConversion, getConversionResults } from "@/lib/runpod";
import { auth } from "@clerk/nextjs";


const getResult = async ({ conversionId }: { conversionId: string }) => {
    const { userId } = auth();
    if (userId === null) return { urls: [], names: [], error: "No user ID provided" };

    const conversion = await getConversion({ userId, conversionId });

    let res;
    if (conversion) {
        res = await getConversionResults({ convertJob: conversion });
    }

    return { urls: [], names: [], error: "Internal error retrieving results"};
}

const ConversionResultPage = async ({
    searchParams,
}: {
    searchParams?: { [key: string]: string | undefined };
}) => {
    let conversionId = searchParams?.conversionId;
    if (!conversionId) return (
        <div className="px-4 lg:px-8">
            <Empty label="Conversion ID required." />
        </div>
    )

    const result = await getResult({ conversionId });

    if (!result) {
        return (
            <div className="px-4 lg:px-8">
                <Empty label="No conversion found :("/> 
            </div>
        )
    } else if (result && !result.urls?.length) {
        return (
            <div className="px-4 lg:px-8">
                <ProgressCard
                    process="Converting" initStatus={result.status}
                    apiEndpoint="/api/convert/status" apiId={conversionId}
                />
            </div>
        )
    } else {
        return (
            <div className="px-4 lg:px-8">
                <ConversionResultsComponent resultURLs={result.urls} fileNames={result.fileNames} songName={result.name} />
            </div>
        )
    }
}

export default ConversionResultPage;