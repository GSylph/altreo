'use client';
import { Suspense } from "react";
import * as React from "react";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFormData, loginSchema } from "@/lib/actions/auth";
import { toast } from "sonner";

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: LoginFormData) {
        setIsLoading(true);

        try {
            // Use our custom login API
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include', // Important: include credentials to accept cookies
            });

            const result = await response.json();

            if (result.success) {
                toast.success("Login successful!");

                // If a token is returned, set it as a cookie on the client side as well
                // This is a backup in case the server-side cookie doesn't work
                if (result.token) {
                    // Set a backup client-side cookie
                    document.cookie = `next-auth.session-token=${result.token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
                    console.log("Client-side cookie set as backup");
                }

                // Wait a moment for cookies to be set properly
                setTimeout(() => {
                    // Redirect to the callback URL on successful login
                    router.push(callbackUrl);
                    router.refresh();
                }, 500);
            } else {
                toast.error(result.error || "Invalid login credentials. Please try again.");
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            toast.error("Invalid login credentials. Please try again.");
        }
    }

    async function handleOAuthSignIn(provider: "google" | "github") {
        setIsLoading(true);

        // Redirect to the OAuth provider
        const url = `/api/auth/signin/${provider}?callbackUrl=${encodeURIComponent(callbackUrl)}`;
        router.push(url);
    }

    return (
        <div className="grid gap-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="your.email@example.com"
                                        type="email"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        autoCorrect="off"
                                        disabled={isLoading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="••••••••"
                                        type="password"
                                        autoComplete="current-password"
                                        disabled={isLoading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="w-full bg-[#F7931A] hover:bg-[#E68502]" type="submit" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>
            </Form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    onClick={() => handleOAuthSignIn("github")}
                    disabled={isLoading}
                >
                    GitHub
                </Button>
                <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    onClick={() => handleOAuthSignIn("google")}
                    disabled={isLoading}
                >
                    Google
                </Button>
            </div>
        </div>
    );
} 