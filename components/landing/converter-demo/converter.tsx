"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

export const FakeConverterComponent = ({ onPlay }) => {
    return (
        <Card className="shadow-xl border-2">
            <CardHeader>
                <CardTitle>Convert a Song</CardTitle>
                <CardDescription>
                Pick any song. Hear it in your voice.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="mb-4 flex items-center gap-4">
                    <div>URL:</div>
                    <div className="w-[12rem] md:w-[16rem]">
                        <Input 
                            placeholder="ex: https://youtube.com/..."
                            value="https://www.youtube.com/watch?v=pbNs7tAUFkk&pp=ygULa2VzaGkgZHJ1bms%3D"
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div 
                    className="mx-auto w-fit shadow-xl"
                >
                <Button
                    onClick={onPlay}
                    size="lg" className="text-xl border-2 border-black"
                >
                    Convert
                </Button>
                </div>
            </CardFooter>
        </Card>
    )
}