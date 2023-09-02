"use client";

import { useMicModal } from "@/hooks/use-modal";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { useEffect, useState } from "react";
import { MicIcon } from "lucide-react";


export const MicModal = () => {
    const modal = useMicModal();

    const [isMounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle 
                        className="flex justify-center items-center
                        flex-col gap-y-4 pb-2"
                    >
                        <div className="text-2xl flex items-center gap-x-2 p-2">
                            Microphone Required <MicIcon color="red" />
                        </div>
                    </DialogTitle>
                    <DialogDescription
                        className="pt-2 space-y-2 text-zinc-900 font-normal text-lg text-center"
                    >
                        <p>In order to record your voice, we require a microphone.</p>
                        <p>Please enable microphone access before continuing.</p>
                    </DialogDescription>    
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}