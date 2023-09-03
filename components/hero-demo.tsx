import { ArrowDownIcon, ArrowRightIcon, PauseIcon, PlayIcon, Volume2Icon } from "lucide-react"
import { Button } from "./ui/button"
import { useMultiAudio } from "@/hooks/use-multi-audio"

const Player = ({ player, toggle }) => {
    return (
        <Button variant="ghost" className="text-primary" onClick={toggle}>
            {player.playing ? <PauseIcon size={32} /> : <PlayIcon size={32} />}
        </Button>
    )
}

export const HeroDemo = () => {
    const [players, toggle] = useMultiAudio({
        urls: [
            "https://cdn.discordapp.com/attachments/1140119588424667197/1143004134824476792/my_voice_sample_hero.m4a",
            "https://cdn.discordapp.com/attachments/1140119588424667197/1144100819931762728/male_sample_hero_final.wav",
            "https://cdn.discordapp.com/attachments/1140119588424667197/1144101964058210414/hero_male_converted.wav",
            "https://cdn.discordapp.com/attachments/1140119588424667197/1142845493978857553/Ultra_Mainstream_Deep_House_Vocals_Hot_Night_124_BPM_Ebm_Bridge.wav",
            "https://cdn.discordapp.com/attachments/1140119588424667197/1144087069442985994/hero_song_1_converted.wav"
        ]
    });

    return (
        <div className="py-4 px-4 md:px-8 rounded-xl bg-[#FFF1E4] shadow-xl border-4 border-[#FFD7AF]/50">
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="text-xl">Listen to this!</div>
                <div className="border-2 border-primary shadow-md rounded-md bg-white flex items-center justify-center">
                    <div className="p-2 text-2xl bg-primary/25 font-bold">
                        My Voice
                    </div>
                    <div className="text-3xl ml-4">👨🏻‍🦱</div>
                    <Player player={players[0]} toggle={toggle(0)} />
                </div>
                <div className="text-primary">
                    <ArrowDownIcon />
                </div>
                <div className="border border-black/10 shadow-md rounded-md bg-[#f9f9f9] flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center mr-2 rounded-md bg-white border-2 border-primary">
                        <div className="w-full py-2 bg-primary/25 text-center font-bold">
                            Original Song
                        </div>
                        <div className="p-4 flex items-center justify-center">
                            <div className="text-3xl ml-2">👨🏽</div>
                            <Player player={players[1]} toggle={toggle(1)} />
                        </div>
                    </div>
                    <div className="text-primary">
                        <ArrowRightIcon />
                    </div>
                    <div className="flex flex-col items-center justify-center ml-2 rounded-md bg-white border-2 border-primary">
                        <div className="w-full py-2 bg-[green]/25 text-center font-bold">
                            Converted
                        </div>
                        <div className="p-4 flex items-center justify-center">
                            <div className="text-3xl ml-2">👨🏻‍🦱</div>
                            <Player player={players[2]} toggle={toggle(2)} />
                        </div>
                    </div>
                </div>
                <div className="border border-black/10 shadow-md rounded-md bg-[#f9f9f9] flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center mr-2 rounded-md bg-white border-2 border-primary">
                        <div className="w-full py-2 bg-primary/25 text-center font-bold">
                            Original Song
                        </div>
                        <div className="p-4 flex items-center justify-center">
                            <div className="text-3xl ml-2">👩🏻</div>
                            <Player player={players[3]} toggle={toggle(3)} />
                        </div>
                    </div>
                    <div className="text-primary">
                        <ArrowRightIcon />
                    </div>
                    <div className="flex flex-col items-center justify-center ml-2 rounded-md bg-white border-2 border-primary">
                        <div className="w-full py-2 bg-[green]/25 text-center font-bold">
                            Converted
                        </div>
                        <div className="p-4 flex items-center justify-center">
                            <div className="text-3xl ml-2">👨🏻‍🦱</div>
                            <Player player={players[4]} toggle={toggle(4)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}