"use client";

import { useFeedbackModal } from "@/hooks/use-modal";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export const FeedbackModal = ({ results }) => {
    const modal = useFeedbackModal();
    const [isMounted, setMounted] = useState(false);
    const [shiftValue, setShiftValue] = useState("up");
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
                                Bad Conversion?
                            </div>
                        </DialogTitle>
                        <DialogDescription
                            className="pt-2 text-zinc-900 font-normal flex flex-col gap-2 text-lg"
                        >
                            <p>
                                If this conversion does not sound like you, it's possible that the song was not shifted 
                                into your vocal range properly. You can redo it with a different setting.
                            </p>
                            <div className="text-md w-full flex justify-center items-center gap-2">
                            Shift{" "}
                            <div className="w-[5rem]">
                              <Select onValueChange={(val) => {}}
                                defaultValue="up"
                              >
                                <SelectTrigger>
                                  <SelectValue/>
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="up" className="cursor-pointer">up</SelectItem>
                                    <SelectItem value="down" className="cursor-pointer">down</SelectItem>
                                    <SelectItem value="off" className="cursor-pointer">off</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                            by an octave
                          </div>
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