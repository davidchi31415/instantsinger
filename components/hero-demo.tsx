import { ArrowDownIcon, ArrowRightIcon, PauseIcon, PlayIcon, Volume2Icon } from "lucide-react"
import { Button } from "./ui/button"
import { useMultiAudio } from "@/hooks/use-multi-audio"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Player = ({ player, toggle }) => {
    return (
        <Button variant="ghost" className="text-primary" onClick={toggle}>
            {player.playing ? <PauseIcon size={32} /> : <PlayIcon size={32} />}
        </Button>
    )
}

const SamplesCard = ({ inputEmoji, outputEmoji, players, toggle, sourceIndex, startIndex }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full text-center p-2 bg-[white] rounded-md
                border-2 text-3xl flex items-center gap-2 justify-center"
            >
                {inputEmoji} <ArrowRightIcon /> {outputEmoji}
            </div>
            <div className="border border-black/10 shadow-md rounded-md bg-[#f9f9f9] flex items-center justify-center">
                <div className="flex flex-col items-center justify-center mr-2 rounded-md bg-white border-2">
                    <div className="w-full py-2 bg-primary/25 text-center">
                        Original
                    </div>
                    <div className="p-4 flex items-center justify-center">
                        <Player player={players[sourceIndex]} toggle={toggle(sourceIndex)} />
                    </div>
                    <div className="p-4 flex items-center justify-center">
                        <Player player={players[sourceIndex + 1]} toggle={toggle(sourceIndex + 1)} />
                    </div>
                    <div className="p-4 flex items-center justify-center">
                        <Player player={players[sourceIndex + 2]} toggle={toggle(sourceIndex + 2)} />
                    </div>
                </div>
                <div className="text-primary">
                    <ArrowRightIcon />
                </div>
                <div className="flex flex-col items-center justify-center ml-2 rounded-md bg-white border-2 border-primary shadow-xl">
                    <div className="w-full py-2 bg-[green]/25 text-center font-bold">
                        Converted
                    </div>
                    <div className="p-4 flex items-center justify-center">
                        <Player player={players[startIndex]} toggle={toggle(startIndex)} />
                    </div>
                    <div className="p-4 flex items-center justify-center">
                        <Player player={players[startIndex + 1]} toggle={toggle(startIndex + 1)} />
                    </div>
                    <div className="p-4 flex items-center justify-center">
                        <Player player={players[startIndex + 2]} toggle={toggle(startIndex + 2)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const originalUrls = [
    "https://storage.googleapis.com/instantsinger-public/original/sample_1_original.mp3",
    "https://storage.googleapis.com/instantsinger-public/original/sample_2_original.mp3",
    "https://storage.googleapis.com/instantsinger-public/original/sample_3_original.mp3",
];

const people = [
    {
        emoji: "🧑🏻",
        sampleUrl: "https://cdn.discordapp.com/attachments/1140119588424667197/1143004134824476792/my_voice_sample_hero.m4a",
        urls: [
            "https://storage.googleapis.com/instantsinger-public/male_converted/sample_1.wav",
            "https://storage.googleapis.com/instantsinger-public/male_converted/sample_2.wav",
            "https://storage.googleapis.com/instantsinger-public/male_converted/sample_3.wav",
        ]
    },
    {
        emoji: "👩🏻",
        sampleUrl: "https://cdn.discordapp.com/attachments/1140119588424667197/1143004134824476792/my_voice_sample_hero.m4a",
        urls: [
            "https://cdn.discordapp.com/attachments/1140119588424667197/1148068271510278227/converted_I_Wanna_Be_Yours_cut.mp3",
            "https://cdn.discordapp.com/attachments/1140119588424667197/1148059484997042177/converted_Oliver_Anthony_-_Rich_Men_North_Of_Richmond.wav",
            "https://cdn.discordapp.com/attachments/1140119588424667197/1148068271510278227/converted_I_Wanna_Be_Yours_cut.mp3",
        ]
    }
]

export const HeroDemo = () => {
    const [emojiIndex, setEmojiIndex] = useState(0);

    const urls = [
        people[0].sampleUrl,
        people[1].sampleUrl,
        ...originalUrls,
        ...people[0].urls,
        ...people[1].urls,
    ];
    const [players, toggle] = useMultiAudio({ urls });

    const switchPerson = (index) => {
        if (emojiIndex === index) return;
        toggle(-1)();
        setEmojiIndex(index);
    }

    return (
        <div>
            <div className="w-fit mx-auto py-4 px-2 sm:px-4 md:px-8 rounded-xl bg-[#FFF1E4] shadow-xl border-4 border-[#FFD7AF]/50">
                <div className="w-fit mx-auto mb-2 border-2 shadow-md rounded-md bg-white flex items-center justify-center">
                    <div className="flex justify-center items-center gap-2 p-2">
                        <Button variant="outline"
                            className={cn("border-2 text-3xl", emojiIndex === 0 ? "border-primary" : "")}
                            onClick={() => switchPerson(0)}
                        >
                            {people[0].emoji}
                        </Button>
                        <Button variant="outline"
                            className={cn("border-2 text-3xl", emojiIndex === 1 ? "border-primary" : "")}
                            onClick={() => switchPerson(1)}
                        >
                            {people[1].emoji}
                        </Button>
                    </div>
                    <Player player={players[emojiIndex]} toggle={toggle(emojiIndex)} />
                </div>
                <div className="flex justify-center items-center gap-4 flex-wrap">
                    <SamplesCard inputEmoji="👤" outputEmoji={people[emojiIndex].emoji} players={players} toggle={toggle} sourceIndex={2} 
                        startIndex={5 + 3 * emojiIndex} 
                    />
                </div>
            </div>
        </div>
    )
}