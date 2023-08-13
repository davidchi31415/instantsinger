import { cn } from "@/lib/utils";
import CounterComponent from "./counter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Piano, MidiNumbers } from "react-piano";
import { Button } from "./ui/button";
import { useState } from "react";
import 'react-piano/dist/styles.css';
import { SplendidGrandPiano } from "smplr";
import { BanIcon, PlayIcon, SquareIcon, StopCircleIcon } from "lucide-react";

interface PianoCloningComponentProps {
    piano: SplendidGrandPiano;
    context: AudioContext;
    lowestNote: string;
    highestNote: string;
    goingUp: boolean;
    optional: boolean;
}

export const PianoCloningComponent = ({ piano, context, lowestNote, highestNote, goingUp, optional }: PianoCloningComponentProps) => {
    let startingNote: number, stoppingNote: number;
    if (goingUp) {
        startingNote = MidiNumbers.fromNote(lowestNote);
        stoppingNote = MidiNumbers.fromNote(highestNote);
    } else {
        startingNote = MidiNumbers.fromNote(highestNote);
        stoppingNote = MidiNumbers.fromNote(lowestNote);
    }
    
    const [isCounting, setCounting] = useState(false);
    const [isPlaying, setPlaying] = useState(false);
    const [activeNote, setActiveNote] = useState(startingNote);

    const deltasUp = [2, 2, 1, 2, 2, 2, 1];
    const deltasDown = [1, 2, 2, 2, 1, 2, 2];

    const playPiano = async () => {
        const now = context.currentTime;
        await piano.loaded().then(() => {
            let totalDelta = 0;
            for (let i = 0; i <= 8; i++) {
                let note = startingNote + totalDelta;
                totalDelta += (goingUp ? deltasUp[i] : -deltasDown[i]);
                piano.start({ 
                    note, time: now + 2 * i, duration: 2, 
                    onEnded: (note: any) => {
                        if (note.note !== stoppingNote) 
                            setActiveNote((active) => active + (goingUp ? deltasUp[i] : -deltasDown[i]));
                        else stopPiano();
                    }
                });
            }
        });
    }
    
    const stopPiano = () => {
        setPlaying(false);
        piano.stop();
    }

    const onStart = async () => {
        setCounting(true);
        setPlaying(true);
    }

    const onStop = () => {
        setCounting(false);
        setPlaying(false);
        stopPiano();
    }

    return (
        <Card className="w-full lg:max-w-3xl bg-muted mb-4 text-xl">
            <CardHeader>
                <CardTitle className="text-md">
                    Going {goingUp ? "Up" : "Down"},{" "}
                    {goingUp ? `${lowestNote} -> ${highestNote}`
                    : `${highestNote} -> ${lowestNote}`} {optional ? "(OPTIONAL)" : ""}
                </CardTitle>
                <CardTitle className="text-md text-muted-foreground">
                    Record yourself singing along. Wear headphones. 
                </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center relative">
                <div 
                    className="absolute top-1/2 left-1/2 
                    transform -translate-x-1/2 -translate-y-1/2 z-10
                    text-[red] text-3xl font-bold"
                >
                    <CounterComponent started={isCounting} initialCount={3}
                        onFinished={async () => {
                            setCounting(false);
                            setActiveNote(startingNote);
                            await playPiano();
                        }}
                    />
                </div>
                <div 
                    className={cn("h-[6rem] md:h-[10rem] lg:h-[12rem] \
                    w-[90%] md:w-[75%] lg:w-[75%] pointer-events-none",
                    isCounting ? "blur-sm" : "")}
                >
                    <Piano
                        noteRange={{ 
                            first: MidiNumbers.fromNote(lowestNote), 
                            last: MidiNumbers.fromNote(highestNote) 
                        }}
                        playNote={() => {}}
                        stopNote={() => {}}
                        activeNotes={isPlaying && !isCounting ? [activeNote] : ""}
                    />
                </div>
            </CardContent>
            <CardFooter>
                <div className="w-full flex flex-col items-center justify-between">
                    <div className="flex items-center justify-center">
                        {isPlaying ?
                            <Button onClick={onStop} className="text-md gap-2">Stop <SquareIcon /></Button>
                            : 
                            <div className="flex items-center justify-center">
                                <Button onClick={onStart} className="text-md gap-2">Play <PlayIcon /></Button>
                            </div>
                        }
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}