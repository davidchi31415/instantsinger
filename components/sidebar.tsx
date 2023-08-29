"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { ArrowRightLeftIcon, Code, HistoryIcon, ImageIcon, LayoutDashboard, MessageSquare, Mic, MicIcon, Music, Settings, VideoIcon } from "lucide-react";
import { CloneCreditCounter } from "./clone-credit-counter";
import { ConvertCreditCounter } from "./convert-credit-counter";

const font = Montserrat({weight: "600", subsets: ["latin"]});

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-blue-500"
    },
    {
        label: "Clone",
        icon: MicIcon,
        href: "/clone",
        color: "text-pink-500"
    },
    {
        label: "Convert",
        icon: ArrowRightLeftIcon,
        href: "/convert",
        color: "text-orange-500"
    },
    {
        label: "History",
        icon: HistoryIcon,
        href: "/history"
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings"
    }
]

const Sidebar = ({cloneCredits, convertCredits}) => {
  const pathname = usePathname();
  
  return (
    <div className="space-y-4 py-4 flex flex-col h-full">
        <div className="px-4">
            <Link
                href="/"
                className="flex items-center"
            >
                <h1 className={cn("text-2xl font-bold", font.className)}>
                    <span className="text-primary">instant</span>singer
                </h1>
            </Link>
        </div>
        <div className="px-3 py-2 flex-1">
            <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                <div className="relative w-8 h-8 mr-4">
                    {/* <Image
                        fill
                        alt="logo"
                        src="/logo.png"
                    /> */}
                </div>
            </Link>
            <div className="space-y-1">
                {routes.map((route) => {
                    return (
                        <Link 
                            href={route.href} key={route.href} 
                            className={cn("text-md group flex p-3 w-full justify-start \
                            font-medium cursor-pointer text-black hover:bg-[#f0f0f0] \
                            rounded-md",
                            pathname === route.href ? 
                                "border-2 border-primary bg-[#f3f3f3]" : ""
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
        <div className="w-[12rem] mx-auto flex flex-col items-center pb-32 gap-2">
            <CloneCreditCounter cloneCredits={cloneCredits} />
            <ConvertCreditCounter convertCredits={convertCredits} />
        </div>
    </div>
  )
}

export default Sidebar;