"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, ChevronRight, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import ImmersiveAssistant from "./immersive-assistant"
import VirtualAssistantLoader from "./virtual-assistant-loader"

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
    image: "/courses/bitcoin-fundamentals.jpg",
    difficulty: "Beginner",
    duration: "4 weeks",
    modules: 6,
  },
  {
    id: "defi-explorer",
    title: "DeFi Explorer",
    description:
      "Dive into decentralized finance protocols, understand liquidity pools, yield farming, and how to evaluate DeFi opportunities.",
    image: "/courses/defi-explorer.jpg",
    difficulty: "Intermediate",
    duration: "6 weeks",
    modules: 8,
  },
  {
    id: "trading-mastery",
    title: "Crypto Trading Mastery",
    description:
      "Master the art of cryptocurrency trading with advanced technical analysis, risk management, and trading strategies.",
    image: "/courses/trading-mastery.jpg",
    difficulty: "Advanced",
    duration: "8 weeks",
    modules: 10,
  }
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
  const [currentMessage, setCurrentMessage] = useState("")

  // Calculate progress percentage
  const totalSteps = questions.length + 2 // Only count actual steps
  const progress = Math.round((currentStep / totalSteps) * 100)

  // Get recommended paths based on answers
  const recommendedPaths = currentStep === questions.length ? getRecommendedPaths(answers) : []

  // Handle answer selection
  const handleAnswerSelect = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }))
  }

  // Handle next step
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      // If we've completed 2 questions and it's not already an assistant step
      if ((currentStep + 1) % 3 === 2) {
        setCurrentStep(prev => prev + 1)
      } else {
        setCurrentStep(prev => prev + 1)
      }
    }
  }

  // Handle path selection
  const handlePathSelect = (pathId: string) => {
    setSelectedPath(pathId)
  }

  // Handle account creation
  const handleCreateAccount = async () => {
    setIsCreatingAccount(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    localStorage.setItem("userLearningPath", selectedPath || "")
    localStorage.setItem("userPreferences", JSON.stringify(answers))

    router.push("/dashboard")
  }

  // Get current message based on step
  useEffect(() => {
    let message = ""
    
    // Assistant appears every 2 questions (at steps 2, 5, 8, etc.)
    if (currentStep % 3 === 2 && currentStep < questions.length) {
      const completedQuestions = currentStep - Math.floor(currentStep / 3)
      message = `Great progress! You've completed ${completedQuestions} questions. Let's keep going!`
    } else if (currentStep === questions.length) {
      message = "Based on your answers, I've found some great learning paths for you! Take a look and choose one that interests you."
    } else if (currentStep === questions.length + 1) {
      message = "Great choice! Let's set up your learning account so you can start your journey."
    }

    setCurrentMessage(message)

    // Auto-advance after 3 seconds on assistant steps
    if (currentStep % 3 === 2 && currentStep < questions.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [currentStep])

  // Render the current step
  const renderStep = () => {
    // Assistant step (appears every 2 questions)
    if (currentStep % 3 === 2 && currentStep < questions.length) {
      return (
        <motion.div
          key={`assistant-${currentStep}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <CardContent className="py-8">
            <VirtualAssistantLoader
              message={currentMessage}
              mood="excited"
            />
          </CardContent>
        </motion.div>
      )
    }

    // Question step
    if (currentStep < questions.length && currentStep % 3 !== 2) {
      return (
        <motion.div
          key={`question-${questions[currentStep].id}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <CardContent className="pt-8 pb-6">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-orange-500 mb-2">
                {questions[currentStep].question}
              </h3>
              <p className="text-sm text-muted-foreground">
                Select the option that best describes you
              </p>
            </div>
            <RadioGroup
              value={answers[questions[currentStep].id] || ""}
              onValueChange={(value) => handleAnswerSelect(questions[currentStep].id, value)}
              className="space-y-4"
            >
              {questions[currentStep].options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-3 rounded-lg border p-5 cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleAnswerSelect(questions[currentStep].id, option.value)}
                >
                  <RadioGroupItem value={option.value} id={option.id} />
                  <Label htmlFor={option.id} className="flex-grow cursor-pointer text-base">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between py-6 px-8">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep((prev) => prev - 1)}
            >
              Back
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={!answers[questions[currentStep].id]} 
              className="gap-2"
            >
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
          <CardContent className="pt-8 pb-6">
            <VirtualAssistantLoader
              message={currentMessage}
              mood="excited"
            />
            <div className="mt-8">
              <div className="grid gap-6">
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
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-md overflow-hidden">
                        <img
                          src={path.image || "/placeholder.svg"}
                          alt={path.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
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
                        <p className="mt-2 text-sm text-muted-foreground">{path.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between py-6 px-8">
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
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 text-center"
        >
          <CardContent className="pt-8 pb-6">
            <VirtualAssistantLoader
              message={currentMessage}
              mood="happy"
            />
            <div className="mt-8">
              {isCreatingAccount ? (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Setting up your account...</h3>
                  <p className="text-sm text-muted-foreground">
                    We're personalizing your learning experience based on your preferences.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 w-full max-w-md mx-auto">
                  <p className="text-sm text-muted-foreground">
                    Click the button below to create your account and access your personalized learning path.
                  </p>
                  <Button onClick={handleCreateAccount} className="w-full" size="lg">
                    Create My Learning Account
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
          {!isCreatingAccount && (
            <CardFooter className="justify-center py-6">
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
          <div className="relative">
            <div className="h-2 w-full bg-gray-800 rounded-t-lg overflow-hidden">
              <motion.div
                className="h-full bg-orange-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
        </Card>
      </div>
    </div>
  )
}
