import ConversionDashboard from "@/components/conversion-dashboard";
import { ConversionResultsComponent } from "@/components/conversion-results";
import { Empty } from "@/components/empty";
import { ProgressCard } from "@/components/progress-card";
import { getClones, getConversion, getConversionResults, getMostRecentConvertJob } from "@/lib/runpod";
import { isJobDone } from "@/lib/utils";
import { auth } from "@clerk/nextjs";

interface ResultData {
    urls?: string[];
    songName?: string;
}

const getResult = async ({ conversionId }: { conversionId: string }) => {
    const { userId } = auth();
    if (userId === null) return { urls: [], names: [] };

    const conversion = await getConversion({ userId, conversionId });

    let res;
    if (conversion) {
        res = await getConversionResults({ convertJob: conversion });
    }

    return res;
}

const ConversionResultPage = async ({
    searchParams,
}: {
    searchParams?: { [key: string]: string | undefined };
}) => {
    let conversionId = searchParams?.conversionId;
    let result;

    if (conversionId) result = await getResult({ conversionId });
    else {
        return (
            <div className="px-4 lg:px-8">
                <Empty label="No conversion found :("/> 
            </div>
        )
    }

    if (result && !result.urls?.length) {
        return (
            <div className="px-4 lg:px-8">
                <ProgressCard
                    process="Converting" initStatus={result.status}
                    apiEndpoint="/api/convert/status" apiParams={{ id: conversionId }}
                />
            </div>
        )
    } else if (result) {
        return (
            <div className="px-4 lg:px-8">
                <ConversionResultsComponent resultURLs={result.urls} fileNames={result.fileNames} songName={result.name} />
            </div>
        )
    } else return (
        <div className="px-4 lg:px-8">
            <Empty label="No conversion found :("/> 
        </div>
    )
}

export default ConversionResultPage;