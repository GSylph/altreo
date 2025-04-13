import { ServerConfig } from "next/server";

// This file can only be imported in server components
// or server action files

export const mongoConfig = {
    uri: process.env.MONGODB_URI,
    options: {
        bufferCommands: false,
    }
};

// Validate environment variables
export function validateMongoConfig() {
    if (!process.env.MONGODB_URI) {
        throw new Error(
            "Please define the MONGODB_URI environment variable in .env.local"
        );
    }
} 