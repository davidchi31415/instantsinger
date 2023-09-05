const DashboardLayout = async ({children}: {children: React.ReactNode}) => {
    return (
        <div className="h-full pt-8 md:pt-32">
            {children}
        </div>
    )
}

export default DashboardLayout;