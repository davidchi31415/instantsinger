"use client";

import { useErrorModal } from "@/hooks/use-modal";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { useEffect, useState } from "react";

export const ErrorModal = ({ message }) => {
    const modal = useErrorModal();

    const [isMounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle 
                        className="flex justify-center items-center
                        flex-col gap-y-4"
                    >
                        <div className="text-2xl flex items-center gap-x-2 p-2">
                            Conversion History
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}