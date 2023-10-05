"use client";

import { ArrowRightIcon, PauseIcon, PlayIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { useEffect, useRef, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

const urls = {
    "sample1": "https://storage.googleapis.com/instantsinger-public/demo/demo1_original.mp3",
    "sample2": "https://storage.googleapis.com/instantsinger-public/demo/demo2_original.mp3",
    "sample3": "https://storage.googleapis.com/instantsinger-public/demo/demo3_original.mp3",
    "sample4": "https://storage.googleapis.com/instantsinger-public/demo/demo4_original.mp3",
    'boy1': "https://storage.googleapis.com/instantsinger-public/demo/boy1/demo_speaking.mp3",
    'boy2': "https://storage.googleapis.com/instantsinger-public/demo/boy2/demo_speaking.mp3",
    'girl1': "https://storage.googleapis.com/instantsinger-public/demo/girl1/demo_speaking.mp3",
    // 'girl2': "https://storage.googleapis.com/instantsinger-public/original/girl2.mp3",
    "boy1_sample1": "https://storage.googleapis.com/instantsinger-public/demo/boy1/demo_1.mp3",
    "boy1_sample2": "https://storage.googleapis.com/instantsinger-public/demo/boy1/demo_2.mp3",
    "boy1_sample3": "https://storage.googleapis.com/instantsinger-public/demo/boy1/demo_3.mp3",
    "boy1_sample4": "https://storage.googleapis.com/instantsinger-public/demo/boy1/demo_4.mp3",
    "boy2_sample1": "https://storage.googleapis.com/instantsinger-public/demo/boy2/demo_1.mp3",
    "boy2_sample2": "https://storage.googleapis.com/instantsinger-public/demo/boy2/demo_2.mp3",
    "boy2_sample3": "https://storage.googleapis.com/instantsinger-public/demo/boy2/demo_3.mp3",
    "boy2_sample4": "https://storage.googleapis.com/instantsinger-public/demo/boy2/demo_4.mp3",
    "girl1_sample1": "https://storage.googleapis.com/instantsinger-public/demo/girl1/demo_1.mp3",
    "girl1_sample2": "https://storage.googleapis.com/instantsinger-public/demo/girl1/demo_2.mp3",
    "girl1_sample3": "https://storage.googleapis.com/instantsinger-public/demo/girl1/demo_3.mp3",
    "girl1_sample4":"https://storage.googleapis.com/instantsinger-public/demo/girl1/demo_4.mp3",
    // "girl2_sample1": "https://storage.googleapis.com/instantsinger-public/original/girl2_sample1.mp3",
    // "girl2_sample2": "https://storage.googleapis.com/instantsinger-public/original/girl2_sample2.mp3",
    // "girl2_sample3": "https://storage.googleapis.com/instantsinger-public/original/girl2_sample3.mp3",
    // "girl2_sample4": "https://storage.googleapis.com/instantsinger-public/original/girl2_sample4.mp3"
}

const Player = ({ toggle, active }) => {
    return (
        <Button variant="ghost" className="text-primary" onClick={toggle}>
            {active ? <PauseIcon size={32} /> : <PlayIcon size={32} />}
        </Button>
    )
}

const people = {
    "boy1": "👨🏻", 
    "boy2": "👨🏽", 
    "girl1": "👩🏻", 
    // "girl2": "👩🏼"
};

export const HeroDemo = () => {
    const [person, setPerson] = useState("boy1");
    const audios = useRef<any>(null);
    const [activePlayer, setActivePlayer] = useState("");

    const play = (name) => {
        if (!audios.current) return;
        if (activePlayer) {
            audios.current[activePlayer].pause();
            audios.current[name].removeEventListener('ended', () => setActivePlayer(""));
        }
        audios.current[name].play();
        audios.current[name].addEventListener('ended', () => setActivePlayer(""));
        setActivePlayer(name);
    };
    
    const pause = (name?) => {
        if (!audios.current) return;
        setActivePlayer("");
        if (name) {
            audios.current[name].pause();
        } else {
            for (let audioName in audios.current) {
                if (audios.current.hasOwnProperty(audioName)) {
                    audios.current[audioName].pause();
                }
            }
        }
    };

    const switchPerson = (newPerson) => {
        if (!audios.current) return;
        setPerson(newPerson);
        pause();
    }

    const toggle = (name) => {
        if (!audios.current) return;
        if (activePlayer === name) {
            pause();
        } else {
            play(name);
        }
    }

    useEffect(() => {
        const audioElements = {};
        for (let audioName in urls) {
            if (urls.hasOwnProperty(audioName)) {
                audioElements[audioName] = new Audio(urls[audioName]);
              }
        }
        audios.current = audioElements;

        return () => pause();
    }, []);

    return (
        <div>
            <div className="flex flex-col items-center scale-95 md:scale-100 lg:scale-125">
                <div className="px-4 py-1 border-2 border-b-0 border-primary rounded-t-md bg-primary/25 font-medium text-xl">
                    Choose a Voice
                </div>
                <div className="w-fit mx-auto mb-2 border-2 shadow-md rounded-md bg-white flex items-center justify-center">
                    <div className="flex justify-center items-center gap-2 p-2">
                        <Select onValueChange={(val) => switchPerson(val)}
                            defaultValue={person}
                        >
                            <SelectTrigger className="w-[160px] text-xl">
                                <SelectValue placeholder="Select a voice" />
                            </SelectTrigger>
                            <SelectContent className="text-3xl">
                                <SelectGroup>
                                    <SelectItem value="boy1" className="text-xl">{people["boy1"]} Guy 1</SelectItem>
                                    <SelectItem value="boy2" className="text-xl">{people["boy2"]} Guy 2</SelectItem>
                                    <SelectItem value="girl1" className="text-xl">{people["girl1"]} Girl 1</SelectItem>
                                    {/* <SelectItem value="girl2" className="text-xl">{people["girl2"]} Girl 2</SelectItem> */}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <Player toggle={() => toggle(person)} active={activePlayer === person} />
                </div>
            </div>
            <div className="flex justify-center items-center lg:mt-12 scale-95 md:scale-100 lg:scale-125">
                <div className="transform rotate-180 px-1 border-2 border-l-0 border-primary rounded-r-md bg-primary/25 font-medium h-[12rem] text-center text-xl"
                    style={{ "writingMode": "vertical-rl" }}
                >
                    Original Song
                </div>
                <div className="flex flex-col items-center justify-center shadow-xl">
                    <div className="border-2 border-black/10 shadow-md rounded-md bg-[#f9f9f9] flex items-center justify-center">
                        <div className="flex flex-col items-center justify-center">
                            <div className="p-4 pr-0 flex items-center justify-center text-3xl">
                                👨 <Player toggle={() => toggle("sample1")} active={activePlayer === "sample1"} />
                            </div>
                            <div className="p-4 pr-0 flex items-center justify-center text-3xl">
                                👩 <Player toggle={() => toggle("sample2")} active={activePlayer === "sample2"} />
                            </div>
                            <div className="p-4 pr-0 flex items-center justify-center text-3xl">
                                👨 <Player toggle={() => toggle("sample3")} active={activePlayer === "sample3"} />
                            </div>
                            <div className="p-4 pr-0 flex items-center justify-center text-3xl">
                                👩 <Player toggle={() => toggle("sample4")} active={activePlayer === "sample4"} />
                            </div>
                        </div>
                        <div className="text-primary">
                            <ArrowRightIcon />
                            <div className="invisible"><ArrowRightIcon /></div>
                            <div className="invisible"><ArrowRightIcon /></div>
                            <ArrowRightIcon />
                            <div className="invisible"><ArrowRightIcon /></div>
                            <div className="invisible"><ArrowRightIcon /></div>
                            <ArrowRightIcon />
                            <div className="invisible"><ArrowRightIcon /></div>
                            <div className="invisible"><ArrowRightIcon /></div>
                            <ArrowRightIcon />
                        </div>
                        <div className="flex flex-col items-center justify-center ml-2 rounded-md bg-white border-2 border-primary shadow-xl">
                            <div className="p-4 pr-0 flex items-center justify-center text-3xl">
                                {people[person]} <Player toggle={() => toggle(`${person}_sample1`)} active={activePlayer === `${person}_sample1`} />
                            </div>
                            <div className="p-4 pr-0 flex items-center justify-center text-3xl">
                                {people[person]} <Player toggle={() => toggle(`${person}_sample2`)} active={activePlayer === `${person}_sample2`} />
                            </div>
                            <div className="p-4 pr-0 flex items-center justify-center text-3xl">
                                {people[person]} <Player toggle={() => toggle(`${person}_sample3`)} active={activePlayer === `${person}_sample3`} />
                            </div>
                            <div className="p-4 pr-0 flex items-center justify-center text-3xl">
                                {people[person]} <Player toggle={() => toggle(`${person}_sample4`)} active={activePlayer === `${person}_sample4`} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-1 border-2 border-l-0 border-primary rounded-r-md bg-[#33ff66]/25 font-medium h-[12rem] text-center text-xl"
                    style={{ "writingMode": "vertical-rl" }}
                >
                    Voice Swapped
                </div>
            </div>
        </div>
    )
}