import { packages } from "@/lib/packages";
import { SignUpButton, useAuth } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useState } from "react";

const PricingTable = () => {
    const { isSignedIn } = useAuth(); // useAuth for client-side
    const [isLoading, setLoading] = useState(false);

    const onPurchase = async ({ packKey }) => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe", { params: { packKey } });

            window.location.href = response.data.url;
        } catch (error) {
            toast("Something went wrong.");
            console.log(error, "STRIPE_CLIENT_ERROR");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="px-8 flex justify-center gap-4 flex-wrap">
            {packages.map((pack) => {
                return (
                    <Card key={pack.packKey} 
                        className={cn("w-[22rem] py-8 flex flex-col items-center justify-center \
                         gap-2 rounded-xl bg-white border-primary text-black shadow-2xl",
                        pack.packKey === "starter" ? 
                        "border-2" 
                        : "border-0")}
                    >
                        <CardTitle 
                            className={cn("px-4 py-2 text-2xl rounded-lg border-2",
                            pack.packKey === "starter" ? 
                            "border-primary/50 bg-white text-primary" 
                            : "border-black/25 text-white bg-primary/75")}
                        >
                            {pack.contents.label}
                        </CardTitle>
                        <CardContent>
                            <div 
                                className="text-5xl md:text-7xl text-center mt-4 mb-8"
                            >
                                ${pack.contents.price}
                            </div>
                            <div className="text-sm md:text-md text-center my-4">
                                {pack.contents.description}
                            </div>
                            <div className="text-md md:text-lg mt-4 mb-8">
                                <div className="flex gap-2">
                                    <Check color="#0c0"/>
                                    <div>
                                        <b>{pack.contents.songs}</b> Song Conversion{pack.contents.songs > 1 ? "s" : ""}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Check color="#0c0"/>
                                    <div>
                                        <b>{pack.contents.clones}</b> Voice Clone{pack.contents.clones > 1 ? "s" : ""}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Check color="#0c0"/>
                                    <div>
                                        Support available on Discord
                                    </div>
                                </div>
                            </div>
                            {isSignedIn ?
                                <Button 
                                    className="w-full text-2xl rounded-sm border-2 border-black py-6 hover:scale-105 transition"
                                    onClick={() => onPurchase({ packKey: pack.packKey })}
                                    disabled={isLoading}
                                >
                                    Buy Now
                                </Button>
                                : 
                                <SignUpButton mode="modal"
                                    redirectUrl={`${window.location.href}/#pricing-table`}
                                >
                                    <Button 
                                        className="w-full text-2xl rounded-sm border-2 border-black py-6 hover:scale-105 transition"
                                    >
                                        Buy Now
                                    </Button>
                                </SignUpButton>
                            }
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}

export default PricingTable;