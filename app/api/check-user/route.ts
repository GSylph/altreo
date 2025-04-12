import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { success: false, message: "Email is required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        // Find user by email but don't include password
        const user = await User.findOne({ email }).select('-password');

        if (user) {
            return NextResponse.json({
                success: true,
                exists: true,
                message: "User exists",
                email: user.email,
                username: user.username,
                id: user._id.toString()
            });
        } else {
            return NextResponse.json({
                success: true,
                exists: false,
                message: "User does not exist"
            });
        }
    } catch (error) {
        console.error("Check user error:", error);
        return NextResponse.json(
            { success: false, message: "An error occurred checking user" },
            { status: 500 }
        );
    }
} 