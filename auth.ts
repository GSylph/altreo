import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth";

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

// Add a comment to indicate that this file should only be used on the server side
// for operations that need direct DB access
export const serverAuth = auth; 