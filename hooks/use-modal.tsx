import { create } from "zustand";

interface useProModalStore {
    type: "Pro"
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

interface useMicModalStore {
    type: "Mic"
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useProModal = create<useProModalStore>((set) => ({
    type: "Pro",
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));

export const useMicModal = create<useMicModalStore>((set) => ({
    type: "Mic",
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));