import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

interface IncreaseCreditsProps {
    userId: string;
    convertDelta?: number;
    cloneDelta?: number;
}

export const updateCredits = async ({ userId, convertDelta=0, cloneDelta=0 }: IncreaseCreditsProps) => {
    if (!userId) {
        return false;
    }

    const user = await prismadb.userAccount.findUnique(
        {
            where: {
                userId
            }
        }
    );

    if (!user) {
        await prismadb.userAccount.create({
            data: { userId: userId, convertCredits: convertDelta }
        });
    } else {
        await prismadb.userAccount.update({
            where: { userId: userId },
            data: { cloneCredits: user.cloneCredits + cloneDelta, convertCredits: user.convertCredits + convertDelta }
        });
    }

    return true;
}

export const getCredits = async () => {
    const { userId } = auth();

    if (!userId) return { cloneCredits: 0, convertCredits: 0};

    const user = await prismadb.userAccount.findUnique({
        where: {
            userId
        }
    });

    if (!user) {
        try {
            await prismadb.userAccount.create({
                data: { userId }
            });
        } catch (e) {
            console.log("Error creating account in database; probably a synchronous request.");
        }
        return { cloneCredits: 0, convertCredits: 0};
    }

    const cloneCredits = user.cloneCredits;
    const convertCredits = user.convertCredits;

    return { cloneCredits, convertCredits };
}