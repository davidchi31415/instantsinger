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
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "@/components/ui/badge";
import { IconContext } from "react-icons";
import { PiCoinVerticalFill } from "react-icons/pi";
import Link from "next/link";

interface CloningFinishStepProps {
    usedNames: string[];
    jobId: string;
    uploadedFilenames?: any[];
    uploadedUrls?: any[];
    isManual?: boolean;
}

const CloningFinishStep = ({ usedNames, jobId, uploadedFilenames, isManual=false }: CloningFinishStepProps) => {
    const proModal = useProModal();

    const [loading, setLoading] = useState(false);
    const [cloneName, setCloneName] = useState<string>("");
    const [nameError, setNameError] = useState<string>("");
    const [files, setFiles] = useState(uploadedFilenames ? uploadedFilenames : []);
    const [missingFiles, setMissingFiles] = useState<number[]>([]);
    const [submitted, setSubmitted] = useState(false);

    const nameAlreadyUsed = (usedNames?.length &&
        usedNames.some((name: string) => cloneName === name)) ? true : false;

    const nameTooLong = cloneName.length > 25 ? true : false;

    const [isMounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isMounted) return null;

    const onSubmit = async () => {
        try {
            if (cloneName === "" || cloneName.length > 25 || nameAlreadyUsed) {
                return;
            }

            setLoading(true);
            setMissingFiles([]);
            setNameError("");

            await axios.post("/api/clone", { cloneName, cloneId: jobId })
                .then(() => setSubmitted(true))
                .catch((error) => {
                    if (error?.response?.status === 402) {
                        console.log("Missing files:", error.response?.data.missingFiles);
                        setMissingFiles(error.response?.data.missingFiles);
                        toast("Missing files");
                    } else if(error?.response?.status === 403) {
                        console.log("Need more credits");
                        proModal.onOpen();
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
            {submitted ?
                <div className="flex flex-col items-center gap-4">
                    <Congrats label="Congrats! Your AI voice is on its way." />
                    <Button className="p-4 text-xl" size="lg"
                        onClick={() => { window.location.href = "/clone" }}
                    >
                        Check Status
                    </Button>
                </div>
                :
                <>
                    <div className="p-4 lg:px-8">
                        <div className="text-xl flex justify-between">
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

                        <div className="mt-8 text-xl flex justify-between">
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
                        
                        <div className="mt-8 mb-4 text-xl">
                            <div className="flex gap-2 items-center">
                                <div><b>Step 3:</b> Singing</div>
                                <Link href="/clone/step-3-preview" passHref={true}>
                                    <Button size="icon" variant="ghost" className="text-primary">
                                        <CornerDownLeftIcon />
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="mt-8 mb-4 flex justify-between">
                                <div>1. Song 1</div>
                                {files.some(fileName => fileName === "3.1") ?
                                    <Badge className="h-fit gap-2 bg-[#33ff66] text-black">
                                        <div className="text-lg">Uploaded</div> <CheckIcon />
                                    </Badge>
                                    :
                                    <Badge className="h-fit gap-2" variant="destructive">
                                        <div className="text-lg">Missing</div> <AlertCircleIcon />
                                    </Badge>}
                            </div>
                            <div className="mt-8 mb-4 flex justify-between">
                                <div>2. Song 2</div>
                                {files.some(fileName => fileName === "3.2") ?
                                    <Badge className="h-fit gap-2 bg-[#33ff66] text-black">
                                        <div className="text-lg">Uploaded</div> <CheckIcon />
                                    </Badge>
                                    :
                                    <Badge className="h-fit gap-2" variant="destructive">
                                        <div className="text-lg">Missing</div> <AlertCircleIcon />
                                    </Badge>}
                            </div>
                        </div>
                        
                        <div className="flex flex-col items-center gap-2">
                            Choose a name for your voice clone:
                            <div className="w-[250px]">
                                <Input onChange={(e) => {
                                        setCloneName(e.target.value);
                                        setNameError("");
                                    }}
                                    className="mb-2" 
                                />
                                {nameError !== "" ? <AlertCard variant="destructive" title="Error" message={nameError} />
                                    : (nameAlreadyUsed ? 
                                        <AlertCard variant="destructive" title="Name Error" 
                                            message="You've already used that name." />
                                        : 
                                        nameTooLong ? 
                                        <AlertCard variant="destructive" title="Name Error" 
                                            message="Name too long. Max Length: 25 characters" />
                                        : "")
                                }
                                {missingFiles?.length ? 
                                    <AlertCard variant="destructive" title="Missing Files" 
                                        message={`Missing Steps ${missingFiles.toString()}`}
                                    /> : ""
                                }
                            </div>
                        </div>
                    </div>
                    <div className="w-fit h-fit mx-auto flex justify-center items-center mt-8 mb-16 shadow-xl
                        hover:scale-105 transition"
                    >
                        <Button size="lg" className="text-xl rounded-r-none border-2 border-black"
                            disabled={
                                loading || nameTooLong || nameAlreadyUsed || cloneName === ""
                            }
                            onClick={onSubmit}
                        >
                            Clone My Voice
                        </Button>
                        <span className="px-2 py-[0.45rem] rounded-r-md text-black flex items-center bg-primary/20
                            border-2 border-black border-l-none font-bold
                        ">
                            1
                            <IconContext.Provider
                            value={{ size: "25px", color: "#E1B530" }}
                        >
                            <PiCoinVerticalFill />
                            </IconContext.Provider>
                        </span>
                    </div>
                </>
            }
        </div>
    )
}

export default CloningFinishStep;