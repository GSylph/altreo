import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify, errors as joseErrors } from "jose";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function GET(request: NextRequest) {
    try {
        // Get the session token from cookies
        const allCookies = cookies();
        console.log("[/api/me] All cookies:", Array.from(allCookies.getAll()).map(c => c.name));
        const token = allCookies.get("next-auth.session-token")?.value;

        if (!token) {
            console.log("[/api/me] No session token found in cookies");
            // Try to get it from the request headers in case it's being sent there
            const authHeader = request.headers.get('authorization');
            if (authHeader && authHeader.startsWith('Bearer ')) {
                console.log("[/api/me] Found token in Authorization header");
                // Handle token from authorization header if needed
            }
            return NextResponse.json(
                { authenticated: false, message: "Not authenticated" },
                { status: 401 }
            );
        }

        console.log("[/api/me] Session token found, verifying...");
        console.log("[/api/me] Token length:", token.length);

        // Verify the JWT token
        const secretKey = process.env.AUTH_SECRET;
        if (!secretKey) {
            console.error("[/api/me] AUTH_SECRET environment variable not set");
            return NextResponse.json(
                { authenticated: false, message: "Server configuration error" },
                { status: 500 }
            );
        }

        const secret = new TextEncoder().encode(secretKey);

        try {
            const { payload } = await jwtVerify(token, secret);
            console.log("[/api/me] Token verified successfully");
            console.log("[/api/me] Token payload:", JSON.stringify(payload, null, 2));

            // Connect to the database
            await connectToDatabase();

            // Fetch user from database (excluding password)
            const user = await User.findById(payload.id).select('-password');

            if (!user) {
                console.log(`[/api/me] User not found for ID: ${payload.id}`);
                return NextResponse.json(
                    { authenticated: false, message: "User not found" },
                    { status: 404 }
                );
            }

            console.log(`[/api/me] User authenticated: ${user.email}`);

            // Return authenticated status and user info
            return NextResponse.json({
                authenticated: true,
                user: {
                    id: user._id.toString(),
                    email: user.email,
                    username: user.username
                }
            });
        } catch (tokenError) {
            console.error("[/api/me] Token verification failed:", tokenError);

            // Provide more specific error messages based on the type of JWT error
            if (tokenError instanceof joseErrors.JWTExpired) {
                console.error("[/api/me] Token has expired");
                return NextResponse.json(
                    { authenticated: false, message: "Authentication expired, please login again" },
                    { status: 401 }
                );
            } else if (tokenError instanceof joseErrors.JWTInvalid) {
                console.error("[/api/me] Token is invalid");
                return NextResponse.json(
                    { authenticated: false, message: "Invalid authentication token" },
                    { status: 401 }
                );
            } else if (tokenError instanceof joseErrors.JWSSignatureVerificationFailed) {
                console.error("[/api/me] Token signature verification failed");
                return NextResponse.json(
                    { authenticated: false, message: "Invalid token signature" },
                    { status: 401 }
                );
            }

            return NextResponse.json(
                { authenticated: false, message: "Invalid token" },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error("[/api/me] Authentication error:", error);
        return NextResponse.json(
            { authenticated: false, message: "Authentication failed" },
            { status: 401 }
        );
    }
} 