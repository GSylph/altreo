"use client";

import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getChallenges } from "@/lib/actions/challenges";
import ChallengesGrid from "@/components/challenges/challenges-grid";

import { useState, useEffect } from "react"
import { Search, Clock, Target, Award, ChevronDown, CheckCircle2, Image as ImageIcon, BookOpen, RefreshCw, Trash2, RotateCcw } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { challenges } from "@/data/challenges"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const challengesData = [
  {
    id: 1,
    title: "DeFi Basics",
    description: "Learn the fundamentals of decentralized finance",
    longDescription:
      "This challenge will introduce you to the core concepts of DeFi, including liquidity pools, yield farming, and automated market makers. You'll learn how these systems work and how to interact with them safely.",
    difficulty: "Beginner",
    time: "2 hours",
    reward: "DeFi Explorer Badge",
    status: "Completed",
    progress: 100,
    category: "Education",
  },
  {
    id: 2,
    title: "Yield Farming Strategies",
    description: "Maximize returns through strategic yield farming",
    longDescription:
      "Dive deep into yield farming strategies across multiple protocols. Learn how to evaluate APY, assess risks, and optimize your capital allocation for maximum returns while minimizing impermanent loss.",
    difficulty: "Intermediate",
    time: "4 hours",
    reward: "Yield Farmer Badge",
    status: "In Progress",
    progress: 45,
    category: "Strategy",
  },
  {
    id: 3,
    title: "Trading with Leverage",
    description: "Master leveraged trading on decentralized exchanges",
    longDescription:
      "This advanced challenge teaches you how to use leverage responsibly in DeFi trading. Learn about liquidation risks, funding rates, and how to set up stop losses to protect your capital.",
    difficulty: "Advanced",
    time: "6 hours",
    reward: "Power Trader Badge",
    status: "Not Started",
    progress: 0,
    category: "Trading",
  },
  {
    id: 4,
    title: "Liquidity Provision",
    description: "Learn to provide liquidity and earn fees",
    longDescription:
      "Understand how to become a liquidity provider on various DEXs. This challenge covers impermanent loss, fee structures, and how to select the right pools for your risk tolerance.",
    difficulty: "Beginner",
    time: "3 hours",
    reward: "Liquidity Provider Badge",
    status: "In Progress",
    progress: 75,
    category: "Earning",
  },
  {
    id: 5,
    title: "Flash Loans",
    description: "Understand and execute flash loans",
    longDescription:
      "Explore the world of flash loans - uncollateralized loans that must be repaid within the same transaction block. Learn how they work and how to use them for arbitrage, collateral swaps, and more.",
    difficulty: "Advanced",
    time: "5 hours",
    reward: "Flash Master Badge",
    status: "Not Started",
    progress: 0,
    category: "Advanced",
  },
  {
    id: 6,
    title: "NFT Trading Strategies",
    description: "Learn to analyze and trade NFT markets",
    longDescription:
      "Develop strategies for trading in NFT marketplaces. This challenge covers valuation methods, market trends analysis, and techniques for identifying promising projects early.",
    difficulty: "Intermediate",
    time: "4 hours",
    reward: "NFT Trader Badge",
    status: "Not Started",
    progress: 0,
    category: "NFTs",
  },
  {
    id: 7,
    title: "DAO Governance",
    description: "Participate in decentralized governance",
    longDescription:
      "Learn how to participate effectively in DAO governance. This challenge covers proposal creation, voting strategies, and how to analyze the potential impact of governance decisions.",
    difficulty: "Intermediate",
    time: "3 hours",
    reward: "Governance Participant Badge",
    status: "Not Started",
    progress: 0,
    category: "Governance",
  },
  {
    id: 8,
    title: "Arbitrage Opportunities",
    description: "Identify and execute arbitrage trades",
    longDescription:
      "Master the art of finding and executing arbitrage opportunities across different DEXs. Learn how to calculate price differences, account for gas costs, and execute trades efficiently.",
    difficulty: "Advanced",
    time: "5 hours",
    reward: "Arbitrage Expert Badge",
    status: "Not Started",
    progress: 0,
    category: "Trading",
  },
  {
    id: 9,
    title: "Stablecoin Strategies",
    description: "Optimize stablecoin yields and minimize risks",
    longDescription:
      "Explore different stablecoin protocols and yield strategies. Learn about the risks and benefits of various stablecoins and how to maximize returns while maintaining stability.",
    difficulty: "Beginner",
    time: "2 hours",
    reward: "Stability Seeker Badge",
    status: "Completed",
    progress: 100,
    category: "Strategy",
  },
]

export default function ChallengesPage() {
  const [localChallenges, setLocalChallenges] = useState(challenges)
  const [moduleProgress, setModuleProgress] = useState<Record<string, { completedModules: number[], isCompleted: boolean }>>({})

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('moduleProgress')
    const savedChallenges = localStorage.getItem('challenges')

    if (savedProgress) {
      setModuleProgress(JSON.parse(savedProgress))
    }

    if (savedChallenges) {
      const savedData = JSON.parse(savedChallenges)
      const updatedChallenges = challenges.map(challenge => ({
        ...challenge,
        completed: savedData.find((saved: any) => saved.id === challenge.id)?.completed || false
      }))
      setLocalChallenges(updatedChallenges)
    } else {
      localStorage.setItem('challenges', JSON.stringify(challenges))
    }
  }, [])

  const resetAllProgress = () => {
    setModuleProgress({})
    localStorage.removeItem('moduleProgress')
    const resetChallenges = challenges.map(challenge => ({
      ...challenge,
      completed: false
    }))
    setLocalChallenges(resetChallenges)
    localStorage.setItem('challenges', JSON.stringify(resetChallenges))
  }

  const completeAllChallenges = () => {
    const completedChallenges = challenges.map(challenge => ({
      ...challenge,
      completed: true
    }))
    setLocalChallenges(completedChallenges)
    localStorage.setItem('challenges', JSON.stringify(completedChallenges))

    // Complete all modules for each challenge
    const allProgress: Record<string, { completedModules: number[], isCompleted: boolean }> = {}
    challenges.forEach(challenge => {
      allProgress[challenge.id] = {
        completedModules: Array.from({ length: challenge.content.length }, (_, i) => i),
        isCompleted: true
      }
    })
    setModuleProgress(allProgress)
    localStorage.setItem('moduleProgress', JSON.stringify(allProgress))
  }

  const resetSpecificChallenge = (challengeId: string) => {
    // Reset specific challenge progress
    const updatedProgress = { ...moduleProgress }
    delete updatedProgress[challengeId]
    setModuleProgress(updatedProgress)
    localStorage.setItem('moduleProgress', JSON.stringify(updatedProgress))

    // Reset challenge completion status
    const updatedChallenges = localChallenges.map(challenge =>
      challenge.id === challengeId ? { ...challenge, completed: false } : challenge
    )
    setLocalChallenges(updatedChallenges)
    localStorage.setItem('challenges', JSON.stringify(updatedChallenges))
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Challenges</h1>
            <p className="text-muted-foreground">
              Complete challenges to earn rewards and level up your skills
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Manage Progress
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={resetAllProgress} className="gap-2 text-destructive">
                <Trash2 className="h-4 w-4" />
                Reset All Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={completeAllChallenges} className="gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Complete All
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {localChallenges.map((challenge) => {
            const progress = moduleProgress[challenge.id] || { completedModules: [], isCompleted: false }
            const completedModulesCount = progress.completedModules.length
            const progressPercentage = (completedModulesCount / challenge.content.length) * 100

            return (
              <div
                key={challenge.id}
                className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden transition-all transform hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="relative h-48">
                  <Image
                    src={challenge.image}
                    alt={challenge.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{challenge.title}</h2>
                    <Badge variant={challenge.difficulty as any}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{challenge.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>{challenge.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen className="h-4 w-4" />
                      <span>{challenge.content.length} modules</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span>{completedModulesCount} of {challenge.content.length} modules completed</span>
                      {progress.isCompleted && (
                        <Badge variant="secondary" className="bg-green-600 text-white hover:bg-green-700 gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link href={`/challenges/${challenge.slug}`}>
                        {progress.isCompleted ? "View Challenge" : "Start Challenge"}
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => resetSpecificChallenge(challenge.id)}
                      className="shrink-0"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
