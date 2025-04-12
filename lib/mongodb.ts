import mongoose from 'mongoose';

// Check if we've already established a connection
let isConnected = false;

export default async function connectToDatabase() {
    if (isConnected) {
        return;
    }

    try {
        const uri = process.env.MONGODB_URI;

        if (!uri) {
            throw new Error('Please define the MONGODB_URI environment variable in .env.local');
        }

        await mongoose.connect(uri);
        isConnected = true;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
} 