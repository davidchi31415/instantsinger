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
                        console.log("Missing files:", error.response?.data.missingFiles);
                        setMissingFiles(error.response?.data.missingFiles);
                        toast("Missing files");
                    } else if(error?.response?.status === 403) {
                        console.log("Need more credits");
                        cloneModal.onOpen();
                    } else {
                        console.log("Error:", error.response);
                        toast("Something went wrong");
                    }
                });
        } catch (err) {
            console.log("Submission Error");
            toast("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <CloneModal />
            {submitted ?
                redirect("/dashboard")
                :
                <>
                    <div className="p-4 lg:px-8">
                        <div className="text-xl flex justify-between lg:max-w-md mx-auto">
                            <div className="flex gap-2 items-center">
                                <div><b>Step 1:</b> Speaking</div>
                                <Link href="/clone/step-1-preview" passHref={true}>
                                    <Button size="icon" variant="ghost" className="text-primary">
                                        <CornerDownLeftIcon />
                                    </Button>
                                </Link>
                            </div>
                            {files.some(fileName => fileName === "1") ?
                                <Badge className="h-fit gap-2 bg-[#33ff66] text-black">
                                    <div className="text-lg">Uploaded</div> <CheckIcon />
                                </Badge>
                                :
                                <Badge className="h-fit gap-2" variant="destructive">
                                    <div className="text-lg">Missing</div> <AlertCircleIcon />
                                </Badge>}
                        </div>

                        <div className="mt-8 text-xl flex justify-between lg:max-w-md mx-auto">
                            <div className="flex gap-2 items-center">
                                <div><b>Step 2:</b> Pitches</div>
                                <Link href="/clone/step-2-preview" passHref={true}>
                                    <Button size="icon" variant="ghost" className="text-primary">
                                        <CornerDownLeftIcon />
                                    </Button>
                                </Link>
                            </div>
                            {files.some(fileName => fileName === "2") ?
                                <Badge className="h-fit gap-2 bg-[#33ff66] text-black">
                                    <div className="text-lg">Uploaded</div> <CheckIcon />
                                </Badge>
                                :
                                <Badge className="h-fit gap-2" variant="destructive">
                                    <div className="text-lg">Missing</div> <AlertCircleIcon />
                                </Badge>}
                        </div>

                        <div className="mt-8 text-xl flex justify-between lg:max-w-md mx-auto">
                            <div className="flex gap-2 items-center">
                                <div><b>Step 3:</b> Singing</div>
                                <Link href="/clone/step-3" passHref={true}>
                                    <Button size="icon" variant="ghost" className="text-primary">
                                        <CornerDownLeftIcon />
                                    </Button>
                                </Link>
                            </div>
                            {files.some(fileName => fileName === "3") ?
                                <Badge className="h-fit gap-2 bg-[#33ff66] text-black">
                                    <div className="text-lg">Uploaded</div> <CheckIcon />
                                </Badge>
                                :
                                <Badge className="h-fit gap-2" variant="destructive">
                                    <div className="text-lg">Missing</div> <AlertCircleIcon />
                                </Badge>}
                        </div>
                        
                        <div className="w-[250px] mx-auto">
                            {missingFiles?.length ? 
                                <AlertCard variant="destructive" title="Missing Files" 
                                    message={`Missing Steps ${missingFiles.toString()}`}
                                /> : ""
                            }
                        </div>
                    </div>
                    <div className="w-fit h-fit mx-auto flex justify-center items-center mt-8 mb-16 shadow-xl
                        hover:scale-105 transition"
                    >
                        <Button size="lg" className="text-xl border-2 border-black"
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