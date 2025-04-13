import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protected routes - only accessible when authenticated
    const protectedPaths = [
        "/dashboard",
        "/challenges",
        "/simulator",
        "/achievements",
    ];

    // Public routes - always accessible
    const publicPaths = ["/", "/login", "/register", "/about", "/learn"];

    // Check if the path matches any protected route
    const isProtectedPath = protectedPaths.some(path =>
        pathname.startsWith(path) || pathname === path
    );

    // Get the auth cookie - check for both the HTTP-only server cookie and a possible client fallback cookie
    const authCookie = request.cookies.get("next-auth.session-token");
    console.log(`[Middleware] Checking auth for path: ${pathname}`);
    console.log(`[Middleware] Cookie exists: ${!!authCookie}`);

    const isAuthenticated = !!authCookie;

    console.log(`[Middleware] Path: ${pathname}, Protected: ${isProtectedPath}, Authenticated: ${isAuthenticated}`);

    // If trying to access a protected route while not authenticated, redirect to login
    if (isProtectedPath && !isAuthenticated) {
        console.log(`[Middleware] Redirecting to login from ${pathname}`);
        const redirectUrl = new URL("/login", request.url);
        // Store the original URL to redirect back after login
        redirectUrl.searchParams.set("callbackUrl", request.url);
        return NextResponse.redirect(redirectUrl);
    }

    // If logged in and trying to access login/register pages, redirect to dashboard
    if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
        console.log(`[Middleware] Redirecting to dashboard from ${pathname}`);
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

// Match all routes except for API routes, static files, etc.
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 