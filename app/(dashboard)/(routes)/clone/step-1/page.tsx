"use client"

import axios from "axios";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCard } from "@/components/alert-card";
import Link from "next/link";
import { MicIcon, MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { AudioRecorder } from 'react-audio-voice-recorder';

const essay = [
    `Welcome! This is an AI-powered singing tool built for the aspiring singer. 
    By using cutting-edge technology, we provide a cheap and easy process for cloning your singing voice and transforming any song of your choice into your own voice. 
    That's right. You can now hear yourself sing exactly the way your favorite singer would if they had your voice - regardless of your current singing ability.`,
    `We created this tool with the goal of providing you with the perfect audio reference to practice singing with: your own voice, mixed with professional singing ability. 
    This will allow you to practice more effectively and more confidently. You can now, for the first time ever, hear an idealized version of your singing.
    The process is composed of two steps: 1) voice cloning, and 2) voice conversion.`,
    `Right now, we are in step 1. You are reading these words to provide speaking data. You will then be asked to provide your vocal range through a simple pitch exercise. 
    This entire collection process should take around 10 minutes - you have already gone through a significant portion. We will then train our AI for you within 6 hours, 
    although realistically, it will be much faster; we will notify you when it is done.`,
    `Once the cloning process is complete, step 2 is as simple as uploading any song to our website and clicking a button. If you can, we recommend using pure vocal recordings, 
    but we will automatically process full songs to separate the vocal and instrumental stems for you. `,
    `Furthermore, you should aim for songs within your vocal range, as our AI will not be able to extend beyond the pitches you provide - i.e., your voice will strain for notes 
    that are too high or low. That's all for the speaking part. You will now take the pitch test; keep it up, you're doing great!`
];

const CloningStep = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        window.addEventListener("keydown", handleKeys);

        return () => window.removeEventListener("keydown", handleKeys);
    }, []);

    const addAudioElement = (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        const audio = document.createElement('audio');
        audio.src = url;
        audio.controls = true;
        document.body.appendChild(audio);
    };

    const handleKeys = (e: any) => {
        if (e.defaultPrevented) {
            return; // Do nothing if the event was already processed
          }
      
          switch (e.key) {
            case "ArrowLeft":
              setCurrentIndex(e => Math.max(0, e-1))
              break;
            case "ArrowRight":
              setCurrentIndex(e => Math.min(e+1, essay.length-1))
              break;
            case "Enter":
              // Start / Stop recording
              break;
            default:
              return; // Quit when this doesn't handle the key event.
          }
      
          // Cancel the default action to avoid it being handled twice
          e.preventDefault();
    }

  return (
    <div>
        <Heading
            title="Clone"
            description="Clone your voice through a step-by-step, guided process."
            icon={MicIcon}
            iconColor="text-pink-500"
            bgColor="bg-pink-500/10"
        />
        <div className="px-4 lg:px-8 flex justify-center">
          <div className="pt-8 flex flex-col items-center justify-center">
            <Card className="w-full lg:max-w-3xl bg-muted mb-4 text-xl">
                <CardHeader>
                    <CardTitle>Step 1</CardTitle>
                    <CardDescription>Record yourself while reading the following text.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        {
                            essay[currentIndex]
                        }
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="w-full flex flex-col items-center justify-between">
                        <div className="mb-2 text-muted-foreground text-sm">{currentIndex+1} / {essay.length}</div>
                        <div className="flex items-center justify-center gap-2">
                            <Button size="icon" disabled={currentIndex <= 0}
                                onClick={() => setCurrentIndex(e => e-1)}
                            >
                                <MoveLeftIcon />
                            </Button>
                            <Button size="icon" disabled={currentIndex >= essay.length - 1}
                                onClick={() => setCurrentIndex(e => e+1)}
                            >
                                <MoveRightIcon />
                            </Button>
                        </div>
                    </div>
                </CardFooter>
            </Card>
            <div className="flex items-center justify-center">
                <AudioRecorder
                    onRecordingComplete={addAudioElement}
                    audioTrackConstraints={{
                    noiseSuppression: true,
                    echoCancellation: true,
                    // autoGainControl,
                    // channelCount,
                    // deviceId,
                    // groupId,
                    // sampleRate,
                    // sampleSize,
                    }}
                    onNotAllowedOrFound={(err) => console.table(err)}
                    downloadOnSavePress={true}
                    downloadFileExtension="webm"
                    mediaRecorderOptions={{
                    audioBitsPerSecond: 128000,
                    }}
                    // showVisualizer={true}
                />
            </div>
          </div>
        </div>
    </div>
  )
}


export default CloningStep;