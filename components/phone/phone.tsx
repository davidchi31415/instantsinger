import { CircleIcon, MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { FakeRecorderComponent } from "./fake-recorder";
import "./styles.css";
import { Card } from "../ui/card";
import { useInViewport } from "react-in-viewport";
import { useRef } from "react";

export const PhoneComponent = () => {
    return (
        <div className="phone">
            <div className="phone-inner">
                <div className="phone-front-camera"></div>
                <div className="phone-screen-middle bg-white">
                    <div className="phone-screen-content w-full px-4">
                        <div className="flex flex-col items-center mb-12">
                            <div className="flex items-center gap-2 mb-4 text-base px-4 py-2 rounded-full bg-primary/10">
                                <CircleIcon fill="red" /> RECORDING
                            </div>
                            <Card className="w-fit px-4 h-fit py-4 shadow-xl">
                                <p className="text-center mb-4 text-lg">Sing the following song:</p>
                                <p className="text-center text-sm mt-2 text-muted-foreground">"Twinkle, Twinkle, Little Star"</p>
                                <div className="text-center italic mt-2 text-base">
                                    <p>Twinkle, twinkle, little star</p>
                                    <p>How I wonder what you are!</p>
                                    <p>Up above the world so high</p>
                                    <p>Like a diamond in the sky</p>
                                    <p>Twinkle, twinkle, little star</p>
                                    <p>How I wonder what you are!</p>
                                </div>
                            </Card>
                        </div>
                        <FakeRecorderComponent />
                    </div>
                </div>
                <div className="phone-screen-bottom-line"></div>
            </div>
        </div>
    )
}