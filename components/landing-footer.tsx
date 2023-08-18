import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image"
import Link from "next/link";

const font = Montserrat({
    weight: "600",
    subsets: ["latin"]
});

export const LandingFooter = () => {
    return (
        <div className="px-4 lg:px-8 py-8">
            <div className="flex items-center justify-center gap-16">
                <div>2023 Instant Singer</div>
                <Link href="https://google.com">Privacy Policy</Link>
                <Link href="https://google.com">Terms of Service</Link>
            </div>
        </div>
    )
}