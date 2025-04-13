"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle2, XCircle } from "lucide-react"

interface Question {
  question: string
  options: string[]
  correctAnswer: number
}

interface QuizSectionProps {
  questions: Question[]
}

export function QuizSection({ questions }: QuizSectionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1))
  const [showResults, setShowResults] = useState(false)

  const handleSubmit = () => {
    setShowResults(true)
  }

  const handleRetry = () => {
    setSelectedAnswers(Array(questions.length).fill(-1))
    setShowResults(false)
  }

  const score = selectedAnswers.reduce((acc, answer, index) => {
    return acc + (answer === questions[index].correctAnswer ? 1 : 0)
  }, 0)

  return (
    <div className="space-y-8">
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="space-y-4">
          <div className="flex items-start gap-2">
            <span className="font-medium">Q{questionIndex + 1}:</span>
            <span>{question.question}</span>
          </div>

          <RadioGroup
            value={selectedAnswers[questionIndex].toString()}
            onValueChange={(value) => {
              const newAnswers = [...selectedAnswers]
              newAnswers[questionIndex] = parseInt(value)
              setSelectedAnswers(newAnswers)
            }}
            className="space-y-2"
          >
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={optionIndex.toString()}
                  id={`q${questionIndex}-o${optionIndex}`}
                  disabled={showResults}
                />
                <Label
                  htmlFor={`q${questionIndex}-o${optionIndex}`}
                  className={`flex items-center gap-2 ${
                    showResults &&
                    optionIndex === question.correctAnswer &&
                    "text-green-500 font-medium"
                  }`}
                >
                  {option}
                  {showResults && optionIndex === question.correctAnswer && (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  )}
                  {showResults &&
                    optionIndex === selectedAnswers[questionIndex] &&
                    optionIndex !== question.correctAnswer && (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}

      <div className="pt-4">
        {!showResults ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedAnswers.some((answer) => answer === -1)}
          >
            Submit Answers
          </Button>
        ) : (
          <div className="space-y-4">
            <p className="font-medium">
              Score: {score} out of {questions.length}
            </p>
            <Button onClick={handleRetry}>Try Again</Button>
          </div>
        )}
      </div>
    </div>
  )
}
