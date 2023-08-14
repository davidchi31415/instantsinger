import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getAPILimitCount } from "@/lib/api-limit";

const DashboardLayout = async ({children}: {children: React.ReactNode}) => {
    const convertCreditCount = await getAPILimitCount();
    const cloneCreditCount = await getAPILimitCount();

    return (
        <div className="h-full relative">
            <div 
                className="hidden h-full md:flex md:w-72
                md:flex-col md:fixed md:inset-y-0
                border-r-4 border-primary bg-primary/25"
            >
                <Sidebar />
            </div>
            <main className="md:pl-72 pb-8">
                <Navbar cloneCreditCount={cloneCreditCount} convertCreditCount={convertCreditCount} />
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout;