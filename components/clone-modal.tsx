"use client";

import { useCloneModal } from "@/hooks/use-modal";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";


export const CloneModal = () => {
    const cloneModal = useCloneModal();
    const [isMounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <Dialog open={cloneModal.isOpen} onOpenChange={cloneModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle 
                        className="flex justify-center items-center
                        flex-col gap-y-4 pb-2"
                    >
                        <div className="text-2xl flex items-center gap-x-2 p-2">
                            Cloning your voice again?
                        </div>
                    </DialogTitle>
                    <DialogDescription
                        className="pt-2 space-y-2 text-zinc-900 font-medium"
                    >
                        <div className="p-4 flex flex-col gap-2
                            border-2 border-primary rounded-md shadow-lg"
                        >
                            <p>We allow all our users to clone their voices a second time for free,
                            but to prevent spam/misuse of our services, we ask that you first request
                            for a re-clone if you wish to do it a third time.</p>
                            <p>Please contact support@instantsinger.com or join our Discord.</p>
                            <Button className="max-w-[5rem] mx-auto" onClick={cloneModal.onClose}>Got It</Button>
                        </div>
                    </DialogDescription>    
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}