import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

// Secret for JWT
const secret = process.env.AUTH_SECRET || "";

// Get session from cookies
export async function getSession() {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("next-auth.session-token")?.value;

        if (!token) {
            return null;
        }

        // Decode the token to get session data
        const decoded = await decode({
            token,
            secret,
        });

        if (!decoded) {
            return null;
        }

        return {
            user: {
                id: decoded.sub as string,
                email: decoded.email as string,
                name: decoded.name as string,
            },
        };
    } catch (error) {
        console.error("Error getting session:", error);
        return null;
    }
}

// Check if user is authenticated
export async function isAuthenticated() {
    const session = await getSession();
    return !!session?.user;
} 