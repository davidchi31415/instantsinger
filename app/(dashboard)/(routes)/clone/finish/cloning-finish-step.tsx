"use client";

import { FileUploader } from "@/components/file-uploader";
import { Heading } from "@/components/heading";
import { CheckIcon, MicIcon, XIcon } from "lucide-react";
import { pianoSteps } from "../constants";
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
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface CloningFinishStepProps {
    usedNames: string[];
    jobId: string;
    uploadedFilenames?: any[];
    uploadedUrls?: any[];
    isManual?: boolean;
}

const CloningFinishStep = ({ usedNames, jobId, uploadedFilenames, isManual=false }: CloningFinishStepProps) => {
    const router = useRouter();
    const proModal = useProModal();

    const [loading, setLoading] = useState(false);
    const [cloneName, setCloneName] = useState<string>("");
    const [nameError, setNameError] = useState<string>("");
    const [files, setFiles] = useState(uploadedFilenames ? uploadedFilenames : []);
    const [missingFiles, setMissingFiles] = useState<number[]>([]);
    const [submitted, setSubmitted] = useState(false);

    const nameAlreadyUsed = usedNames?.length &&
        usedNames.some((name: string) => cloneName === name);


    const [isMounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isMounted) return null;

    const onSubmit = async () => {
        try {
            setLoading(true);
            if (cloneName === "") {
                setNameError("Clone name required.")
                return;
            }
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
    
    const onUpload = async (key) => {
        if (!files.some(e => e === key)) {
            setFiles(e => [...e, key]);
        }
    }

    const onDelete = async ({ fileName }) => {
        await axios.post("/api/clone/delete", { cloneId: jobId, fileName })
            .then(() => router.refresh())
            .catch(() => toast("Couldn't delete file."))
    }

    // if (isManual) {
    //     return (
    //         <div>
    //             {submitted ?
    //                 <div className="flex flex-col items-center gap-4">
    //                     <Congrats label="Congrats! Your AI voice is on its way." />
    //                     <Button className="p-4 text-xl" size="lg"
    //                         onClick={() => { window.location.href = "/clone" }}
    //                     >
    //                         Check Status
    //                     </Button>
    //                 </div>
    //                 :
    //                 <>
    //                     <div className="p-4 lg:px-8">
    //                         <div className="mb-4 text-xl font-bold">Manual Cloning Instructions</div>
    //                         <div className="mb-8">
    //                             Upload your audio file(s) to clone your voice. Make sure that they 
    //                                 <ol> 
    //                                     <li key="note-1" className="list-decimal list-inside">
    //                                         capture the entire vocal range you wish to cover in your{" "}
    //                                         song conversions.
    //                                     </li>
    //                                     <li key="note-2" className="list-decimal list-inside">
    //                                         use <b>only vocal recordings</b> - do not upload full{" "}
    //                                         songs that have background sounds, instrumentals or multiple voices.
    //                                     </li>
    //                                     <li key="note-3" className="list-decimal list-inside">
    //                                         in total do not exceed <b>20 minutes</b> long. Beware of too short a dataset as well (aim for at least 10 minutes).
    //                                     </li>
    //                                 </ol>
    //                         </div>
    //                         <div className="mb-8">
    //                             <FileUploader uploadEndpoint="/api/clone/upload" 
    //                                 apiParams={{ cloneId: jobId }}
    //                                 onUpload={() => onUpload("4.1")}
    //                                 durationLimit={6}
    //                             />
    //                         </div>

    //                         <div className="text-lg font-bold mb-4">Uploaded Files:</div>
    //                         <div className="mb-8">
    //                             {files.length ? 
    //                                 <div className="grid grid-cols-3 gap-1">
    //                                     {files.map(
    //                                         (fileName) => {
    //                                             return (
    //                                                 <Card className="p-2 border-2 hover:border-black/50
    //                                                     flex justify-between"
    //                                                 >                                
    //                                                     {fileName}
    //                                                     <Button variant="destructive" size="icon"
    //                                                         onClick={() => onDelete({ fileName })}
    //                                                     >
    //                                                         <XIcon />
    //                                                     </Button>
    //                                                 </Card>
    //                                             )
    //                                         }
    //                                     )}
    //                                 </div> : "None"}
    //                         </div>
                            
    //                         <div className="flex flex-col items-center gap-2">
    //                             Choose a name for your voice clone:
    //                             <div className="w-[250px]">
    //                                 <Input onChange={(e) => {
    //                                         setCloneName(e.target.value);
    //                                         setNameError("");
    //                                     }}
    //                                     className="mb-2" 
    //                                 />
    //                                 {nameError !== "" ? <AlertCard variant="destructive" title="Error" message={nameError} />
    //                                     : (nameAlreadyUsed ? 
    //                                         <AlertCard variant="destructive" title="Error" 
    //                                             message="You've already used that name." />
    //                                         : "")
    //                                 }
    //                                 {missingFiles?.length ? 
    //                                     <AlertCard variant="destructive" title="Misising Files" 
    //                                         message={`Missing Steps ${missingFiles.toString()}`}
    //                                     /> : ""
    //                                 }
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className="w-fit h-fit mx-auto flex justify-center items-center mt-8 mb-16 shadow-xl
    //                         hover:scale-105 transition"
    //                     >
    //                         <Button size="lg" className="text-xl rounded-r-none border-2 border-black"
    //                             disabled={loading}
    //                             onClick={onSubmit}
    //                         >
    //                             Clone My Voice
    //                         </Button>
    //                         <span className="px-2 py-[0.45rem] rounded-r-md text-black flex items-center bg-primary/20
    //                             border-2 border-black border-l-none font-bold
    //                         ">
    //                             1
    //                             <IconContext.Provider
    //                             value={{ size: "25px", color: "#E1B530" }}
    //                         >
    //                             <PiCoinVerticalFill />
    //                             </IconContext.Provider>
    //                         </span>
    //                     </div>
    //                 </>
    //             }
    //         </div>
    //     )
    // } else {
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
                            <div className="text-xl font-bold flex justify-between">
                                Step 1: Speaking Part 1
                                {files.some(fileName => fileName === "1") ?
                                    <Badge className="h-fit gap-2 bg-[#33ff66] text-black">
                                        <div className="text-lg">Uploaded</div> <CheckIcon />
                                    </Badge> : ""}
                            </div>
                            <div className="mb-4 text-sm text-muted-foreground">The whole essay in one audio file.</div>
                            <FileUploader uploadEndpoint="/api/clone/upload"
                                apiParams={{ cloneId: jobId, fileName: "1" }}
                                onUpload={() => onUpload("1")}
                                durationLimit={8}
                            />

                            <div className="mt-8 text-xl font-bold flex justify-between">
                                Step 2: Speaking Part 2
                                {files.some(fileName => fileName === "2") ?
                                    <Badge className="h-fit gap-2 bg-[#33ff66] text-black">
                                        <div className="text-lg">Uploaded</div> <CheckIcon />
                                    </Badge> : ""}
                            </div>
                            <div className="mb-4 text-sm text-muted-foreground">The whole list of sentences in one audio file.</div>
                            <FileUploader uploadEndpoint="/api/clone/upload"
                                apiParams={{ cloneId: jobId, fileName: "2" }}
                                onUpload={() => onUpload("2")}
                                durationLimit={8}
                            />

                            <div className="mt-8 text-xl font-bold">Step 3: Pitches</div>
                            <div className="mb-4 text-sm text-muted-foreground">
                                Each range in its own file. Not all are required.
                            </div>
                            {pianoSteps.map((step, index) => {
                                return (
                                    <div className="mb-8" key={`3.${index+1}`}>
                                        <div className="mb-4 flex justify-between items-center">
                                            <div>{index+1}. Going {step.up ? "Up" : "Down"},{" "}
                                            {step.up ? `${step.low} -> ${step.high}`
                                            : `${step.high} -> ${step.low}`} {step.optional ? <b>(OPTIONAL)</b> : ""}</div>
                                            <div>{files.some(fileName => fileName === `3.${index+1}`) ?
                                            <Badge className="h-fit gap-2 bg-[#33ff66] text-black">
                                                <div className="text-lg">Uploaded</div> <CheckIcon />
                                            </Badge> : ""}</div>
                                        </div>
                                        <FileUploader uploadEndpoint="/api/clone/upload" 
                                            apiParams={{ cloneId: jobId, fileName: `3.${index+1}` }}
                                            onUpload={() => onUpload(`3.${index+1}`)}
                                            durationLimit={1}
                                        />
                                    </div>
                                );
                            })}

                            <div className="mt-8 mb-4 text-xl font-bold">Step 4: Singing</div>
                            <div className="mb-8">
                                <div className="mb-4 flex justify-between items-center">
                                    <div>1. Song 1</div>
                                    <div>{files.some(fileName => fileName === "4.1") ?
                                    <Badge className="h-fit gap-2 bg-[#33ff66] text-black">
                                        <div className="text-lg">Uploaded</div> <CheckIcon />
                                    </Badge> : ""}</div>
                                </div>
                                <FileUploader uploadEndpoint="/api/clone/upload" 
                                    apiParams={{ cloneId: jobId, fileName: "4.1" }}
                                    onUpload={() => onUpload("4.1")}
                                    durationLimit={6}
                                />
                            </div>
                            <div className="mb-8">
                                <div className="mb-4 flex justify-between items-center">
                                    <div>2. Song 2</div>
                                    <div>{files.some(fileName => fileName === "4.2") ?
                                    <Badge className="h-fit gap-2 bg-[#33ff66] text-black">
                                        <div className="text-lg">Uploaded</div> <CheckIcon />
                                    </Badge> : ""}</div>
                                </div>
                                <FileUploader uploadEndpoint="/api/clone/upload" 
                                    apiParams={{ cloneId: jobId, fileName: "4.2" }}
                                    onUpload={() => onUpload("4.2")}
                                    durationLimit={6}
                                />
                            </div>
                            <div className="mb-8">
                                <div className="mb-4 flex justify-between items-center">
                                    <div>3. Song 3</div>
                                    <div>{files.some(fileName => fileName === "4.3") ?
                                    <Badge className="h-fit gap-2 bg-[#33ff66] text-black">
                                        <div className="text-lg">Uploaded</div> <CheckIcon />
                                    </Badge> : ""}</div>
                                </div>
                                <FileUploader uploadEndpoint="/api/clone/upload" 
                                    apiParams={{ cloneId: jobId, fileName: "4.3" }}
                                    onUpload={() => onUpload("4.3")}
                                    durationLimit={6}
                                />
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
                                            <AlertCard variant="destructive" title="Error" 
                                                message="You've already used that name." />
                                            : "")
                                    }
                                    {missingFiles?.length ? 
                                        <AlertCard variant="destructive" title="Misising Files" 
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
                                disabled={loading}
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
    // }
}

export default CloningFinishStep;