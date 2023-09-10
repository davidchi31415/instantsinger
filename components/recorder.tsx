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
        isPaused,
        togglePauseResume,
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
            if (duration > maxDuration * 60) {
                setError(`Time limit is ${maxDuration} min.`);
                return;
            } else if (duration < minDuration * 60) {
                setError(`Need at least ${minDuration} min.`);
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
        <div className="fixed bottom-0 left-0 right-0 mx-auto h-[27%] md:h-[36%]
            md:static md:mt-4
            w-full md:max-w-lg flex justify-center items-center rounded-t-3xl
            bg-[#f0f0f0] transition-[height] ease-in-out border shadow-xl"
        >
            <div className="fixed bottom-4
                md:static md:bottom-0
                flex flex-col items-center"
            >
                {finished ?
                        uploading || uploadComplete ?
                            <div className="flex flex-col items-center gap-2">
                                <div className="flex flex-col items-center">
                                    {!uploadComplete ?
                                        <div className="text-xl">Uploading...</div>
                                        :
                                        <div className="text-xl">Uploading complete!</div>
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
                                <div className="flex flex-col items-center gap-4 mb-2 md:mb-0">
                                    <div className="text-xl text-center px-4 text-wrap text-destructive">
                                        {error}
                                    </div>
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
                                <div className="flex items-center gap-2 mb-10 mb:md-0">
                                    <Button onClick={() => setFinished(false)}
                                        variant="outline"
                                        className="text-2xl p-8 gap-2 border-2 border-black hover:scale-105"
                                    >
                                        <Undo2Icon />
                                    </Button>
                                    <Button onClick={() => onSubmit()}
                                        className="text-2xl p-8 border-2 border-black hover:scale-105"
                                    >
                                        Submit
                                    </Button>
                                </div>
                    :
                        isRecording ?
                            (mediaRecorder) ?
                                !isPaused ?
                                    <div className="flex items-center mb-4 md:mb-0">
                                        <Button variant="ghost" onClick={() => togglePauseResume()}
                                            className="h-fit pl-0"
                                        >
                                            <PauseCircleIcon fill="red" 
                                                size={75}
                                            />
                                        </Button>
                                        <div className="w-[175px] my-[-50px] md:my-0 overflow-x-hidden relative">
                                            <div className={cn("absolute top-10 left-[70px] text-xl", 
                                                (recordingTime > maxDuration * 60) || (recordingTime < minDuration * 60) ? "text-[red]" : "")
                                            }>
                                                {Math.floor(recordingTime/60)}
                                                :
                                                {String(recordingTime % 60).padStart(2, "0")}
                                            </div>
                                            <div className="scale-y-50">
                                                <LiveAudioVisualizer
                                                    mediaRecorder={mediaRecorder}
                                                    width={350}
                                                    height={200}
                                                    barWidth={5}
                                                    gap={1}
                                                    barColor='#f76565'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="flex items-center mb-6 md:mb-0">
                                        <Button variant="ghost" onClick={ () => { setDuration(recordingTime); stopRecording(); setFinished(true); }}
                                            className="h-fit pl-0"
                                        >
                                            <StopCircleIcon fill="red" 
                                                size={75}
                                            />
                                        </Button>
                                        <Button variant="ghost" onClick={() => togglePauseResume()}
                                            className="h-fit pl-0"
                                        >
                                            <PlayCircleIcon fill="red" 
                                                size={75}
                                            />
                                        </Button>
                                    </div>
                                : ""
                        :
                            <div className="flex flex-col items-center">
                                <div className="text-base">Press to Begin</div>
                                <Button variant="ghost" onClick={() => { setDuration(0); startRecording(); }}
                                    className="h-fit"
                                >
                                    <CircleIcon fill="red" 
                                        size={100}
                                    />
                                </Button>
                            </div>
                }
            </div>
        </div>
    )
}