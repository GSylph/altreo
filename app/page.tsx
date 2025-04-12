import type React from "react"
import { ArrowRight, BarChart2, BookOpen, Shield, Trophy, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-[#121212] to-[#1E1E1E]">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-600">
              Learn DeFi Trading Through Interactive Challenges
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Master decentralized finance with hands-on experience, real-time simulations, and earn achievements as you
              progress.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500/10">
                View Challenges
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-6 bg-[#121212]">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-orange-500" />}
              title="Interactive Learning"
              description="Learn by doing with our step-by-step tutorials and interactive challenges designed for all skill levels."
            />
            <FeatureCard
              icon={<BarChart2 className="h-10 w-10 text-orange-500" />}
              title="Trading Simulator"
              description="Practice trading in a risk-free environment with our realistic DeFi trading simulator."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-orange-500" />}
              title="Secure Environment"
              description="Learn about security best practices and how to protect your assets in the DeFi ecosystem."
            />
            <FeatureCard
              icon={<Trophy className="h-10 w-10 text-orange-500" />}
              title="Earn Achievements"
              description="Collect NFT badges and achievements as you complete challenges and master new skills."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-orange-500" />}
              title="Community Driven"
              description="Join a community of traders and developers sharing knowledge and strategies."
            />
            <FeatureCard
              icon={<BarChart2 className="h-10 w-10 text-orange-500" />}
              title="Performance Analytics"
              description="Track your progress and trading performance with detailed analytics and insights."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 md:px-6 bg-[#1E1E1E]">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCard value="10,000+" label="Active Users" />
            <StatCard value="500+" label="Challenges" />
            <StatCard value="25,000+" label="Completed Lessons" />
            <StatCard value="$1.2M+" label="Virtual Assets Traded" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-[#1E1E1E] to-[#121212]">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your DeFi Journey?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of traders learning and mastering decentralized finance through our interactive platform.
          </p>
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
            Connect Wallet & Begin
          </Button>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="bg-[#1E1E1E] border-[#2A2A2A] card-hover">
      <CardContent className="pt-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </CardContent>
    </Card>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="animate-slide-up">
      <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  )
}
