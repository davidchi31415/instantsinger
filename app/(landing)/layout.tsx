import { Footer } from "@/components/footer";

const LandingLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="bg-white">
            {children}
            <Footer />
        </div>
    )
}

export default LandingLayout;