"use client";
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from "nprogress";

export const NavigationProgress = () => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    
    useEffect(() => {
        NProgress.start();
        NProgress.done();
    }, [pathname, searchParams])
    
    return null;
}