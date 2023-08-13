const LandingLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <main className="h-full w-full bg-[#f6f6f6] overflow-auto">
            <div className="mx-auto max-w-screen-xl h-full w-full">
                {children}
            </div>
        </main>
    )
}

export default LandingLayout;