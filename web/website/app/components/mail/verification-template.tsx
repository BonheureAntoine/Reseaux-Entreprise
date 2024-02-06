import * as React from "react";

interface EmailVerificationTemplateProps {
    name: string;
    href: string;
}

export const EmailVerificationTemplate = ({
    name,
    href,
}: EmailVerificationTemplateProps) => (
    <div>
        <h1 className="text-2xl">Welcome {name}!</h1>
        <p className="text-md">
            Please verify your email by clicking the link{" "}
            <a href={href}>here</a>
        </p>
    </div>
);
