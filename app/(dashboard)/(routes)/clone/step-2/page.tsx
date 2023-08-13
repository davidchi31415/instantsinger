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
    Both lost their lives in the raging storm.`,
    `We talked of the side show in the circus.
    Use a pencil to write the first draft.
    He ran half way to the hardware store.
    The clock struck to mark the third period.
    A small creek cut across the field.
    Cars and busses stalled in snow drifts.
    The set of china hit the floor with a crash.
    This is a grand season for hikes on the road.
    The dune rose from the edge of the water.
    Those words were the cue for the actor to leave.`,
    `A yacht slid around the point into the bay.
    The two met while playing on the sand.
    The ink stain dried on the finished page.
    The walled town was seized without a fight.
    The lease ran out in sixteen weeks.
    A tame squirrel makes a nice pet.
    The horn of the car woke the sleeping cop.
    The heart beat strongly and with firm strokes.
    The pearl was worn in a thin silver ring.
    The fruit peel was cut in thick slices.`,
    `The Navy attacked the big task force.
    See the cat glaring at the scared mouse.
    There are more than two factors here.
    The hat brim was wide and too droopy.
    The lawyer tried to lose his case.
    The grass curled around the fence post.
    Cut the pie into large parts.
    Men strive but seldom get rich.
    Always close the barn door tight.
    He lay prone and hardly moved a limb.`,
    `The slush lay deep along the street.
    A wisp of cloud hung in the blue air.
    A pound of sugar costs more than eggs.
    The fin was sharp and cut the clear water.
    The play seems dull and quite stupid.
    Bail the boat to stop it from sinking.
    The term ended in late June that year.
    A tusk is used to make costly gifts.
    Ten pins were set in order.
    The bill was paid every third week.`,
    `Oak is strong and also gives shade.
    Cats and dogs each hate the other.
    The pipe began to rust while new.
    Open the crate but don't break the glass.
    Add the sum to the product of these three.
    Thieves who rob friends deserve jail.
    The ripe taste of cheese improves with age.
    Act on these orders with great speed.
    The hog crawled under the high fence.
    Move the vat over the hot fire.`,
    `The bark of the pine tree was shiny and dark.
    Leaves turn brown and yellow in the fall.
    The pennant waved when the wind blew.
    Split the log with a quick, sharp blow.
    Burn peat after the logs give out.
    He ordered peach pie with ice cream.
    Weave the carpet on the right hand side.
    Hemp is a weed found in parts of the tropics.
    A lame back kept his score low.
    We find joy in the simplest things.`
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