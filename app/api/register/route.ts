import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/lib/actions/auth";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate the input
        const validationResult = registerSchema.safeParse(body);
        if (!validationResult.success) {
            console.error("Registration validation failed:", validationResult.error.errors);
            return NextResponse.json(
                {
                    success: false,
                    message: validationResult.error.errors[0].message
                },
                { status: 400 }
            );
        }

        const { username, email, password } = validationResult.data;
        console.log(`Registration attempt for: ${email}`);

        await connectToDatabase();

        // Check if user with this email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log(`User already exists with email: ${email}`);
            return NextResponse.json(
                { success: false, message: "User with this email already exists" },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            createdAt: new Date()
        });

        await newUser.save();
        console.log(`New user created with email: ${email}`);

        // Create session token
        const secretKey = process.env.AUTH_SECRET;
        if (!secretKey) {
            console.error("AUTH_SECRET environment variable not set");
            return NextResponse.json(
                { success: false, message: "Server configuration error" },
                { status: 500 }
            );
        }

        // Generate JWT
        const secret = new TextEncoder().encode(secretKey);
        const token = await new SignJWT({
            id: newUser._id.toString(),
            email: newUser.email,
            username: newUser.username,
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("7d")
            .sign(secret);

        // Set cookie
        cookies().set({
            name: "next-auth.session-token",
            value: token,
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            sameSite: "lax",
            domain: process.env.NODE_ENV === "production" ? undefined : "localhost"
        });

        console.log("Auth cookie set successfully after registration");

        return NextResponse.json({
            success: true,
            message: "Registration successful",
            token: token,
            user: {
                id: newUser._id.toString(),
                email: newUser.email,
                username: newUser.username
            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { success: false, message: "An error occurred during registration" },
            { status: 500 }
        );
    }
} 