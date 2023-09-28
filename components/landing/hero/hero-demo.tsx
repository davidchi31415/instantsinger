"use client";

import { ArrowRightIcon, PauseIcon, PlayIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import globalAudio from "./globalAudio";

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
    "girl1": "👩🏽", 
    "girl2": "👩🏼"
};

export const HeroDemo = () => {
    const [person, setPerson] = useState("boy1");
    const [activePlayer, setActivePlayer] = useState("");

    const switchPerson = (newPerson) => {
        globalAudio.pause();
        setPerson(newPerson);
        setActivePlayer("");
    }

    const toggle = (name) => {
        if (activePlayer === name) {
            globalAudio.pause();
            setActivePlayer("");
        } else {
            globalAudio.play(name, () => { console.log("ended"); setActivePlayer(""); });
            setActivePlayer(name);
        }
    }

    useEffect(() => {
        return () => globalAudio.pause();
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
                                    <SelectItem value="girl2" className="text-xl">{people["girl2"]} Girl 2</SelectItem>
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
                                👨🏼 <Player toggle={() => toggle("sample1")} active={activePlayer === "sample1"} />
                            </div>
                            <div className="p-4 pr-0 flex items-center justify-center text-3xl">
                                👩🏻 <Player toggle={() => toggle("sample2")} active={activePlayer === "sample2"} />
                            </div>
                            <div className="p-4 pr-0 flex items-center justify-center text-3xl">
                                👨🏿 <Player toggle={() => toggle("sample3")} active={activePlayer === "sample3"} />
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