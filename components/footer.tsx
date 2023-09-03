import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image"
import Link from "next/link";
import { Badge } from "./ui/badge";

const font = Montserrat({
    weight: "600",
    subsets: ["latin"]
});

export const Footer = () => {
    return (
        <div className="py-8 bg-primary text-white font-bold">
            <div className="px-4 lg:px-8 grid lg:grid-cols-2 gap-8">
                <div className="mx-auto lg:ml-16">
                    <div className="bg-white text-primary text-lg p-4 rounded-full w-fit flex border-4 border-[gold]">
                        www.InstantSinger.com
                    </div>
                </div>
                <div className="flex items-center justify-center text-center gap-8">
                    <Link href="/privacy">Privacy Policy</Link>
                    <Link href="/refund">Refund Policy</Link>
                    <Link href="/tos">Terms of Service</Link>
                </div>
            </div>
        </div>
    )
}