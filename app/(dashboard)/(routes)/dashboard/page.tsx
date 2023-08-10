"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowLeftRightIcon, ArrowRight, Code, HistoryIcon, ImageIcon, MessageSquare, Music, SettingsIcon, VideoIcon } from "lucide-react";
import { BsDiscord } from "react-icons/bs";

export default function DashboardPage() {
  const router = useRouter();

  const tools = [
    {
      label: "Convert",
      icon: ArrowLeftRightIcon,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
      href: "/convert",
      message: "Convert any song into your own voice."
    },
    {
      label: "Clone",
      icon: MessageSquare,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      href: "/clone",
      message: "Clone your voice. Then use it to convert songs into your voice."
    },
    {
      label: "History",
      icon: HistoryIcon,
      href: "/history",
      message: "See (and hear) all your past conversions."
    },
    {
      label: "Settings",
      icon: SettingsIcon,
      href: "/settings",
      message: "Manage your account and subscription settings."
    },
    {
      label: "Discord",
      icon: BsDiscord,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      url: "https://discord.gg/Z7RvN6JWky",
      message: "Need help or support? Join the Discord!"
    }
  ];

  return (
    <div className="mb-8 space-y-4">
      <h2 className="text-2xl md:text-4xl font-bold text-center">
        Welcome to Instant Singer
      </h2>
      <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
        Unleash your beautiful voice with AI :)
      </p>
      <div className="px-4 md:px-20 lg:px-32 grid md:grid-cols-2 gap-4">
        {tools.map((tool) => {
          return (
            <Card
              onClick={() => {
                if (tool.href) {
                  router.push(tool.href);
                } else if (tool.url) {
                  window.open(tool.url);
                }
              }}
              key={tool.href ? tool.href : tool.url} 
              className="p-4 border-black/0.5 hover:shadow-md
              transition cursor-pointer"
            >
              <div className="h-[7rem]">
                <div className="flex items-center justify-between gap-x-4">
                  <div className="flex items-center gap-2">
                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                      <tool.icon className={cn("w-8 h-8", tool.color)} />
                    </div>
                    <div className="font-semibold">
                      {tool.label}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5" />
                </div>
                <div className="px-2 my-4 text-muted-foreground">
                  {tool.message}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
