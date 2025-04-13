"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DashboardStatsProps {
    completion: number;
    completedChallenges: number;
}

export default function DashboardStats({ completion, completedChallenges }: DashboardStatsProps) {
    return (
        <div className="space-y-6">
            <Card className="bg-[#1E1E1E] border-[#2A2A2A]">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Learning Progress</CardTitle>
                    <CardDescription>Your current completion rate</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-2xl font-bold">{completion}%</div>
                        <Badge className="bg-[#F7931A]">
                            {completion >= 50 ? "Advanced" : completion >= 25 ? "Intermediate" : "Beginner"}
                        </Badge>
                    </div>
                    <Progress value={completion} className="h-2 bg-[#2A2A2A]" />
                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                    </div>
                </CardContent>
                <CardFooter className="text-sm text-gray-400">
                    <div className="flex items-center">
                        <Trophy className="h-4 w-4 mr-2 text-[#F7931A]" />
                        <span>{100 - completion}% to complete your education</span>
                    </div>
                </CardFooter>
            </Card>

            <Card className="bg-[#1E1E1E] border-[#2A2A2A]">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Challenges Completed</CardTitle>
                    <CardDescription>Your learning achievements</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">{completedChallenges}</div>
                        <Badge className="bg-[#F7931A]">
                            {completedChallenges >= 10 ? "Advanced" : completedChallenges >= 5 ? "Intermediate" : "Beginner"}
                        </Badge>
                    </div>
                </CardContent>
                <CardFooter className="text-sm text-gray-400">
                    <div className="flex items-center">
                        <Target className="h-4 w-4 mr-2 text-[#F7931A]" />
                        <span>Keep going to earn more achievements</span>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
} 