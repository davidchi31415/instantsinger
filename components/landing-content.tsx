import { Roboto_Slab } from "next/font/google";
import { MobileLandingContentClone, MobileLandingContentConvert, MobileLandingContentPricing } from "./landing/content/mobile";
import PricingTable from "./pricing-table";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";

const font = Roboto_Slab({
    weight: "400",
    subsets: ["latin"]
});

export const LandingContent = () => {
    return (
        <div className="bg-primary/5 px-4 md:px-8 py-16">
            <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 md:gap-16 pb-8 md:pb-36">
                <MobileLandingContentClone />
                <MobileLandingContentConvert />
                <MobileLandingContentPricing />
            </div>
            <div className={cn("mt-20 mb-6 md:mt-0 md:mb-10 text-center text-3xl w-fit mx-auto", font.className)}>
                And if you want more, we have you covered :)
            </div>
            <PricingTable paidOnly={true} />
            <div className="mt-20 mb-10 w-fit mx-auto py-8 flex flex-col items-center">
                <div className={cn("mb-6 text-center text-3xl", font.className)}>Invite your friends and get rewarded!</div>
                <Link href="https://instant-singer.getrewardful.com/signup">
                    <Button variant="default" className="text-xl md:text-3xl p-8 w-full rounded-sm font-normal border-2 border-black/100 hover:scale-105 transition shadow-xl">Become an Affiliate</Button>
                </Link>
            </div>
        </div>
    )
}