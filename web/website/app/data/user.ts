import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    } catch (error) {
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id,
            },
            include: {
                accounts: {
                    select: {
                        provider: true,
                    },
                },
            },
        });

        return user;
    } catch (error) {
        return null;
    }
};
