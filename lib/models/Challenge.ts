import mongoose, { Schema, Document, Model } from 'mongoose';

// Check if we're running on the client side
const isClient = typeof window !== 'undefined';

export interface IChallenge extends Document {
    title: string;
    description: string;
    xp: number;
    completion: number;
    createdAt: Date;
    updatedAt: Date;
}

// Only define the schema if we're on the server
const ChallengeSchema = new Schema<IChallenge>(
    {
        title: {
            type: String,
            required: [true, 'Please provide a title'],
            trim: true,
            maxlength: [100, 'Title cannot be more than 100 characters'],
        },
        description: {
            type: String,
            required: [true, 'Please provide a description'],
            trim: true,
        },
        xp: {
            type: Number,
            required: [true, 'Please provide XP value'],
            min: [1, 'XP must be at least 1'],
        },
        completion: {
            type: Number,
            default: 0,
            min: [0, 'Completion cannot be less than 0'],
            max: [100, 'Completion cannot be more than 100'],
        },
    },
    { timestamps: true }
);

// Safely handle model initialization
let Challenge: Model<IChallenge>;

// Only try to access the model on the server
if (!isClient) {
    // Use the special 'mongoose.models' property safely with type checking
    if (mongoose.models && mongoose.models.Challenge) {
        Challenge = mongoose.models.Challenge as Model<IChallenge>;
    } else if (mongoose.model) {
        // Create the model if it doesn't exist
        Challenge = mongoose.model<IChallenge>('Challenge', ChallengeSchema);
    } else {
        // Fallback for SSR and other edge cases
        console.error('Mongoose is not fully initialized');
        // Create a placeholder to prevent crashes
        Challenge = {} as Model<IChallenge>;
    }
} else {
    // Create a placeholder model for client-side
    Challenge = {} as Model<IChallenge>;
}

export default Challenge; 