import { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
    title: "Login - DeFi Trading Education Portal",
    description: "Login to access your DeFi Trading Education account",
};

export default function LoginPage() {
    return (
        <div className="container flex h-screen w-full flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Welcome back
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your credentials to sign in to your account
                    </p>
                </div>
                <LoginForm />
                <p className="px-8 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
} 