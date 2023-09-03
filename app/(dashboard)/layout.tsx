import { LandingNavbar } from "@/components/landing-navbar";
import Sidebar from "@/components/sidebar";

const DashboardLayout = async ({children}: {children: React.ReactNode}) => {
    return (
        <div className="h-full relative">
            <LandingNavbar />
            <div 
                className="hidden h-full md:flex md:w-72
                md:flex-col md:fixed md:inset-y-0
                border-r-4 border-primary"
            >
                <Sidebar />
            </div>
            <main className="md:pl-72 pb-8">
                <div className="pt-32">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default DashboardLayout;