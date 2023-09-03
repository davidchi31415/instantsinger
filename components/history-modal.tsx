"use client";

import { useHistoryModal, useProModal } from "@/hooks/use-modal";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Check, Code, HistoryIcon, ImageIcon, MessageSquare, Music, VideoIcon, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { IconContext } from "react-icons";
import { PiCoinVerticalFill } from "react-icons/pi";
import { packages } from "@/lib/packages";
import { HistoryTable } from "./history-table";


export const HistoryModal = ({ userData }) => {
    const historyModal = useHistoryModal();

    const [isMounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <Dialog open={historyModal.isOpen} onOpenChange={historyModal.onClose}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle 
                        className="flex justify-center items-center
                        flex-col gap-y-4"
                    >
                        <div className="text-2xl flex items-center gap-x-2 p-2">
                            Conversion History <HistoryIcon />
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <HistoryTable userData={userData} />
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}