import { cn } from "@/lib/utils";
import { PhoneComponent } from "./phone/phone";
import { Roboto_Slab } from "next/font/google";
import { useEffect, useState } from "react";

const font = Roboto_Slab({
    weight: "600",
    subsets: ["latin"]
});

export const LandingContentClone = ({ inViewport, forwardedRef }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!visible && inViewport) {
            setVisible(true);
        }
    }, [visible, inViewport]);

    return (
        <div className={cn("flex justify-between opacity-0 max-w-4xl mx-auto items-center flex-wrap transition-opacity duration-[1000]",
            visible ? "opacity-1" : "")
        }
            ref={forwardedRef}
        >
            <div className="flex flex-col max-w-md mx-auto">
                <h3 className={cn("text-4xl md:text-5xl font-bold leading-tight tracking-tight", font.className)}>
                    Clone <span className="underline--fancy">
                        your voice
                    </span>, straight from the browser.
                </h3>
                <p className="mt-2 text-lg">
                    Follow our procedure to clone yourself in <b className="text-primary">2 minutes</b>.
                    We'll give you 3 sample songs to hear how it sounds.
                </p>
            </div>
            <div className="w-fit mx-auto mt-8 lg:mt-0">
                <PhoneComponent />
            </div>
        </div>
    )
}