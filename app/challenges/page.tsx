"use client"

import { useState } from "react"
import { Search, Clock, Target, Award, ChevronDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Sample challenge data
const challenges = [
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

export default function Challenges() {
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [expandedChallenge, setExpandedChallenge] = useState<number | null>(null)

  // Filter challenges based on search and filters
  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDifficulty =
      difficultyFilter === "all" || challenge.difficulty.toLowerCase() === difficultyFilter.toLowerCase()

    const matchesStatus =
      statusFilter === "all" || challenge.status.toLowerCase().replace(" ", "-") === statusFilter.toLowerCase()

    const matchesCategory =
      categoryFilter === "all" || challenge.category.toLowerCase() === categoryFilter.toLowerCase()

    return matchesSearch && matchesDifficulty && matchesStatus && matchesCategory
  })

  // Get unique categories for filter
  const categories = Array.from(new Set(challenges.map((challenge) => challenge.category)))

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Trading Challenges</h1>
          <p className="text-gray-400">Master DeFi trading through interactive challenges</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search challenges..."
                className="pl-10 bg-[#121212] border-[#2A2A2A]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="bg-[#121212] border-[#2A2A2A]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-[#121212] border-[#2A2A2A]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="bg-[#121212] border-[#2A2A2A]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Challenge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => (
          <Collapsible
            key={challenge.id}
            open={expandedChallenge === challenge.id}
            onOpenChange={() => {
              setExpandedChallenge(expandedChallenge === challenge.id ? null : challenge.id)
            }}
          >
            <Card className="bg-[#1E1E1E] border-[#2A2A2A] card-hover">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{challenge.title}</CardTitle>
                    <CardDescription>{challenge.description}</CardDescription>
                  </div>
                  <Badge
                    className={`${
                      challenge.status === "Completed"
                        ? "bg-green-600"
                        : challenge.status === "In Progress"
                          ? "bg-orange-500"
                          : "bg-gray-600"
                    }`}
                  >
                    {challenge.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Progress</span>
                    <span>{challenge.progress}%</span>
                  </div>
                  <Progress value={challenge.progress} className="h-2 bg-[#2A2A2A]" />
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <div className="flex items-center">
                    <Target className="h-4 w-4 mr-1 text-orange-500" />
                    {challenge.difficulty}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-orange-500" />
                    {challenge.time}
                  </div>
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-1 text-orange-500" />
                    Reward
                  </div>
                </div>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-4 text-orange-500 hover:text-orange-600 hover:bg-orange-500/10"
                  >
                    {expandedChallenge === challenge.id ? "Show Less" : "Show More"}
                    <ChevronDown
                      className={`h-4 w-4 ml-2 transition-transform ${expandedChallenge === challenge.id ? "rotate-180" : ""}`}
                    />
                  </Button>
                </CollapsibleTrigger>
              </CardContent>
              <CollapsibleContent>
                <div className="px-6 py-2 border-t border-[#2A2A2A]">
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-gray-400">{challenge.longDescription}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Reward</h4>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <span>{challenge.reward}</span>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    challenge.status === "Completed"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-orange-500 hover:bg-orange-600"
                  }`}
                >
                  {challenge.status === "Completed"
                    ? "View Completion"
                    : challenge.status === "In Progress"
                      ? "Continue Challenge"
                      : "Start Challenge"}
                </Button>
              </CardFooter>
            </Card>
          </Collapsible>
        ))}
      </div>
    </div>
  )
}
