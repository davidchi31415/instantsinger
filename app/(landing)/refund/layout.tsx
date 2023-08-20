import { LandingFooter } from "@/components/landing-footer"
import { LandingNavbar } from "@/components/landing-navbar"

const RefundLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <>
            <LandingNavbar />
                <main className="px-4 lg:px-8 h-full w-full bg-[white] overflow-auto">
                    {children}
                </main>
            <LandingFooter />
        </>
    )
}

export default RefundLayout;