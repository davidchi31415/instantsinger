import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

export const increaseAPILimit = async () => {
    const { userId } = auth();

    if (!userId) {
        return;
    }

    const userAPILimit = await prismadb.userAPILimit.findUnique(
        {
            where: {
                userId
            }
        }
    );

    if (userAPILimit) {
        await prismadb.userAPILimit.update({
            where: { userId: userId },
            data: { count: userAPILimit.count + 1 }
        });
    } else {
        await prismadb.userAPILimit.create({
            data: { userId: userId, count: 1 }
        });
    }
}

export const checkAPILimit = async () => {
    const { userId } = auth();

    if (!userId) return false;

    const userAPILimit = await prismadb.userAPILimit.findUnique({
        where: {
            userId
        }
    });

    if (!userAPILimit || userAPILimit.count < MAX_FREE_COUNTS) {
        return true;
    } else {
        return false;
    }
}

export const getAPILimitCount = async () =>{
    const { userId } = auth();

    if (!userId) return 0;

    const userAPILimit = await prismadb.userAPILimit.findUnique({
        where: {
            userId
        }
    });

    if (!userAPILimit) return 0;

    return userAPILimit.count;
}