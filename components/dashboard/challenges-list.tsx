"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { getChallenges } from "@/lib/actions/challenges";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Challenge {
    _id: string;
    title: string;
    description: string;
    xp: number;
    completion: number;
}

export default function ChallengesList() {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadChallenges() {
            try {
                const result = await getChallenges();
                if (result.success && result.data) {
                    setChallenges(result.data.slice(0, 3)); // Show only top 3 challenges
                }
            } catch (error) {
                console.error("Failed to load challenges:", error);
            } finally {
                setLoading(false);
            }
        }

        loadChallenges();
    }, []);

    if (loading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="bg-[#1E1E1E] border-[#2A2A2A] animate-pulse">
                        <CardContent className="p-4">
                            <div className="h-5 bg-[#2A2A2A] rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-[#2A2A2A] rounded w-full mb-4"></div>
                            <div className="h-2 bg-[#2A2A2A] rounded w-full"></div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (challenges.length === 0) {
        return (
            <Card className="bg-[#1E1E1E] border-[#2A2A2A]">
                <CardContent className="p-6 text-center">
                    <p className="text-gray-400">No challenges available yet.</p>
                    <p className="mt-2 text-sm text-gray-500">Check back soon for new content!</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {challenges.map((challenge) => (
                <Card key={challenge._id} className="bg-[#1E1E1E] border-[#2A2A2A] overflow-hidden">
                    <CardContent className="p-4">
                        <h3 className="font-semibold text-white mb-1">{challenge.title}</h3>
                        <p className="text-sm text-gray-400 mb-3 line-clamp-2">{challenge.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                            <span>{challenge.xp} XP</span>
                            <span>{challenge.completion}% Completion Rate</span>
                        </div>
                        <Progress value={challenge.completion} className="h-1 bg-[#2A2A2A]" />
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-end">
                        <Link href={`/challenges/${challenge._id}`}>
                            <Button variant="ghost" size="sm" className="text-[#F7931A] hover:text-[#F7931A] hover:bg-[#F7931A]/10">
                                Start Challenge <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            ))}

            <div className="mt-4 text-center">
                <Link href="/challenges">
                    <Button variant="outline" className="border-[#F7931A] text-[#F7931A] hover:bg-[#F7931A]/10">
                        View All Challenges
                    </Button>
                </Link>
            </div>
        </div>
    );
} 