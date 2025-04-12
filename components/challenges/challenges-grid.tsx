"use client";

import { useState } from "react";
import { IChallenge } from "@/lib/models/Challenge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, Target, Award, Clock, ChevronDown } from "lucide-react";
import Link from "next/link";
import { completeChallenge } from "@/lib/actions/challenges";
import { toast } from "sonner";

interface ChallengesGridProps {
    challenges: IChallenge[];
}

export default function ChallengesGrid({ challenges }: ChallengesGridProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedChallenge, setExpandedChallenge] = useState<string | null>(null);
    const [completingChallenge, setCompletingChallenge] = useState<string | null>(null);

    // Filter challenges based on search
    const filteredChallenges = challenges.filter((challenge) => {
        return (
            challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            challenge.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    // Handle challenge completion
    async function handleComplete(challengeId: string) {
        setCompletingChallenge(challengeId);

        try {
            const result = await completeChallenge(challengeId);

            if (result.success) {
                toast.success("Challenge completed! Your progress has been updated.");
            } else {
                toast.error(result.error || "Failed to complete challenge. Please try again.");
            }
        } catch (error) {
            console.error("Error completing challenge:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setCompletingChallenge(null);
        }
    }

    if (challenges.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-[#2E2E2E] mb-2">No challenges available yet</h3>
                <p className="text-muted-foreground mb-6">Check back soon for new learning opportunities.</p>
            </div>
        );
    }

    return (
        <div>
            {/* Search field */}
            <div className="mb-6">
                <div className="relative max-w-md mx-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search challenges..."
                        className="pl-10 bg-background border-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Challenge Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredChallenges.map((challenge) => (
                    <Collapsible
                        key={challenge._id}
                        open={expandedChallenge === challenge._id}
                        onOpenChange={() => {
                            setExpandedChallenge(expandedChallenge === challenge._id ? null : challenge._id);
                        }}
                    >
                        <Card className="bg-[#1E1E1E] border-[#2A2A2A] overflow-hidden">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle>{challenge.title}</CardTitle>
                                        <CardDescription>{challenge.description}</CardDescription>
                                    </div>
                                    <Badge className="bg-[#F7931A]">{challenge.xp} XP</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4">
                                    <div className="flex justify-between mb-1 text-sm">
                                        <span>Community Completion</span>
                                        <span>{challenge.completion}%</span>
                                    </div>
                                    <Progress value={challenge.completion} className="h-2 bg-[#2A2A2A]" />
                                </div>
                                <div className="flex justify-between text-sm text-gray-400">
                                    <div className="flex items-center">
                                        <Target className="h-4 w-4 mr-1 text-[#F7931A]" />
                                        {challenge.xp > 200 ? "Advanced" : challenge.xp > 100 ? "Intermediate" : "Beginner"}
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-1 text-[#F7931A]" />
                                        {Math.ceil(challenge.description.length / 100)} min
                                    </div>
                                    <div className="flex items-center">
                                        <Award className="h-4 w-4 mr-1 text-[#F7931A]" />
                                        Reward
                                    </div>
                                </div>
                                <CollapsibleTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full mt-4 text-[#F7931A] hover:text-[#F7931A] hover:bg-[#F7931A]/10"
                                    >
                                        {expandedChallenge === challenge._id ? "Show Less" : "Show More"}
                                        <ChevronDown
                                            className={`h-4 w-4 ml-2 transition-transform ${expandedChallenge === challenge._id ? "rotate-180" : ""
                                                }`}
                                        />
                                    </Button>
                                </CollapsibleTrigger>
                            </CardContent>
                            <CollapsibleContent>
                                <div className="px-6 py-2 border-t border-[#2A2A2A]">
                                    <div className="mb-4">
                                        <h4 className="font-medium mb-2">Description</h4>
                                        <p className="text-sm text-gray-400">{challenge.description}</p>
                                    </div>
                                    <div className="mb-4">
                                        <h4 className="font-medium mb-2">Reward</h4>
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-[#F7931A] flex items-center justify-center mr-3">
                                                <Award className="h-6 w-6 text-white" />
                                            </div>
                                            <span>DeFi {challenge.title.split(" ")[0]} Badge</span>
                                        </div>
                                    </div>
                                </div>
                            </CollapsibleContent>
                            <CardFooter>
                                <Button
                                    className="w-full bg-[#F7931A] hover:bg-[#E68502]"
                                    disabled={!!completingChallenge}
                                    onClick={() => handleComplete(challenge._id)}
                                >
                                    {completingChallenge === challenge._id
                                        ? "Completing..."
                                        : "Complete Challenge"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </Collapsible>
                ))}
            </div>

            {filteredChallenges.length === 0 && (
                <div className="text-center py-12">
                    <h3 className="text-xl font-semibold text-[#2E2E2E] mb-2">No matching challenges found</h3>
                    <p className="text-muted-foreground mb-6">Try adjusting your search term.</p>
                    <Button variant="outline" onClick={() => setSearchTerm("")}>
                        Clear Search
                    </Button>
                </div>
            )}
        </div>
    );
} 