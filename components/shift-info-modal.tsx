"use client";

import { useShiftInfoModal } from "@/hooks/use-modal";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";


export const PitchShiftModal = () => {
    const modal = useShiftInfoModal();
    const [isMounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
            <DialogContent className="max-w-[300px] md:max-w-md rounded-xl shadow-xl">
                <DialogHeader className="overflow-x-clip h-[270px]">
                    <DialogTitle 
                        className="flex justify-center items-center
                        flex-col gap-y-4 pb-2"
                    >
                        <div className="text-2xl flex items-center gap-x-2 p-2">
                            Pitch Shift
                        </div>
                    </DialogTitle>
                    <DialogDescription
                        className="pt-2 text-zinc-900 font-medium flex flex-col gap-2 text-lg"
                    >
                        <p>This setting shifts the vocals of the song to better match your vocal range.</p>
                        <p><span className="font-medium text-primary">Auto</span> = shift only if needed.</p>
                        <p><span className="font-medium text-primary">Manual</span> = force it to shift.</p>
                        <p><span className="font-medium text-primary">Off</span> = do not shift the song.</p>
                    </DialogDescription>    
                </DialogHeader>
                <DialogFooter>
                    <Button className="w-fit p-4 text-xl mx-auto font-normal" onClick={() => modal.onClose()}>
                        Got It
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}