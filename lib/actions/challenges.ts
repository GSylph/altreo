import { auth } from "@/auth";
import connectToDatabase from "../mongodb";
import Challenge from "../models/Challenge";
import User from "../models/User";
import { z } from "zod";

// Schema for challenge creation
export const challengeSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    xp: z.number().min(1, "XP must be at least 1"),
});

export type ChallengeFormData = z.infer<typeof challengeSchema>;

// Get all challenges
export async function getChallenges() {
    try {
        await connectToDatabase();
        const challenges = await Challenge.find({}).sort({ createdAt: -1 });
        return { success: true, data: challenges };
    } catch (error) {
        console.error("Failed to fetch challenges:", error);
        return { success: false, error: "Failed to fetch challenges" };
    }
}

// Get a single challenge by ID
export async function getChallengeById(id: string) {
    try {
        await connectToDatabase();
        const challenge = await Challenge.findById(id);

        if (!challenge) {
            return { success: false, error: "Challenge not found" };
        }

        return { success: true, data: challenge };
    } catch (error) {
        console.error(`Failed to fetch challenge ${id}:`, error);
        return { success: false, error: "Failed to fetch challenge" };
    }
}

// Create a new challenge (admin only in a real app)
export async function createChallenge(data: ChallengeFormData) {
    try {
        const validatedData = challengeSchema.parse(data);

        await connectToDatabase();

        const newChallenge = new Challenge({
            title: validatedData.title,
            description: validatedData.description,
            xp: validatedData.xp,
            completion: 0,
        });

        await newChallenge.save();

        return { success: true, data: newChallenge };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, error: error.errors[0].message };
        }

        console.error("Failed to create challenge:", error);
        return { success: false, error: "Failed to create challenge" };
    }
}

// Mark a challenge as completed for the current user
export async function completeChallenge(challengeId: string) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return { success: false, error: "You must be logged in" };
        }

        await connectToDatabase();

        // Check if challenge exists
        const challenge = await Challenge.findById(challengeId);
        if (!challenge) {
            return { success: false, error: "Challenge not found" };
        }

        // Update user's completed challenges if not already completed
        const user = await User.findById(session.user.id);
        if (!user) {
            return { success: false, error: "User not found" };
        }

        // Check if already completed
        if (user.challengesCompleted.includes(challengeId)) {
            return { success: false, error: "Challenge already completed" };
        }

        // Add to completed challenges
        user.challengesCompleted.push(challengeId);

        // Recalculate user's completion percentage
        const allChallenges = await Challenge.find({});
        const completionPercentage = (user.challengesCompleted.length / allChallenges.length) * 100;
        user.completion = Math.round(completionPercentage);

        await user.save();

        return { success: true, data: { completion: user.completion } };
    } catch (error) {
        console.error("Failed to complete challenge:", error);
        return { success: false, error: "Failed to complete challenge" };
    }
}

// Get user progress (completed challenges and completion percentage)
export async function getUserProgress() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return { success: false, error: "You must be logged in" };
        }

        await connectToDatabase();

        // Get user with populated challenges
        const user = await User.findById(session.user.id)
            .populate('challengesCompleted')
            .exec();

        if (!user) {
            return { success: false, error: "User not found" };
        }

        return {
            success: true,
            data: {
                completedChallenges: user.challengesCompleted,
                completion: user.completion
            }
        };
    } catch (error) {
        console.error("Failed to get user progress:", error);
        return { success: false, error: "Failed to get user progress" };
    }
} 