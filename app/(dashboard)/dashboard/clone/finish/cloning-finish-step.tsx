"use client";

import { FileUploader } from "@/components/file-uploader";
import { Heading } from "@/components/heading";
import { AlertCircleIcon, CheckIcon, CornerDownLeft, CornerDownLeftIcon, MicIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { AlertCard } from "@/components/alert-card";
import { Congrats } from "@/components/congrats";
import { toast } from "react-hot-toast";
import { useCloneModal, useProModal } from "@/hooks/use-modal";
import { Badge } from "@/components/ui/badge";
import { IconContext } from "react-icons";
import { PiCoinVerticalFill } from "react-icons/pi";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CloneModal } from "@/components/clone-modal";

interface CloningFinishStepProps {
    jobId: string;
    uploadedFilenames?: any[];
    uploadedUrls?: any[];
    isManual?: boolean;
}

const CloningFinishStep = ({ jobId, uploadedFilenames, isManual=false }: CloningFinishStepProps) => {
    const cloneModal = useCloneModal();

    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState(uploadedFilenames ? uploadedFilenames : []);
    const [missingFiles, setMissingFiles] = useState<number[]>([]);
    const [submitted, setSubmitted] = useState(false);

    const [isMounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isMounted) return null;

    const onSubmit = async () => {
        try {
            setLoading(true);
            setMissingFiles([]);

            await axios.post("/api/clone", { cloneId: jobId })
                .then(() => setSubmitted(true))
                .catch((error) => {
                    if (error?.response?.status === 402) {
                        setMissingFiles(error.response?.data.missingFiles);
                        toast.error("Please finish the cloning procedure first.", { position: "bottom-center" });
                    } else if(error?.response?.status === 403) {
                        cloneModal.onOpen();
                    } else {
                        toast.error("Something went wrong", { position: "bottom-center" });
                    }
                });
        } catch (err) {
            toast.error("Something went wrong", { position: "bottom-center" });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <CloneModal />
            {submitted ?
                window.location.href = "/dashboard"
                :
                <>
                    <div className="p-4 lg:px-8">
                        <div className="text-xl flex justify-between lg:max-w-md mx-auto">
                            <div className="flex gap-2 items-center">
                                <div><b>Cloning Procedure</b></div>
                                <Link href="/dashboard/clone" passHref={true}>
                                    <Button size="icon" variant="ghost" className="text-primary">
                                        <CornerDownLeftIcon />
                                    </Button>
                                </Link>
                            </div>
                            {files.some(fileName => fileName === "1") ?
                                <Badge className="h-fit gap-2 bg-[#33ff66] text-black">
                                    <div className="text-lg">Complete</div> <CheckIcon />
                                </Badge>
                                :
                                <Badge className="h-fit gap-2" variant="destructive">
                                    <div className="text-lg">Missing</div> <AlertCircleIcon />
                                </Badge>}
                        </div>
                        
                        <div className="w-[250px] mx-auto mt-4">
                            {missingFiles?.length ? 
                                <AlertCard variant="destructive" title="Missing Files" 
                                    message="Cloning procedure not complete."
                                /> : ""
                            }
                        </div>
                    </div>
                    <div className="w-fit h-fit mx-auto flex justify-center items-center mt-8 mb-16"
                    >
                        <Button 
                            size="lg" 
                            className="text-3xl border-2 border-black shadow-xl hover:scale-105 transition p-8"
                            disabled={
                                loading
                            }
                            onClick={onSubmit}
                        >
                            Clone My Voice
                        </Button>
                    </div>
                </>
            }
        </div>
    )
}

export default CloningFinishStep;