"use client";

import { useState, useEffect } from "react";
import { ProModal } from "./pro-modal";
import { MicModal } from "./mic-modal";

export const ModalProvider = () => {
    const [isMounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <ProModal />
            <MicModal />
        </>
    )
}