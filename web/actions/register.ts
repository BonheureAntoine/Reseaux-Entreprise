"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { generateVerificationToken } from "@/lib/tokens";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid Fields" };
    }
    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "Email already exists" };
    }

    await db.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    );

    return { success: "Comfirmation email sent!" };
};
