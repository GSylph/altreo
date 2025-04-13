import { NextResponse } from "next/server";

export async function GET() {
    const envVars = {
        mongodbUri: !!process.env.MONGODB_URI,
        authSecret: !!process.env.AUTH_SECRET,
        nextAuthUrl: !!process.env.NEXTAUTH_URL,
    };

    return NextResponse.json({
        message: "Environment check",
        environmentsLoaded: envVars,
    });
} 