"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { ArrowRightLeftIcon, Code, HistoryIcon, ImageIcon, LayoutDashboard, MessageSquare, Mic, MicIcon, Music, Settings, VideoIcon } from "lucide-react";
import { CloneCreditCounter } from "./clone-credit-counter";
import { ConvertCreditCounter } from "./convert-credit-counter";
import { Button } from "./ui/button";
import { useState } from "react";

const font = Montserrat({weight: "600", subsets: ["latin"]});

const routes = [
    {
        label: "Clone",
        icon: MicIcon,
        key: "clone",
        color: "text-pink-500"
    },
    {
        label: "Convert",
        icon: ArrowRightLeftIcon,
        key: "convert",
        color: "text-orange-500"
    },
    {
        label: "History",
        icon: HistoryIcon,
        key: "history",
    },
    {
        label: "Settings",
        icon: Settings,
        key: "settings",
    }
]

const Sidebar = ({ initTab }) => {

    const [tab, setTab] = useState(initTab);
  
  return (
    <div className="space-y-4 py-4 flex flex-col h-full">
        <div className="px-3 py-2 flex-1">
            <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                <div className="relative w-8 h-24 mr-4">
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
                        <Button
                            variant="ghost"
                            key={route.key} 
                            className={cn("text-md group flex p-3 w-full justify-start \
                            font-medium cursor-pointer text-black hover:bg-[#f0f0f0] \
                            rounded-md",
                            initTab === route.key ? 
                                "border-2 border-primary bg-[#f3f3f3]" : ""
                            )}
                            onClick={() => setTab}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Button>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default Sidebar;