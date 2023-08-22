"use client";

import { useProModal } from "@/hooks/use-pro-modal";
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


export const ProModal = () => {
    const proModal = useProModal();
    const [isLoading, setLoading] = useState(false);

    const [isMounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isMounted) return null;
    
    const onPurchase = async ({ packKey }) => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe", { params: { packKey } });

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
                        <div className="text-2xl flex items-center gap-x-2 p-2">
                            Need more 
                            <IconContext.Provider
                                value={{ size: "25px", color: "#E1B530" }}
                            >
                                    <PiCoinVerticalFill />
                            </IconContext.Provider>?
                        </div>
                    </DialogTitle>
                    <DialogDescription
                        className="pt-2 space-y-2 text-zinc-900 font-medium"
                    >
                        {packages.map((pack, i) => {
                            return (
                                <div className="p-4 flex items-start justify-between cursor-pointer
                                    border-2 border-primary rounded-md shadow-lg hover:scale-105 transition"
                                    onClick={() => onPurchase({ packKey: pack.packKey })}
                                    key={`pack-${pack.packKey}`}
                                >
                                    <div>
                                        <div className="text-lg md:text-xl font-bold">{pack.contents.label}</div>
                                        <div className="md:text-lg text-muted-foreground">{pack.contents.description}</div>
                                        <div className="md:text-lg">
                                            <b>{pack.contents.songs}</b> Song Conversion{pack.contents.songs > 1 ? "s" : ""},{" "}
                                            <b>{pack.contents.clones}</b> Voice Clone
                                            {pack.contents.clones > 1 ? "s" : ""}
                                        </div>
                                    </div>
                                    <Button className="md:text-lg">
                                        ${pack.contents.price}
                                    </Button>
                                </div>
                            )
                        })}
                    </DialogDescription>    
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}