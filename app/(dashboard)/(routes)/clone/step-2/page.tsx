"use client"

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MicIcon, MoveLeftIcon, MoveRightIcon, UploadCloudIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { CloningStepBar } from "@/components/cloning-step-bar";
import Link from "next/link";

const essay = [
    `The birch canoe slid on the smooth planks.
    Glue the sheet to the dark blue background.
    It's easy to tell the depth of a well.
    These days a chicken leg is a rare dish.
    Rice is often served in round bowls.
    The juice of lemons makes fine punch.
    The box was thrown beside the parked truck.
    The hogs were fed chopped corn and garbage.
    Four hours of steady work faced us.
    A large size in stockings is hard to sell.`,
    `The boy was there when the sun rose.
    A rod is used to catch pink salmon.
    The source of the huge river is the clear spring.
    Kick the ball straight and follow through.
    Help the woman get back to her feet.
    A pot of tea helps to pass the evening.
    Smoky fires lack flame and heat.
    The soft cushion broke the man's fall.
    The salt breeze came across from the sea.
    The girl at the booth sold fifty bonds.`,    
    `The small pup gnawed a hole in the sock.
    The fish twisted and turned on the bent hook.
    Press the pants and sew a button on the vest.
    The swan dive was far short of perfect.
    The beauty of the view stunned the young boy.
    Two blue fish swam in the tank.
    Her purse was full of useless trash.
    The colt reared and threw the tall rider.
    It snowed, rained, and hailed the same morning.
    Read verse out loud for pleasure.`,
    `Hoist the load to your left shoulder.
    Take the winding path to reach the lake.
    Note closely the size of the gas tank.
    Wipe the grease off his dirty face.
    Mend the coat before you go out.
    The wrist was badly strained and hung limp.
    The stray cat gave birth to kittens.
    The young girl gave no clear response.
    The meal was cooked before the bell rang.
    What joy there is in living.`,
    `A king ruled the state in the early days.
    The ship was torn apart on the sharp reef.
    Sickness kept him home the third week.
    The wide road shimmered in the hot sun.
    The lazy cow lay in the cool grass.
    Lift the square stone over the fence.
    The rope will bind the seven books at once.
    Hop over the fence and plunge in.
    The friendly gang left the drug store.
    Mesh wire keeps chicks inside.`,
    `The frosty air passed through the coat.
    The crooked maze failed to fool the mouse.
    Adding fast leads to wrong sums.
    The show was a flop from the very start.
    A saw is a tool used for making boards.
    The wagon moved on well oiled wheels.
    March the soldiers past the next hill.
    A cup of sugar makes sweet fudge.
    Place a rosebush near the porch steps.
    Both lost their lives in the raging storm.`
];

const CloningStep = () => {
    const [step, setStep] = useState(0);

  return (
    <div className="px-4 lg:px-8 flex justify-center">
        <div className="pt-2 flex flex-col items-center justify-center gap-2">
            <CloningStepBar title="Step 2: Speaking Part 2" totalSteps={essay.length} step={step} setStep={setStep} />
            <Card className="w-full lg:max-w-3xl bg-muted mb-4 text-xl">
                <CardHeader>
                    <CardTitle className="text-md text-muted-foreground">
                        Read the following text, and record yourself all the way to the last slide.
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        {
                            essay[step]
                        }
                    </div>
                </CardContent>
            </Card>
            <div className="w-full flex items-center justify-between">
                {step !== 0 ?
                <Button
                    disabled={step <= 0}
                    onClick={() => setStep(e => Math.max(0, e-1))}
                    className="gap-2 text-md"
                    variant="outline"
                >
                    <MoveLeftIcon />Go Back
                </Button>
                : <Link href="/clone/step-2-preview">
                    <Button 
                        className="text-md gap-2"
                        variant="outline"
                    >
                        <MoveLeftIcon />Step 2 Preview
                    </Button>
                </Link>}
                {step !== essay.length - 1 ?
                <Button
                    onClick={() => setStep(e => Math.min(essay.length - 1, e+1))}
                    className="gap-2 text-md"
                >
                    Continue<MoveRightIcon />
                </Button> 
                : <Link href="/clone/step-3-preview">
                    <Button className="text-md gap-2">
                        Step 3<MoveRightIcon />
                    </Button>
                </Link>}
            </div>
        </div>
    </div>
  )
}


export default CloningStep;