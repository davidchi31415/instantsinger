"use client"

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MicIcon, MoveLeftIcon, MoveRightIcon, UploadCloudIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { CloningStepBar } from "@/components/cloning-step-bar";
import Link from "next/link";
import { FileUploader } from "@/components/file-uploader";
import { RecorderComponent } from "@/components/recorder";

const contents = [
    `The birch canoe slid on the smooth planks.
    Glue the sheet to the dark blue background.
    It's easy to tell the depth of a well.`,
    `Rice is often served in round bowls.
    The juice of lemons makes fine punch.
    The box was thrown beside the parked truck.`,
    `Four hours of steady work faced us.
    A large size in stockings is hard to sell.
    The boy was there when the sun rose.`,
    `The source of the huge river is the clear spring.
    Kick the ball straight and follow through.
    Help the woman get back to her feet.`,
    `Smoky fires lack flame and heat.
    The soft cushion broke the man's fall.
    The salt breeze came across from the sea.`,
    `The small pup gnawed a hole in the sock.
    The fish twisted and turned on the bent hook.
    Press the pants and sew a button on the vest.`,
    `The beauty of the view stunned the young boy.
    Two blue fish swam in the tank.
    Her purse was full of useless trash.`,
    `It snowed, rained, and hailed the same morning.
    Read verse out loud for pleasure.
    Hoist the load to your left shoulder.`,
    `Note closely the size of the gas tank.
    Wipe the grease off his dirty face.
    Mend the coat before you go out.`,
    `The stray cat gave birth to kittens.
    The young girl gave no clear response.
    The meal was cooked before the bell rang.`,
    `A king ruled the state in the early days.
    The ship was torn apart on the sharp reef.
    Sickness kept him home the third week.`,
    `The lazy cow lay in the cool grass.
    Lift the square stone over the fence.
    The rope will bind the seven books at once.`,
    `The friendly gang left the drug store.
    Mesh wire keeps chicks inside.
    The frosty air passed through the coat.`,
    `Adding fast leads to wrong sums.
    The show was a flop from the very start.
    A saw is a tool used for making boards.`,
    `The ink stain dried on the finished page.
    The walled town was seized without a fight.
    The lease ran out in sixteen weeks.`,
    `There are more than two factors here.
    The hat brim was wide and too droopy.
    The lawyer tried to lose his case.`,
    `Oak is strong and also gives shade.
    Cats and dogs each hate the other.
    The pipe began to rust while new.`,
    `Add the sum to the product of these three.
    Thieves who rob friends deserve jail.
    The ripe taste of cheese improves with age.`,
    `The hog crawled under the high fence.
    Move the vat over the hot fire.
    The bark of the pine tree was shiny and dark.`,
    `The pennant waved when the wind blew.
    Split the log with a quick, sharp blow.
    Burn peat after the logs give out.`,
    `The empty flask stood on the tin tray.
    A speedy man can beat this track mark.
    He broke a new shoelace that day.`,
    `The coffee stand is too high for the couch.
    The urge to write short stories is rare.
    The pencils have all been used.`,
    `The pirates seized the crew of the lost ship.
    We tried to replace the coin but failed.
    She sewed the torn coat quite neatly.`,
    `The sofa cushion is red and of light weight.
    The jacket hung on the back of the wide chair.
    At that high level the air is pure.`,
    `Drop the two when you add the figures.
    A filing case is now hard to buy.
    An abrupt start does not win the prize.`
];

const CloningStep1Slides = ({ jobId }) => {
    const [step, setStep] = useState(0);
    const [isRecording, setRecording] = useState(false);

  return (
    <>
        <div className="px-4 lg:px-8 md:max-w-lg mx-auto flex justify-center">
            <Card className="w-full lg:max-w-3xl text-xl">
                <CardHeader>
                    <div className="w-full flex items-center justify-between">
                        <Button
                            disabled={step <= 0}
                            onClick={() => setStep(e => Math.max(0, e-1))}
                            className="gap-2 text-md"
                            variant="outline"
                        >
                            <MoveLeftIcon />
                        </Button>
                        <div>{step+1}/{contents.length}</div>
                        <Button
                            disabled={step >= contents.length - 1}
                            onClick={() => setStep(e => Math.min(contents.length - 1, e+1))}
                            className="text-md gap-2 border-2 border-black hover:scale-105"
                        >
                            <MoveRightIcon />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div>
                        {contents[step]}
                    </div>
                    {isRecording ?
                        step !== contents.length - 1 ?
                            <div className="text-center text-md text-primary border-t-2 mt-2 pt-2">
                                Keep on recording.
                            </div>
                            :
                            <div className="text-center text-md text-primary border-t-2 mt-2 pt-2">
                                Stop recording here.
                            </div>
                        : ""
                    }
                </CardContent>
            </Card>
        </div>
        <RecorderComponent jobId={jobId} stepNumber={1} minDuration={3} maxDuration={8} onRecordChange={setRecording} />
    </>
  )
}


export default CloningStep1Slides;