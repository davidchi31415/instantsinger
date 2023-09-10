"use client";

import { useProModal } from "@/hooks/use-modal";
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
    const [quantities, setQuantities] = useState(packages.map(pack => 1));
    const [isMounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isMounted) return null;
    
    const onPurchase = async ({ packKey, quantity }) => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe", { params: { packKey, quantity } });

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
                                <div className="p-4 flex flex-col gap-2
                                    border-2 border-primary rounded-md shadow-lg"
                                    key={`pack-${pack.packKey}`}
                                >
                                    <div className="flex justify-between items-center gap-6">
                                        <div className="text-lg md:text-xl font-bold">
                                            {pack.contents.label.split(" ")[0]}
                                        </div>
                                        <div className="md:text-xl">${pack.contents.pricePerSong}/song</div>
                                        <Button className="w-fit border-2 border-black hover:scale-105 md:text-xl" onClick={() => onPurchase({ packKey: pack.packKey, quantity: quantities[i] })}>
                                            Buy
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <Button disabled={quantities[i] <= 1} onClick={() => setQuantities(e => { let h = [...e]; h[i] -= 1; return h; })}>-</Button>
                                        <div className="text-center text-xl w-[6rem] text-wrap">
                                            {quantities[i] * pack.contents.songs} songs
                                        </div>
                                        <Button onClick={() => setQuantities(e => { let h = [...e]; h[i] += 1; return h; })}>+</Button>
                                    </div>
                                </div>
                            )
                        })}
                    </DialogDescription>    
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}