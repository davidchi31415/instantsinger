import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getCredits } from "@/lib/credits";

const DashboardLayout = async ({children}: {children: React.ReactNode}) => {
    const {convertCredits, cloneCredits} = await getCredits();

    return (
        <div className="h-full relative">
            <div 
                className="hidden h-full md:flex md:w-72
                md:flex-col md:fixed md:inset-y-0
                border-r-4 border-primary bg-primary/25"
            >
                <Sidebar cloneCredits={cloneCredits} convertCredits={convertCredits} />
            </div>
            <main className="md:pl-72 pb-8">
                <Navbar cloneCredits={cloneCredits} convertCredits={convertCredits} />
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout;