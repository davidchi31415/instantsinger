import { cn } from "@/lib/utils";
import { ConverterDemoComponent } from "./converter-demo";
import { Roboto_Slab } from "next/font/google";
import { useEffect, useState } from "react";

const font = Roboto_Slab({
    weight: "600",
    subsets: ["latin"]
});

export const LandingContentConvert = ({ inViewport, forwardedRef }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!visible && inViewport) {
            setVisible(true);
        }
    }, [visible, inViewport]);
    console.log(inViewport);

    return (
        <div className={cn("mt-36 flex justify-between opacity-0 max-w-4xl mx-auto items-center flex-wrap-reverse transition-opacity duration-[1000]", 
            visible ? "opacity-1" : "")
        }
            ref={forwardedRef}
        >
            <div className="w-fit mx-auto h-fit">
                <ConverterDemoComponent active={inViewport} />
            </div>
            <div className="flex flex-col max-w-md mx-auto lg:mr-0]">
                <h3 className={cn("text-4xl md:text-5xl font-bold leading-tight tracking-tight", font.className)}>
                    Convert <span className="underline--fancy">
                        any song
                    </span>. Just paste a link.
                </h3>
                <p className="mt-2 text-lg">
                    With your voice cloned, convert any song into your voice
                    by simply pasting a YouTube link.
                </p>
            </div>
        </div>
    )
}