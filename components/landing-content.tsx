import { MobileLandingContentClone, MobileLandingContentConvert, MobileLandingContentPricing } from "./landing/content/mobile";
import PricingTable from "./pricing-table";

export const LandingContent = () => {
    return (
        <div className="bg-primary/5 px-4 md:px-8 py-16">
            <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 md:gap-16 pb-8 md:pb-36">
                <MobileLandingContentClone />
                <MobileLandingContentConvert />
                <MobileLandingContentPricing />
            </div>
            <div className="mt-20 mb-6 md:mt-0 md:mb-20 text-center text-3xl w-fit mx-auto">
                And if you want more, we have you covered :)
            </div>
            <PricingTable paidOnly={true} />
        </div>
    )
}