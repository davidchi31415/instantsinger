"use client";

import { CloningFileUploader } from "@/components/file-uploader";
import { Heading } from "@/components/heading";
import { MicIcon } from "lucide-react";
import { pianoSteps } from "../constants";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { AlertCard } from "@/components/alert-card";
import { Congrats } from "@/components/congrats";
import Link from "next/link";

interface CloningFinishStepProps {
    usedNames: string[]
}

const CloningFinishStep = ({ usedNames }: CloningFinishStepProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [cloneName, setCloneName] = useState<string>("");
    const [nameError, setNameError] = useState<string>("");
    const [missingFiles, setMissingFiles] = useState<number[]>([]);
    const [submitted, setSubmitted] = useState(false);

    const nameAlreadyUsed = usedNames?.length &&
        usedNames.some((name: string) => cloneName === name);

    const onSubmit = async () => {
        try {
            setLoading(true);
            if (cloneName === "") {
                setNameError("Clone name required.")
                return;
            }
            setNameError("");
            const response = await axios.post("/api/clone", { cloneName });
            
            if (response.status === 200) {
                setSubmitted(true);
            } else {
                if (response.status === 403) {
                    console.log("Missing files:", response.data.missingFiles);
                    setMissingFiles(response.data.missingFiles);
                } else {
                    console.log("Error:", response);
                    // TO-DO: make toast
                }
            }
        } catch (err) {
            console.log("Submission Error");
            // TO-DO - proper error display
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {true ?
                <div className="flex flex-col items-center gap-4">
                    <Congrats label="Congrats! Your AI voice is on its way." />
                    <Link href="/clone">
                        <Button className="p-4 text-xl" size="lg">
                            Check Status
                        </Button>
                    </Link>
                </div>
                :
                <>
                    <div className="p-4 lg:px-8">
                        <div className="text-xl font-bold">Step 1: Speaking</div>
                        <div className="mb-4 text-sm text-muted-foreground">The whole essay in one audio file.</div>
                        <CloningFileUploader uploadEndpoint="/api/clone/upload" stepNumber={1} 
                            
                        />
                        <div className="mt-8 text-xl font-bold">Step 2: Pitches</div>
                        <div className="mb-4 text-sm text-muted-foreground">
                            Each range in its own file. Not all are required.
                        </div>
                        {pianoSteps.map((step, index) => {
                            return (
                                <div className="mb-8">
                                    <div>{index+1}. Going {step.up ? "Up" : "Down"},{" "}
                                        {step.up ? `${step.low} -> ${step.high}`
                                        : `${step.high} -> ${step.low}`} {step.optional ? <b>(OPTIONAL)</b> : ""}
                                    </div>
                                    <CloningFileUploader uploadEndpoint="/api/clone/upload" stepNumber={`2.${index+1}`} />
                                </div>
                            );
                        })}
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
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center pt-8 pb-16">
                        <Button size="lg" className="text-xl"
                            disabled={loading}
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