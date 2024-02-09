import { EmailVerificationTemplate } from "@/components/mail/verification-template";
import { getUserByEmail } from "@/data/user";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: "noreply@martinhayot.com",
        to: email,
        subject: "Two Factor Authentication Code",
        html: `<p>Your Two Factor Authentication code : ${token}</p>`,
    });
};

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `https://www.bolt.mom/auth/new-verification?token=${token}`;

    const user = await getUserByEmail(email);

    await resend.emails.send({
        from: "noreply@martinhayot.com",
        to: email,
        subject: "Verify your email",
        react: EmailVerificationTemplate({
            name: user?.name || "",
            href: confirmLink,
        }),
    });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `https://www.bolt.mom/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "noreply@martinhayot.com",
        to: email,
        subject: "Reset your password",
        html: `Click <a href="${resetLink}">here</a> to reset your password`,
    });
};
