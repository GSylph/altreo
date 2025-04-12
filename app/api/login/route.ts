import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/actions/auth";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

export async function POST(request: NextRequest) {
    try {
        // Parse the request body
        const body = await request.json();

        // Validate the input
        const validationResult = loginSchema.safeParse(body);
        if (!validationResult.success) {
            console.error("Login validation failed:", validationResult.error.errors);
            return NextResponse.json(
                {
                    success: false,
                    error: validationResult.error.errors[0].message
                },
                { status: 400 }
            );
        }

        const { email, password } = validationResult.data;
        console.log(`Login attempt for: ${email}`);

        // Connect to database
        await connectToDatabase();

        // Find user by email (without selecting password yet)
        const userExists = await User.findOne({ email }).select('_id');

        if (!userExists) {
            console.log(`User not found for email: ${email}`);
            return NextResponse.json(
                { success: false, error: "No account found with this email address" },
                { status: 401 }
            );
        }

        // Now get the user with password for verification
        const user = await User.findOne({ email }).select('+password');

        if (!user.password) {
            console.log(`User exists but has no password for email: ${email}`);
            return NextResponse.json(
                { success: false, error: "Account exists but cannot login with password" },
                { status: 401 }
            );
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log(`Invalid password for email: ${email}`);
            return NextResponse.json(
                { success: false, error: "Incorrect password" },
                { status: 401 }
            );
        }

        console.log(`Successful login for: ${email}`);

        // Create session token
        const secretKey = process.env.AUTH_SECRET;
        if (!secretKey) {
            console.error("AUTH_SECRET environment variable not set");
            return NextResponse.json(
                { success: false, error: "Server configuration error" },
                { status: 500 }
            );
        }

        const secret = new TextEncoder().encode(secretKey);
        const token = await new SignJWT({
            id: user._id.toString(),
            email: user.email,
            username: user.username,
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("7d")
            .sign(secret);

        // Set cookie with proper configuration
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

        console.log("Auth cookie set successfully");

        // Return success with user info (excluding password)
        return NextResponse.json({
            success: true,
            token: token,
            user: {
                id: user._id.toString(),
                email: user.email,
                username: user.username,
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { success: false, error: "An error occurred during login" },
            { status: 500 }
        );
    }
} 