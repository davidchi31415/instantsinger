"use client";

import { ConversionResultsComponent } from "@/components/conversion-results";
import { RecordPlayerComponent } from "@/components/record-player/record-player";
import { useState } from "react";

const ConversionResultUI = ({ results }) => {
    const [playing, setPlaying] = useState(false);

    return (
        <div className="px-4 lg:px-8">
            <div className="hidden lg:block pb-8 my-8 w-fit mx-auto">
                <RecordPlayerComponent playing={playing} />
            </div>
            <ConversionResultsComponent results={results} onPlay={() => setPlaying(true)} onStop={(() => setPlaying(false))} />
        </div>
    )
}

export default ConversionResultUI;