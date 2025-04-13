"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { RegisterFormData, registerSchema } from "@/lib/actions/auth";
import { toast } from "sonner";

export function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: RegisterFormData) {
        setIsLoading(true);

        try {
            // Call the API endpoint instead of the server action
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include', // Important: include credentials to accept cookies
            });

            const result = await response.json();

            if (result.success) {
                toast.success("Account created successfully!");

                // If a token is returned, set it as a cookie on the client side as well
                // This is a backup in case the server-side cookie doesn't work
                if (result.token) {
                    // Set a backup client-side cookie
                    document.cookie = `next-auth.session-token=${result.token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
                    console.log("Client-side cookie set as backup");
                }

                console.log("Registration successful, redirecting to dashboard");

                // Wait a moment for cookies to be set properly
                setTimeout(() => {
                    router.push("/dashboard");
                    router.refresh();
                }, 500);
            } else {
                toast.error(result.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="grid gap-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="johndoe"
                                        autoCapitalize="none"
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
                                        autoComplete="new-password"
                                        disabled={isLoading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="w-full bg-[#F7931A] hover:bg-[#E68502]" type="submit" disabled={isLoading}>
                        {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                </form>
            </Form>
        </div>
    );
} 