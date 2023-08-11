import { ConversionResultsComponent } from "@/components/conversion-results";
import { Empty } from "@/components/empty";
import { getConversion, getConversionResults } from "@/lib/runpod";
import { auth } from "@clerk/nextjs";


const getResults = async ({ conversionId }: { conversionId: string }) => {
    const { userId } = auth();
    if (userId === null) return;

    const conversion = await getConversion({ userId, conversionId });
    if (!conversion) return;

    const res = await getConversionResults({ convertJob: conversion });
    return res;
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

    const results = await getResults({ conversionId });

    if (!results) {
        return (
            <div className="px-4 lg:px-8">
                <Empty label="Either the conversion does not exist, or results are not ready. :("/> 
            </div>
        )
    } else {
        return (
            <div className="px-4 lg:px-8">
                <ConversionResultsComponent results={results} />
            </div>
        )
    }
}

export default ConversionResultPage;