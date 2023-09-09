"use client";

import { cn } from '@/lib/utils';
import { useAudioRecorder } from 'react-audio-voice-recorder';
import { LiveAudioVisualizer } from 'react-audio-visualize';
import { Button } from './ui/button';
import { CheckCircleIcon, CheckIcon, CircleIcon, MoveRight, MoveRightIcon, PauseCircleIcon, PlayCircleIcon, StopCircle, StopCircleIcon, Undo2Icon, UndoIcon, UploadCloudIcon, XCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { MAX_FILE_SIZE } from '@/lib/constants';
import { Progress } from './ui/progress';
import { useRouter } from 'next/navigation';

export const RecorderComponent = ({ jobId, stepNumber, minDuration, maxDuration }) => {
    const router = useRouter();

    const {
        startRecording,
        stopRecording,
        recordingBlob,
        isRecording,
        recordingTime,
        mediaRecorder
    } = useAudioRecorder();

    const [duration, setDuration] = useState(0);
    const [finished, setFinished] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = async () => {
        try {
            setError("");
            if (duration >= maxDuration * 60) {
                setError(`Time limit is ${maxDuration} min. Please try to be a little faster.`);
                return;
            } else if (duration <= minDuration * 60) {
                setError(`Need at least ${minDuration} min. Are you sure you finished?`);
                return;
            }
          
            setUploading(true);
            let response = await axios.post("/api/clone/upload", { cloneId: jobId, fileName: `${stepNumber}` });
        
            if (response.status === 200) {
                const url = response.data.url;
                console.log(response.data.url);
            
                const uploadResponse = await axios.put(url, recordingBlob, {
                    headers: {
                        "Content-Type": 'application/octet-stream',
                        "x-goog-content-length-range": `0,${MAX_FILE_SIZE}`
                    },
                    onUploadProgress: (progressEvent) => {
                      const totalLength = progressEvent.total;
                      if (totalLength) {
                          setUploadProgress(Math.round( (progressEvent.loaded * 100) / totalLength ));
                      }
                    }
                });
        
                if (uploadResponse.status === 200) {
                    setUploadComplete(true);
                    console.log("File upload successful");
                } else {
                    console.log("File upload failed");
                }
            } else {
                console.log("Error in generating url");
            }
            } catch (error: any) {
                console.log("[SUBMIT ERROR]", error);
                toast.error("Something went wrong.");
            } finally {
                setUploading(false);
            }
      }

    return (
        <div className={cn("fixed bottom-0 left-0 right-0 mx-auto h-[30vh] \
            w-full md:max-w-lg flex justify-center rounded-t-3xl \
            bg-[#fafafa] transition-[height] ease-in-out border shadow-xl", 
            isRecording || finished ? "h-[42vh]" : "")}
        >
            <div className="fixed bottom-10 xl:bottom-18 2xl:bottom-22 flex flex-col items-center gap-2">
                {(mediaRecorder) ?
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-fit mx-auto text-center text-3xl">
                            {Math.floor(recordingTime/60)}
                            :
                            {
                                (recordingTime - Math.floor(recordingTime/60)*60).toLocaleString('en-US', {
                                    minimumIntegerDigits: 2,
                                    useGrouping: false
                                })
                            }
                        </div>
                        <div className="w-[300px] my-[-50px] scale-y-50 overflow-x-hidden">
                            <LiveAudioVisualizer
                                mediaRecorder={mediaRecorder}
                                width={600}
                                height={200}
                                barWidth={5}
                                gap={1}
                                barColor='#f76565'
                            />
                        </div>
                    </div> : ""
                }
                {!isRecording ?
                    finished ?
                        uploading || uploadComplete ?
                            <div className="flex flex-col items-center gap-2 mb-8">
                                <div className="flex flex-col items-center gap-4">
                                    {!uploadComplete ?
                                        <div className="text-3xl">Uploading...</div>
                                        :
                                        <div className="flex items-center gap-2 text-3xl px-4 rounded-xl border-2 bg-[white]">
                                            Step {stepNumber}
                                            <div className="w-fit h-fit p-2 rounded-full ">
                                                <CheckIcon 
                                                    size={50}
                                                    color="darkgreen"
                                                />
                                            </div>
                                        </div>
                                    }
                                    <div className="p-4 w-[20rem] md:w-[30rem]">
                                        <Progress value={uploadProgress} className="w-full" />
                                    </div>
                                    <Button
                                        onClick={() => {
                                            if (stepNumber === 2) {
                                                router.push("/dashboard/clone/finish");
                                            } else {
                                                router.push("/dashboard/clone/step-2-preview");
                                            }
                                        }}
                                        disabled={!uploadComplete}
                                        className="text-xl p-8 gap-2 border-2 border-black hover:scale-105"
                                    >
                                        {stepNumber === 1 ? "Continue" : "Finish"} <MoveRightIcon />
                                    </Button>
                                </div>
                            </div>
                        :
                            error !== "" ?
                                <div className="flex flex-col items-center gap-4 mb-16">
                                    <XCircleIcon color="red" fill="white" size={50} />
                                    <div className="text-xl text-center px-4 text-wrap">{error}</div>
                                    <div className="flex items-center gap-2">
                                        <Button onClick={() => { setFinished(false); setError("") }}
                                            variant="outline"
                                            className="text-2xl p-8 gap-2 border-2 border-black hover:scale-105"
                                        >
                                            <Undo2Icon />
                                        </Button>
                                    </div>
                                </div>
                                :
                                <div className="flex flex-col items-center gap-6 mb-20">
                                    <div className="text-3xl">Finished?</div>
                                    <div className="flex items-center gap-2">
                                        <Button onClick={() => setFinished(false)}
                                            variant="outline"
                                            className="text-2xl p-8 gap-2 border-2 border-black hover:scale-105"
                                        >
                                            <Undo2Icon />
                                        </Button>
                                        <Button onClick={() => onSubmit()}
                                            className="text-2xl p-8 border-2 border-black hover:scale-105"
                                        >
                                            Yes
                                        </Button>
                                    </div>
                                </div>
                    :
                        <div className="flex flex-col items-center">
                            <div className="w-fit mx-auto text-center text-3xl">Press to Begin</div>
                            <Button variant="ghost" onClick={() => { setDuration(0); startRecording(); }}
                                className="h-fit"
                            >
                                <CircleIcon fill="red" 
                                    size={100}
                                />
                            </Button>
                        </div>
                :
                    <div className="flex items-center">
                        <Button variant="ghost" onClick={() => { setDuration(recordingTime); stopRecording(); setFinished(true); }}
                            className="h-fit"
                        >
                            <StopCircleIcon fill="red" 
                                size={100}
                            />
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}