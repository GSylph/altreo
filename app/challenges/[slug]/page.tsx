"use client"

import { useState, use, useEffect } from "react"
import { challenges } from "@/data/challenges"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Clock, BookOpen, ArrowRight } from "lucide-react"
import Image from "next/image"
import ChallengeContent from "@/components/challenge-content"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface ChallengePageProps {
  params: Promise<{
    slug: string
  }>
}

interface ModuleProgress {
  [key: string]: {
    completedModules: number[]
    isCompleted: boolean
  }
}

export default function ChallengePage(props: ChallengePageProps) {
  const params = use(props.params)
  const [currentModule, setCurrentModule] = useState(0)
  const [moduleProgress, setModuleProgress] = useState<ModuleProgress>({})
  const [localChallenges, setLocalChallenges] = useState(challenges)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizError, setQuizError] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState(false)

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

  const challenge = localChallenges.find((c) => c.slug === params.slug)
  if (!challenge) return null

  const challengeProgress = moduleProgress[challenge.id] || { completedModules: [], isCompleted: false }
  const completedModulesCount = challengeProgress.completedModules.length
  const progressPercentage = (completedModulesCount / challenge.content.length) * 100

  const currentContent = challenge.content[currentModule]
  const isQuiz = currentContent.type === 'quiz'

  const handleQuizSubmit = () => {
    if (!isQuiz || selectedAnswer === null) return

    const question = currentContent.content[0] // Get the first question
    if (selectedAnswer === question.correctAnswer) {
      setIsCorrect(true)
      setQuizError(null)
      toast.success("Correct answer!")
    } else {
      setQuizError("Incorrect answer. Please try again!")
      toast.error("Incorrect answer. Please try again!")
    }
  }

  const handleNextModule = () => {
    completeCurrentModule()
    setSelectedAnswer(null)
    setQuizError(null)
    setIsCorrect(false)
  }

  const completeCurrentModule = () => {
    if (!challenge) return

    setModuleProgress(prev => {
      const challengeProgress = prev[challenge.id] || { completedModules: [], isCompleted: false }
      const updatedModules = Array.from(new Set([...challengeProgress.completedModules, currentModule]))
      const isCompleted = updatedModules.length === challenge.content.length

      if (isCompleted) {
        const updatedChallenges = localChallenges.map(c => 
          c.id === challenge.id ? { ...c, completed: true } : c
        )
        setLocalChallenges(updatedChallenges)
        localStorage.setItem('challenges', JSON.stringify(updatedChallenges))
      }

      const newProgress = {
        ...prev,
        [challenge.id]: {
          completedModules: updatedModules,
          isCompleted
        }
      }
      localStorage.setItem('moduleProgress', JSON.stringify(newProgress))

      // Move to next module if available
      if (currentModule < challenge.content.length - 1) {
        setCurrentModule(currentModule + 1)
      }

      return newProgress
    })
  }

  const renderQuiz = () => {
    if (!isQuiz) return null

    const question = currentContent.content[0] // Get the first question
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">{question.question}</h3>
        <RadioGroup
          value={selectedAnswer?.toString()}
          onValueChange={(value) => {
            setSelectedAnswer(parseInt(value))
            setQuizError(null) // Clear error when user selects a new answer
            setIsCorrect(false) // Reset correct state when changing answer
          }}
          className="space-y-3"
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
        {quizError && (
          <div className="text-destructive text-sm mt-2">
            {quizError}
          </div>
        )}
        {isCorrect && (
          <div className="text-green-600 text-sm mt-2">
            Correct answer! You can proceed to the next module.
          </div>
        )}
        <div className="flex justify-end gap-2">
          <Button 
            onClick={() => {
              setSelectedAnswer(null)
              setQuizError(null)
              setIsCorrect(false)
            }}
            variant="outline"
          >
            Clear Selection
          </Button>
          {isCorrect ? (
            <Button 
              onClick={handleNextModule}
              className="gap-2"
            >
              Next Module
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={handleQuizSubmit}
              disabled={selectedAnswer === null}
            >
              Submit Answer
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-6 lg:grid-cols-[300px_1fr] lg:gap-12">
        {/* Left Sidebar */}
        <div className="space-y-6">
          {/* Progress Card */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">{challenge.title}</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>{challenge.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="h-4 w-4" />
                <span>{completedModulesCount} of {challenge.content.length} modules completed</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              {challengeProgress.isCompleted && (
                <Badge variant="success" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Challenge Completed
                </Badge>
              )}
            </div>
          </div>

          {/* Module Navigation */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Modules</h3>
            </div>
            <div className="p-2">
              {challenge.content.map((section, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentModule(index)}
                  className={`w-full text-left p-3 rounded-lg transition-all transform hover:scale-[1.02] ${
                    currentModule === index
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  } ${
                    challengeProgress.completedModules.includes(index)
                      ? "border-l-4 border-green-500"
                      : ""
                  } flex items-center justify-between gap-2`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">Module {index + 1}</div>
                    <div className="text-xs truncate opacity-90">{section.title.replace(/^Module \d+: /, '')}</div>
                  </div>
                  {challengeProgress.completedModules.includes(index) && (
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-8">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            {isQuiz ? renderQuiz() : (
              <>
                <h2 className="text-2xl font-bold mb-6">Module {currentModule + 1}: {currentContent.title.replace(/^Module \d+: /, '')}</h2>
                <ChallengeContent section={currentContent} />
                <div className="mt-6 flex justify-end">
                  {challengeProgress.completedModules.includes(currentModule) ? (
                    currentModule < challenge.content.length - 1 ? (
                      <Button onClick={() => setCurrentModule(currentModule + 1)} className="gap-2">
                        Next Module
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button variant="outline" className="gap-2" disabled>
                        <CheckCircle2 className="h-4 w-4" />
                        All Modules Completed
                      </Button>
                    )
                  ) : (
                    <Button onClick={completeCurrentModule} className="gap-2">
                      Complete
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 