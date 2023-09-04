"use client";

import { useCloneModal, useProModal } from "@/hooks/use-modal";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Check, Code, ImageIcon, MessageSquare, Music, VideoIcon, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { IconContext } from "react-icons";
import { PiCoinVerticalFill } from "react-icons/pi";
import { packages } from "@/lib/packages";


export const CloneModal = () => {
    const cloneModal = useCloneModal();
    const [isLoading, setLoading] = useState(false);
    const [isMounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isMounted) return null;
    
    const onPurchase = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe", { params: { packKey: "clone", quantity: 1 } });

            window.location.href = response.data.url;
        } catch (error) {
            toast("Something went wrong.");
            console.log(error, "STRIPE_CLIENT_ERROR");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={cloneModal.isOpen} onOpenChange={cloneModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle 
                        className="flex justify-center items-center
                        flex-col gap-y-4 pb-2"
                    >
                        <div className="text-2xl flex items-center gap-x-2 p-2">
                            Need a new voice clone?
                        </div>
                    </DialogTitle>
                    <DialogDescription
                        className="pt-2 space-y-2 text-zinc-900 font-medium"
                    >
                        <div className="p-4 flex items-start justify-between
                            border-2 border-primary rounded-md shadow-lg"
                        >
                            <div>
                                <div className="text-lg md:text-xl font-bold">Voice Clone Pack</div>
                                <div className="md:text-lg text-muted-foreground">Re-clone your voice (overwrites previous).</div>
                                <div className="md:text-lg">
                                    <b>1</b> Voice Clone
                                </div>
                            </div>
                            <Button className="w-fit mb-2 text-xl" onClick={onPurchase}>
                                $0.99
                            </Button>
                        </div>
                    </DialogDescription>    
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}