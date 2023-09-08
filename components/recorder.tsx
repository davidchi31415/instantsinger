"use client";

import { cn } from '@/lib/utils';
import { useAudioRecorder } from 'react-audio-voice-recorder';
import { LiveAudioVisualizer } from 'react-audio-visualize';
import { Button } from './ui/button';
import { CircleIcon, PauseCircleIcon, PlayCircleIcon, StopCircle, StopCircleIcon, UploadCloudIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const delay = ms => new Promise(res => setTimeout(res, ms));

export const RecorderComponent = ({ onLastStep }) => {
    const {
        startRecording,
        stopRecording,
        togglePauseResume,
        isPaused,
        recordingBlob,
        isRecording,
        recordingTime,
        mediaRecorder
    } = useAudioRecorder();

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const handler = async () => {
            if (!expanded && isRecording) {
                await delay(250);
                setExpanded(true);
            } else if (expanded && !isRecording) {
                setExpanded(false);
            }
        }

        handler();
    }, [expanded, isRecording]);


    return (
        <div className={cn("fixed bottom-0 left-0 right-0 mx-auto h-[27vh] \
            w-full md:max-w-lg flex justify-center rounded-t-3xl \
            bg-[#EAEAEA] transition-[height] ease-in-out border shadow-xl", 
            isRecording || isPaused ? "h-[42vh]" : "")}
        >
            <div className="fixed bottom-10 xl:bottom-18 2xl:bottom-22 flex flex-col items-center gap-2">
                {(mediaRecorder && expanded) ?
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
                {!isRecording && !isPaused ?
                    <div className="flex flex-col items-center">
                        <div className="w-fit mx-auto text-center text-3xl">Press to Begin</div>
                        <Button variant="ghost" onClick={() => startRecording()}
                            className="h-fit"
                        >
                            <CircleIcon fill="red" 
                                size={100}
                            />
                        </Button>
                    </div>
                :   !isPaused ?
                        !onLastStep ?
                            <Button variant="ghost" onClick={() => togglePauseResume()}
                                className="h-fit"
                            >
                                <PauseCircleIcon fill="red" 
                                    size={100}
                                />
                            </Button>
                            :
                            <Button variant="default" onClick={() => togglePauseResume()}
                                className="h-fit"
                            >
                                <UploadCloudIcon
                                    size={100}
                                />
                            </Button>
                        :
                        <div className="flex items-center">
                            <Button variant="ghost" onClick={() => stopRecording()}
                                className="h-fit"
                            >
                                <StopCircleIcon fill="red" 
                                    size={100}
                                />
                            </Button>
                            <Button variant="ghost" onClick={() => togglePauseResume()}
                                className="h-fit"
                            >
                                <PlayCircleIcon fill="red" 
                                    size={100}
                                />
                            </Button>
                        </div>
                }
            </div>
        </div>
    )
}