"use client";

import { useCloneModal, useProModal, useSettingsModal } from "@/hooks/use-modal";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Check, Code, ImageIcon, MessageSquare, Music, SettingsIcon, VideoIcon, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { IconContext } from "react-icons";
import { PiCoinVerticalFill } from "react-icons/pi";
import { packages } from "@/lib/packages";
import { useRouter } from "next/navigation";


export const SettingsModal = ({ userData }) => {
    const router = useRouter();
    const settingsModal = useSettingsModal();
    const [firstClick, setFirstClick] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isMounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isMounted) return null;
    
    const onDelete = async () => {
        try {
            setLoading(true);
            const res = await axios.post("/api/clone/delete", { cloneId: userData.clone.id });

            if (res.status === 200) {
                toast("Clone deleted successfully.");
            } else {
                console.log("Error")
                toast("Error deleting clone.");
            }
        } catch (error) {
            toast("Something went wrong.");
        } finally {
            settingsModal.onClose();
            setLoading(false);
            setFirstClick(false);
            router.refresh();
        }
    }

    return (
        <Dialog open={settingsModal.isOpen} onOpenChange={settingsModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle 
                        className="flex justify-center items-center
                        flex-col gap-y-4 pb-2"
                    >
                        <div className="text-2xl flex items-center gap-x-2 p-2">
                            Voice Clone Settings <SettingsIcon />
                        </div>
                    </DialogTitle>
                    <DialogDescription
                        className="pt-2 space-y-2 text-zinc-900 font-medium flex justify-center"
                    >
                        {!firstClick ?
                            <Button className="w-fit text-xl mx-auto" variant="destructive"
                                onClick={() => setFirstClick(true)}
                            >
                                Delete Clone
                            </Button>
                            :
                            <div className="flex flex-col items-center gap-6">
                                <div className="text-lg text-center">Are you sure you want to delete your voice clone? This is irreversible. Re-cloning will cost $0.99.</div>
                                <div className="flex justify-center gap-2">
                                    <Button className="w-fit text-xl mx-auto" variant="outline"
                                        onClick={() => setFirstClick(false)}
                                        disabled={isLoading}
                                    >
                                        Cancel
                                    </Button>
                                    <Button className="w-fit text-xl mx-auto" variant="destructive"
                                        onClick={onDelete}
                                        disabled={isLoading}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>}
                    </DialogDescription>    
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}