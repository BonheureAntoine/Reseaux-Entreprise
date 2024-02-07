import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function Home() {
    return (
        <>
            <header>
                <Image
                    src="/g80010.png"
                    alt="logo bolt"
                    className="absolute top-0 left-0 z-50 mt-10 ml-10"
                    width={200}
                    height={50}
                />
            </header>
            <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
                <div className="space-y-6 text-center">
                    <h1
                        className={cn(
                            "text-3xl font-semibold text-white drop-shadow-md mb-10",
                            font.className
                        )}
                    >
                        Belgium Online Learning and Training
                    </h1>
                    <div className="flex gap-5 justify-center items-center">
                        <LoginButton mode="redirect">
                            <Button variant="secondary" size="default">
                                Log in
                            </Button>
                        </LoginButton>
                        <Link href="/auth/register">
                            <Button variant="secondary" size="default">
                                Register
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
