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
    It's easy to tell the depth of a well.
    These days a chicken leg is a rare dish.`,
    `Rice is often served in round bowls.
    The juice of lemons makes fine punch.
    The box was thrown beside the parked truck.
    The hogs were fed chopped corn and garbage.`,
    `Four hours of steady work faced us.
    A large size in stockings is hard to sell.
    The boy was there when the sun rose.
    A rod is used to catch pink salmon.`,
    `The source of the huge river is the clear spring.
    Kick the ball straight and follow through.
    Help the woman get back to her feet.
    A pot of tea helps to pass the evening.`,
    `Smoky fires lack flame and heat.
    The soft cushion broke the man's fall.
    The salt breeze came across from the sea.
    The girl at the booth sold fifty bonds.`,
    `The small pup gnawed a hole in the sock.
    The fish twisted and turned on the bent hook.
    Press the pants and sew a button on the vest.
    The swan dive was far short of perfect.`,
    `The beauty of the view stunned the young boy.
    Two blue fish swam in the tank.
    Her purse was full of useless trash.
    The colt reared and threw the tall rider.`,
    `It snowed, rained, and hailed the same morning.
    Read verse out loud for pleasure.
    Hoist the load to your left shoulder.
    Take the winding path to reach the lake.`,
    `Note closely the size of the gas tank.
    Wipe the grease off his dirty face.
    Mend the coat before you go out.
    The wrist was badly strained and hung limp.`,
    `The stray cat gave birth to kittens.
    The young girl gave no clear response.
    The meal was cooked before the bell rang.
    What joy there is in living.`,
    `A king ruled the state in the early days.
    The ship was torn apart on the sharp reef.
    Sickness kept him home the third week.
    The wide road shimmered in the hot sun.`,
    `The lazy cow lay in the cool grass.
    Lift the square stone over the fence.
    The rope will bind the seven books at once.
    Hop over the fence and plunge in.`,
    `The friendly gang left the drug store.
    Mesh wire keeps chicks inside.
    The frosty air passed through the coat.
    The crooked maze failed to fool the mouse.`,
    `Adding fast leads to wrong sums.
    The show was a flop from the very start.
    A saw is a tool used for making boards.
    The wagon moved on well oiled wheels.`,
    `The ink stain dried on the finished page.
    The walled town was seized without a fight.
    The lease ran out in sixteen weeks.
    A tame squirrel makes a nice pet.`,
    `There are more than two factors here.
    The hat brim was wide and too droopy.
    The lawyer tried to lose his case.
    The grass curled around the fence post.`,
    `Oak is strong and also gives shade.
    Cats and dogs each hate the other.
    The pipe began to rust while new.
    Open the crate but don't break the glass.`,
    `Add the sum to the product of these three.
    Thieves who rob friends deserve jail.
    The ripe taste of cheese improves with age.
    Act on these orders with great speed.`,
    `The hog crawled under the high fence.
    Move the vat over the hot fire.
    The bark of the pine tree was shiny and dark.
    Leaves turn brown and yellow in the fall.`,
    `The pennant waved when the wind blew.
    Split the log with a quick, sharp blow.
    Burn peat after the logs give out.
    He ordered peach pie with ice cream. The end!`
];

const CloningStep1Slides = () => {
    const [step, setStep] = useState(0);

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
                </CardContent>
            </Card>
        </div>
        <RecorderComponent onLastStep={step === contents.length - 1} />
    </>
  )
}


export default CloningStep1Slides;