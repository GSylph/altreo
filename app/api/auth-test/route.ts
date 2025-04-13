import { NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";

export async function GET() {
    try {
        const results = {
            authSecretExists: false,
            authSecretLength: 0,
            canCreateToken: false,
            canVerifyToken: false,
            tokenPayload: null,
            error: null
        };

        // Check if AUTH_SECRET exists
        const secretKey = process.env.AUTH_SECRET;
        results.authSecretExists = !!secretKey;

        if (secretKey) {
            results.authSecretLength = secretKey.length;

            try {
                // Try to create a token
                const secret = new TextEncoder().encode(secretKey);
                const token = await new SignJWT({
                    test: true,
                    time: Date.now()
                })
                    .setProtectedHeader({ alg: "HS256" })
                    .setIssuedAt()
                    .setExpirationTime("1h")
                    .sign(secret);

                results.canCreateToken = true;

                // Try to verify the token
                const { payload } = await jwtVerify(token, secret);
                results.canVerifyToken = true;
                results.tokenPayload = payload;
            } catch (tokenError) {
                results.error = `Token error: ${tokenError.message}`;
            }
        } else {
            results.error = "AUTH_SECRET is not set in environment variables";
        }

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: `Error testing auth setup: ${error.message}`
        }, { status: 500 });
    }
} 