const DashboardLayout = async ({children}: {children: React.ReactNode}) => {
    return (
        <div className="h-full pt-8 md:pt-16 bg-white">
            {children}
        </div>
    )
}

export default DashboardLayout;