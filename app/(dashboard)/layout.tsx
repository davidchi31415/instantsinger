import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getAPILimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const DashboardLayout = async ({children}: {children: React.ReactNode}) => {
    const apiLimitCount = await getAPILimitCount();
    const isPro = await checkSubscription();

    return (
        <div className="h-full relative">
            <div 
                className="hidden h-full md:flex md:w-72
                md:flex-col md:fixed md:inset-y-0
                border-r-2 border-primary bg-primary/25"
            >
                <Sidebar />
            </div>
            <main className="md:pl-72 pb-8">
                <Navbar apiLimitCount={apiLimitCount} isPro={isPro} />
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout;