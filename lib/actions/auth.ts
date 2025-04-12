import { z } from "zod";
import { signIn } from "@/auth";
import connectToDatabase from "../mongodb";
import User from "../models/User";
import { redirect } from "next/navigation";

// Check if we're running on the client side
const isClient = typeof window !== 'undefined';

// Define validation schemas
export const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

// Login action
export async function login(data: LoginFormData, callbackUrl?: string) {
    try {
        const validatedData = loginSchema.parse(data);

        await signIn("credentials", {
            email: validatedData.email,
            password: validatedData.password,
            redirectTo: callbackUrl || "/dashboard",
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, error: error.errors[0].message };
        }

        return {
            success: false,
            error: "Invalid login credentials. Please check your email and password."
        };
    }
}

// Register action
export async function register(data: RegisterFormData) {
    // Prevent running on the client
    if (isClient) {
        console.error("Register function should only be called on the server");
        return {
            success: false,
            error: "This function must be called from the server"
        };
    }

    try {
        const validatedData = registerSchema.parse(data);

        console.log("Connecting to database...");
        await connectToDatabase();
        console.log("Connected to database successfully");

        // Make sure User model is available
        if (!User || typeof User.findOne !== 'function') {
            console.error("User model is not properly initialized");
            return {
                success: false,
                error: "Database connection issue. Please try again later."
            };
        }

        // Check if user with email already exists
        const existingUserEmail = await User.findOne({ email: validatedData.email });
        if (existingUserEmail) {
            return { success: false, error: "Email already in use" };
        }

        // Check if username is taken
        const existingUsername = await User.findOne({ username: validatedData.username });
        if (existingUsername) {
            return { success: false, error: "Username already taken" };
        }

        // Create new user
        const newUser = new User({
            username: validatedData.username,
            email: validatedData.email,
            password: validatedData.password,
            completion: 0,
            challengesCompleted: [],
        });

        await newUser.save();
        console.log("User registered successfully:", validatedData.email);

        return { success: true };
    } catch (error) {
        console.error("Registration error:", error);

        if (error instanceof z.ZodError) {
            return { success: false, error: error.errors[0].message };
        }

        return {
            success: false,
            error: "Registration failed. Please try again."
        };
    }
} 