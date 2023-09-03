import { Footer } from "@/components/footer";

const LandingLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <>
            <div className="overflow-auto h-full">{children}</div>
            <Footer />
        </>
    )
}

export default LandingLayout;