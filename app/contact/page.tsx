"use client";

import { Button } from "@/components/ui/button";
import { BsDiscord } from "react-icons/bs";

const ContactPage = async () => {
    return (
        <div className="h-full pt-40 md:pt-20 px-12 bg-[#163B8D]" >
            <div 
                className="w-fit py-16 md:py-32 md:px-16 lg:px-32 xl:px-64 rounded-xl mx-auto text-white 
                border-4 border-primary bg-primary shadow-xl
                flex flex-col items-center justify-center gap-4"
            >
                <div className="md:pt-4 px-4 text-2xl md:text-3xl md:text-5xl text-center font-bold">
                    Questions?
                </div>
                <div className="px-4 text-md md:text-xl text-center font-normal text-wrap">
                    Contact <i> support@instantsinger.com</i>,
                </div>
                <div className="md:pb-4 px-4 text-md md:text-xl text-center font-normal text-wrap">
                    or
                </div>
                <Button
                    className="text-xl md:text-2xl py-8 px-4 text-primary gap-2" 
                    variant="outline"
                    onClick={() => window.open("https://discord.com/invite/Z7RvN6JWky")}
                >
                    Join our Discord <BsDiscord />
                </Button>
            </div>
        </div>
    )
}

export default ContactPage;