"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, ChevronRight, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// Types for our component
type Question = {
  id: string
  question: string
  options: {
    id: string
    text: string
    value: string
  }[]
}

type LearningPath = {
  id: string
  title: string
  description: string
  image: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  modules: number
}

// Sample questions for the quiz
const questions: Question[] = [
  {
    id: "blockchain-knowledge",
    question: "How would you rate your knowledge of blockchain technology?",
    options: [
      { id: "bk-1", text: "I'm completely new to blockchain", value: "beginner" },
      { id: "bk-2", text: "I understand the basics", value: "intermediate" },
      { id: "bk-3", text: "I'm familiar with various blockchain platforms", value: "advanced" },
      { id: "bk-4", text: "I'm an expert/developer in the field", value: "expert" },
    ],
  },
  {
    id: "trading-experience",
    question: "What's your experience with trading (traditional or crypto)?",
    options: [
      { id: "te-1", text: "No experience at all", value: "none" },
      { id: "te-2", text: "Some casual trading", value: "casual" },
      { id: "te-3", text: "Regular trading experience", value: "regular" },
      { id: "te-4", text: "Professional trading background", value: "professional" },
    ],
  },
  {
    id: "defi-familiarity",
    question: "How familiar are you with DeFi concepts?",
    options: [
      { id: "df-1", text: "What is DeFi?", value: "none" },
      { id: "df-2", text: "I know the basics of DeFi", value: "basic" },
      { id: "df-3", text: "I've used some DeFi platforms", value: "intermediate" },
      { id: "df-4", text: "I'm very experienced with DeFi", value: "expert" },
    ],
  },
  {
    id: "learning-goal",
    question: "What's your primary goal for learning about decentralized trading?",
    options: [
      { id: "lg-1", text: "Personal interest and knowledge", value: "knowledge" },
      { id: "lg-2", text: "Making better investment decisions", value: "investment" },
      { id: "lg-3", text: "Building a career in the space", value: "career" },
      { id: "lg-4", text: "Creating my own DeFi project", value: "project" },
    ],
  },
  {
    id: "time-commitment",
    question: "How much time can you commit to learning each week?",
    options: [
      { id: "tc-1", text: "Less than 2 hours", value: "minimal" },
      { id: "tc-2", text: "2-5 hours", value: "moderate" },
      { id: "tc-3", text: "5-10 hours", value: "significant" },
      { id: "tc-4", text: "More than 10 hours", value: "extensive" },
    ],
  },
]

// Sample learning paths
const learningPaths: LearningPath[] = [
  {
    id: "blockchain-basics",
    title: "Blockchain Fundamentals",
    description:
      "Start your journey with the core concepts of blockchain technology, cryptocurrencies, and the basics of decentralized systems.",
    image: "/placeholder.svg?height=200&width=300",
    difficulty: "Beginner",
    duration: "4 weeks",
    modules: 6,
  },
  {
    id: "defi-explorer",
    title: "DeFi Explorer",
    description:
      "Dive into decentralized finance protocols, understand liquidity pools, yield farming, and how to evaluate DeFi opportunities.",
    image: "/placeholder.svg?height=200&width=300",
    difficulty: "Intermediate",
    duration: "6 weeks",
    modules: 8,
  },
]

// Function to determine recommended paths based on answers
const getRecommendedPaths = (answers: Record<string, string>): LearningPath[] => {
  // Return all learning paths
  return learningPaths
}

// Main component
export default function LearningPathDesigner() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [isCreatingAccount, setIsCreatingAccount] = useState(false)

  // Calculate progress percentage
  const totalSteps = questions.length + 2 // Questions + Recommendation + Account Creation
  const progress = Math.round((currentStep / totalSteps) * 100)

  // Get recommended paths based on answers
  const recommendedPaths = currentStep === questions.length ? getRecommendedPaths(answers) : []

  // Handle answer selection
  const handleAnswerSelect = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  // Handle next step
  const handleNext = () => {
    if (currentStep < questions.length + 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  // Handle path selection
  const handlePathSelect = (pathId: string) => {
    setSelectedPath(pathId)
  }

  // Handle account creation and redirect
  const handleCreateAccount = async () => {
    setIsCreatingAccount(true)

    // Simulate API call for account creation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Store user preferences in localStorage (in a real app, this would go to a database)
    localStorage.setItem("userLearningPath", selectedPath || "")
    localStorage.setItem("userPreferences", JSON.stringify(answers))

    // Redirect to dashboard
    router.push("/dashboard")
  }

  // Render the current step
  const renderStep = () => {
    // Questions step
    if (currentStep < questions.length) {
      const currentQuestion = questions[currentStep]
      return (
        <motion.div
          key={`question-${currentQuestion.id}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <CardHeader>
            <CardTitle className="text-2xl">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQuestion.id] || ""}
              onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleAnswerSelect(currentQuestion.id, option.value)}
                >
                  <RadioGroupItem value={option.value} id={option.id} />
                  <Label htmlFor={option.id} className="flex-grow cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="ghost"
              onClick={() => currentStep > 0 ? setCurrentStep((prev) => prev - 1) : router.push("/")}
            >
              Back
            </Button>
            <Button onClick={handleNext} disabled={!answers[currentQuestion.id]} className="gap-2">
              Next <ChevronRight size={16} />
            </Button>
          </CardFooter>
        </motion.div>
      )
    }

    // Path recommendation step
    if (currentStep === questions.length) {
      return (
        <motion.div
          key="recommendations"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <CardHeader>
            <CardTitle className="text-2xl">Recommended Learning Paths</CardTitle>
            <CardDescription>
              Based on your answers, we've selected the following learning paths for you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {recommendedPaths.map((path) => (
                <div
                  key={path.id}
                  className={`
                    relative rounded-lg border p-4 transition-all
                    ${selectedPath === path.id ? "ring-2 ring-primary" : "hover:border-primary cursor-pointer"}
                  `}
                  onClick={() => handlePathSelect(path.id)}
                >
                  {selectedPath === path.id && <CheckCircle className="absolute top-3 right-3 h-5 w-5 text-primary" />}
                  <div className="aspect-video w-full overflow-hidden rounded-md mb-4">
                    <img
                      src={path.image || "/placeholder.svg"}
                      alt={path.title}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{path.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      {path.difficulty}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                      {path.duration}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      {path.modules} modules
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{path.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" onClick={() => setCurrentStep((prev) => prev - 1)}>
              Back
            </Button>
            <Button onClick={handleNext} disabled={!selectedPath} className="gap-2">
              Continue <ChevronRight size={16} />
            </Button>
          </CardFooter>
        </motion.div>
      )
    }

    // Account creation step
    if (currentStep === questions.length + 1) {
      return (
        <motion.div
          key="account-creation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 text-center"
        >
          <CardHeader>
            <CardTitle className="text-2xl">Create Your Learning Account</CardTitle>
            <CardDescription>We're almost there! Let's set up your personalized learning dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="mb-6 rounded-full bg-primary/10 p-6">
              {isCreatingAccount ? (
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              ) : (
                <img src="/placeholder.svg?height=100&width=100" alt="Account creation" className="h-24 w-24" />
              )}
            </div>
            {isCreatingAccount ? (
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Setting up your account...</h3>
                <p className="text-sm text-muted-foreground">
                  We're personalizing your learning experience based on your preferences.
                </p>
              </div>
            ) : (
              <div className="space-y-4 w-full max-w-md">
                <p className="text-sm text-muted-foreground">
                  Click the button below to create your account and access your personalized learning path.
                </p>
                <Button onClick={handleCreateAccount} className="w-full" size="lg">
                  Create My Learning Account
                </Button>
              </div>
            )}
          </CardContent>
          {!isCreatingAccount && (
            <CardFooter className="justify-center">
              <Button variant="ghost" onClick={() => setCurrentStep((prev) => prev - 1)}>
                Back
              </Button>
            </CardFooter>
          )}
        </motion.div>
      )
    }

    return null
  }

  // Main render
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-2">Your Learning Path</h2>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            Step {currentStep + 1} of {totalSteps}
          </p>
        </div>

        <Card className="w-full">
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
        </Card>
      </div>
    </div>
  )
}
