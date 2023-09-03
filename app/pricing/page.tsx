import { LandingFooter } from "@/components/landing-footer";
import { LandingNavbar } from "@/components/landing-navbar";
import PricingTable from "@/components/pricing-table";

const PricingPage = async () => {
    return (
        <div className="h-full w-full relative">
            <LandingNavbar />
            <div className="py-20 md:py-28 px-12 bg-primary/50 w-full" >
                <div className="pt-8 pb-12 md:py-16 bg-[#FFF1E4] border-4 border-[#FFD7AF]/50 rounded-xl"
                    id="pricing-table"
                >   
                    <div className="w-[12rem] md:w-fit text-center mx-auto mb-8 text-xl md:text-3xl">
                        <b>FREE</b> voice clone, with any pack*
                    </div>
                    <PricingTable />
                    <div className="w-[12rem] md:w-fit text-center mx-auto mt-8 text-sm">*Valid for first purchase. Extra clones cost $0.99 each - but 1 clone is all you need anyway.</div>
                </div>
            </div>
            <LandingFooter />
        </div>
    )
}

export default PricingPage;