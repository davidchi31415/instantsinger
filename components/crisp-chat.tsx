"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("66b846f0-d3b3-48ae-9c86-18ecb96d1073");
    }, []);

    return null;
}