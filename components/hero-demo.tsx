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
            "https://cdn.discordapp.com/attachments/1140119588424667197/1148068271820648548/I_Wanna_Be_Yours_cut.mp3",
            "https://cdn.discordapp.com/attachments/1140119588424667197/1148068271510278227/converted_I_Wanna_Be_Yours_cut.mp3",
            "https://cdn.discordapp.com/attachments/1140119588424667197/1148059393183731842/Oliver_Anthony_-_Rich_Men_North_Of_Richmond.mp3",
            "https://cdn.discordapp.com/attachments/1140119588424667197/1148059484997042177/converted_Oliver_Anthony_-_Rich_Men_North_Of_Richmond.wav",
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
                            <div className="text-3xl ml-2">👨🏼</div>
                            <Player player={players[1]} toggle={toggle(1)} />
                        </div>
                        <div className="p-4 flex items-center justify-center">
                            <div className="text-3xl ml-2">👨</div>
                            <Player player={players[3]} toggle={toggle(3)} />
                        </div>
                        <div className="p-4 flex items-center justify-center">
                            <div className="text-3xl ml-2">👩🏻</div>
                            <Player player={players[5]} toggle={toggle(5)} />
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
                        <div className="p-4 flex items-center justify-center">
                            <div className="text-3xl ml-2">👨🏻‍🦱</div>
                            <Player player={players[4]} toggle={toggle(4)} />
                        </div>
                        <div className="p-4 flex items-center justify-center">
                            <div className="text-3xl ml-2">👨🏻‍🦱</div>
                            <Player player={players[6]} toggle={toggle(6)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}