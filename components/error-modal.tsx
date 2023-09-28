"use client";

import { useErrorModal } from "@/hooks/use-modal";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { useEffect, useState } from "react";
import { XCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import { AlertCard } from "./alert-card";

export const ErrorModal = ({ message }) => {
    const modal = useErrorModal();

    const [isMounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
            <DialogContent className="max-w-[300px] md:max-w-md rounded-xl shadow-xl">
                <DialogHeader>
                    <DialogTitle 
                        className="flex justify-center items-center
                        flex-col gap-y-4"
                    >
                        <div className="text-2xl flex items-center gap-x-2 p-2">
                            Conversion Error
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <div className="text-lg">
                        There was an error (on our end) while processing your last song conversion.
                    </div>
                    <div className="py-4 max-w-sm mx-auto">
                        <AlertCard variant="destructive" title="Details" message={message} /> 
                    </div>
                    <div className="text-lg">
                        We will look into this. You have been refunded your credit.
                    </div>
                </DialogDescription>
                <DialogFooter>
                    <Button className="w-fit p-4 text-xl mx-auto font-normal">
                        Got It
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}