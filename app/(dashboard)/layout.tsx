const DashboardLayout = async ({children}: {children: React.ReactNode}) => {
    return (
        <div className="h-full pt-8 md:pt-24">
            {children}
        </div>
    )
}

export default DashboardLayout;