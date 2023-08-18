const LandingLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <main className="h-full w-full bg-[white] overflow-auto">
            {children}
        </main>
    )
}

export default LandingLayout;