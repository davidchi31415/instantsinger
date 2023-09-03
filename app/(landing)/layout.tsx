import { Footer } from "@/components/footer";

const LandingLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="mt-4 md:pt-28">
            <div className="overflow-auto h-full">{children}</div>
            <Footer />
        </div>
    )
}

export default LandingLayout;