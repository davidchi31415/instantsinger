"use client";

import { Heading } from "@/components/heading";
import { UserProfile } from "@clerk/nextjs";
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";

const SettingsPage = () => {
    const [isMounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!isMounted) return null;

    return (
        <div>
            <Heading
                title="Settings"
                description="Manage account settings."
                icon={Settings}
                iconColor="text-gray-700"
                bgColor="bg-gray-700/10"
            />
            <div className="px-4 lg:px-8 space-y-4">
                <UserProfile appearance={{
                    elements: {
                        card: "shadow-none border-none",
                        rootBox: "border-none"
                    }
                }} />
            </div>
        </div>
    )
}

export default SettingsPage;