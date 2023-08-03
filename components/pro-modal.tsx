"use client";

import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Check, Code, ImageIcon, MessageSquare, Music, VideoIcon, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

const tools = [
    {
      label: "Conversation",
      icon: MessageSquare,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10"
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        color: "text-pink-500",
        bgColor: "bg-pink-500/10"
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10"
    },
    {
        label: "Music Generation",
        icon: Music,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10"
    },
    {
        label: "Code Generation",
        icon: Code,
        color: "text-green-500",
        bgColor: "bg-green-500/10"
    }
  ];

export const ProModal = () => {
    const proModal = useProModal();
    const [isLoading, setLoading] = useState(false);
    
    const onSubscribe = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url;
        } catch (error) {
            toast("Something went wrong.");
            console.log(error, "STRIPE_CLIENT_ERROR");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle 
                        className="flex justify-center items-center
                        flex-col gap-y-4 pb-2"
                    >
                        <div className="flex items-center gap-x-2 font-bold py-1">
                            Upgrade to Sainatra
                            <Badge className="uppercase text-sm text-white py-1" variant="premium">
                                pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription
                        className="text-center pt-2 space-y-2 text-zinc-900 font-medium"
                    >
                        {tools.map((tool) => {
                            return (
                                <Card
                                    key={tool.label}
                                    className="p-3 border-black/5 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-x-4">
                                        <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                            <tool.icon className={cn("w-6 h-6", tool.color)} />
                                        </div>
                                        <div className="font-semibold text-sm">
                                            {tool.label}
                                        </div>
                                    </div>
                                    <Check className="text-primary w-5 h-5" />
                                </Card>
                            )
                        })}
                    </DialogDescription>    
                </DialogHeader>
                <DialogFooter>
                    <Button disabled={isLoading} onClick={onSubscribe}>
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}