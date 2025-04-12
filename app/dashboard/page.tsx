"use client"

import { useEffect, useState } from "react"
import { BarChart, Trophy, ArrowUpRight, Clock, Target, Award, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useWallet } from "@/components/wallet-provider"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Dashboard() {
  const { isConnected } = useWallet()
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [chartData, setChartData] = useState<number[]>([])

  useEffect(() => {
    if (!isConnected) {
      router.push("/")
    }

    // Animate progress bars
    const timer = setTimeout(() => {
      setProgress(65)
    }, 300)

    // Generate random chart data
    setChartData([25, 36, 47, 43, 58, 76, 65, 72, 80, 74])

    return () => clearTimeout(timer)
  }, [isConnected, router])

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400">Track your progress and performance</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-orange-500 hover:bg-orange-600">Start New Challenge</Button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-[#1E1E1E] border-[#2A2A2A]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Current Level</CardTitle>
            <CardDescription>Intermediate Trader</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold">Level 7</div>
              <Badge className="bg-orange-500">+2 this month</Badge>
            </div>
            <Progress value={progress} className="h-2 bg-[#2A2A2A]" />
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              <span>Level 7</span>
              <span>Level 8</span>
            </div>
          </CardContent>
          <CardFooter className="text-sm text-gray-400">
            <div className="flex items-center">
              <Trophy className="h-4 w-4 mr-2 text-orange-500" />
              <span>3,500 XP needed for next level</span>
            </div>
          </CardFooter>
        </Card>

        <Card className="bg-[#1E1E1E] border-[#2A2A2A]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Challenges Completed</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">12 / 20</div>
              <Badge className="bg-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +4
              </Badge>
            </div>
            <Progress value={60} className="h-2 mt-4 bg-[#2A2A2A]" />
          </CardContent>
          <CardFooter className="text-sm text-gray-400">
            <div className="flex items-center">
              <Target className="h-4 w-4 mr-2 text-orange-500" />
              <span>8 challenges remaining this month</span>
            </div>
          </CardFooter>
        </Card>

        <Card className="bg-[#1E1E1E] border-[#2A2A2A]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Trading Performance</CardTitle>
            <CardDescription>Win/Loss Ratio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">68%</div>
              <Badge className="bg-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +5%
              </Badge>
            </div>
            <div className="flex justify-between mt-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-gray-400">Wins: 68%</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-gray-400">Losses: 32%</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="text-sm text-gray-400">
            <div className="flex items-center">
              <BarChart className="h-4 w-4 mr-2 text-orange-500" />
              <span>Better than 72% of traders</span>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Charts and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-[#1E1E1E] border-[#2A2A2A] lg:col-span-2">
          <CardHeader>
            <CardTitle>Trading Performance</CardTitle>
            <CardDescription>Last 10 simulated trades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-end justify-between">
              {chartData.map((value, i) => (
                <div key={i} className="relative h-full flex items-end">
                  <div
                    className={`w-8 rounded-t-sm ${value > chartData[i - 1] || i === 0 ? "bg-green-500" : "bg-red-500"}`}
                    style={{ height: `${value}%` }}
                  ></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-[#2A2A2A]">
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
            <CardDescription>Latest badges earned</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center mr-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-medium">First Trade</div>
                  <div className="text-sm text-gray-400">Completed your first trade</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                  <BarChart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-medium">Market Analyst</div>
                  <div className="text-sm text-gray-400">Analyzed 10 market trends</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center mr-4">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-medium">Winning Streak</div>
                  <div className="text-sm text-gray-400">5 profitable trades in a row</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-500/10">
              View All Achievements
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Current Challenges */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Current Challenges</h2>
          <Link href="/challenges" className="text-orange-500 hover:text-orange-600 flex items-center">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ChallengeCard
            title="DeFi Yield Farming"
            description="Learn how to maximize returns through yield farming strategies"
            progress={45}
            difficulty="Intermediate"
            timeLeft="2 days"
          />
          <ChallengeCard
            title="Trading with Leverage"
            description="Master the art of leveraged trading in decentralized exchanges"
            progress={20}
            difficulty="Advanced"
            timeLeft="5 days"
          />
          <ChallengeCard
            title="Liquidity Provision"
            description="Understand how to provide liquidity and earn fees"
            progress={75}
            difficulty="Beginner"
            timeLeft="1 day"
          />
        </div>
      </div>

      {/* Leaderboard */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Leaderboard</h2>
          <Link href="/leaderboard" className="text-orange-500 hover:text-orange-600 flex items-center">
            Full Leaderboard
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <Card className="bg-[#1E1E1E] border-[#2A2A2A]">
          <CardContent className="p-0">
            <div className="divide-y divide-[#2A2A2A]">
              {[
                { rank: 1, name: "Alex", points: 12500, avatar: "/placeholder.svg?height=40&width=40" },
                { rank: 2, name: "Jordan", points: 11200, avatar: "/placeholder.svg?height=40&width=40" },
                { rank: 3, name: "Taylor", points: 10800, avatar: "/placeholder.svg?height=40&width=40" },
                { rank: 4, name: "Casey", points: 9500, avatar: "/placeholder.svg?height=40&width=40" },
                { rank: 5, name: "Morgan", points: 9200, avatar: "/placeholder.svg?height=40&width=40" },
              ].map((user) => (
                <div key={user.rank} className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full mr-4 ${
                        user.rank === 1
                          ? "bg-yellow-500"
                          : user.rank === 2
                            ? "bg-gray-400"
                            : user.rank === 3
                              ? "bg-orange-700"
                              : "bg-[#2A2A2A]"
                      }`}
                    >
                      {user.rank}
                    </div>
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{user.name}</div>
                  </div>
                  <div className="font-bold">{user.points.toLocaleString()} pts</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ChallengeCard({
  title,
  description,
  progress,
  difficulty,
  timeLeft,
}: {
  title: string
  description: string
  progress: number
  difficulty: string
  timeLeft: string
}) {
  return (
    <Card className="bg-[#1E1E1E] border-[#2A2A2A] card-hover">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between mb-1 text-sm">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-[#2A2A2A]" />
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <div className="flex items-center">
            <Target className="h-4 w-4 mr-1 text-orange-500" />
            {difficulty}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-orange-500" />
            {timeLeft}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-orange-500 hover:bg-orange-600">Continue Challenge</Button>
      </CardFooter>
    </Card>
  )
}
