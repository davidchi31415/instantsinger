"use client";

import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface SubscriptionButtonProps {
    isPro: boolean;
}

export const SubscriptionButton = ({isPro = false}: SubscriptionButtonProps) => {
    const [isLoading, setLoading] = useState(false);

    const onClick = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe");
            
            window.location.href = response.data.url; 
        } catch (error) {
            toast("Something went wrong.");
            console.log("[BILLING_ERROR]", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button 
            disabled={isLoading} variant={isPro ? "default" : "premium"} 
            onClick={onClick}
            className="text-white"
        >
            {isPro ? "Manage Subscription" : "Upgrade"}
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
        </Button>
    )
}