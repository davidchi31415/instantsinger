import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";

const font = Montserrat({
    weight: "600",
    subsets: ["latin"]
});

export const Footer = () => {
    return (
        <div className="py-8 bg-primary text-white font-bold">
            <div className="px-4 lg:px-8 grid lg:grid-cols-2 gap-8">
                <div className="mx-auto lg:ml-16">
                    <Link
                        href="/"
                        className="flex items-center gap-2"
                    >
                        <h1 className={cn("text-2xl font-bold hidden md:block", font.className)}>
                            <span className="text-white">instant</span>singer
                        </h1>
                    </Link>
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