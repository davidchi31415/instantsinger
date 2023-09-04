import PricingTable from "@/components/pricing-table";

const PricingPage = async () => {
    return (
        <div className="py-20 md:py-28 px-12 bg-primary/50 w-full" >
            <div className="pt-8 pb-12 md:py-16 bg-[#FFF1E4] border-4 border-[#FFD7AF]/50 rounded-xl"
                id="pricing-table"
            >
                <PricingTable />
            </div>
        </div>
    )
}

export default PricingPage;