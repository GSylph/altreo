import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        // Clear the session cookie
        cookies().delete("next-auth.session-token");

        return NextResponse.json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json(
            { success: false, error: "An error occurred during logout" },
            { status: 500 }
        );
    }
} 