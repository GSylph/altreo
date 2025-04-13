import React, { ReactNode } from 'react'

export type TextContent = {
  type: "text"
  title: string
  content: string
}

export type VideoContent = {
  type: "video"
  title: string
  content: string
}

export type CodeContent = {
  type: "code"
  title: string
  content: {
    language: string
    code: string
  }
}

export type QuizContent = {
  type: "quiz"
  title: string
  content: {
    question: string
    options: string[]
    correctAnswer: number
  }[]
}

export type LinkContent = {
  type: "link"
  title: string
  content: {
    title: string
    url: string
    description: string
  }
}

export type Content = TextContent | VideoContent | CodeContent | QuizContent | LinkContent

interface ChallengeContentProps {
  content: Content
}

export function ChallengeContent({ content }: ChallengeContentProps) {
  switch (content.type) {
    case "text":
      return (
        <div className="prose max-w-none">
          <h3>{content.title}</h3>
          <p>{content.content}</p>
        </div>
      )
    case "video":
      return (
        <div className="space-y-2">
          <h3>{content.title}</h3>
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${content.content}`}
              title={content.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )
    case "code":
      return (
        <div className="space-y-2">
          <h3>{content.title}</h3>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <code className={`language-${content.content.language}`}>
              {content.content.code}
            </code>
          </pre>
        </div>
      )
    case "quiz":
      return (
        <div className="space-y-4">
          <h3>{content.title}</h3>
          {content.content.map((question, index) => (
            <div key={index} className="space-y-2">
              <p className="font-medium">{question.question}</p>
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      id={`option-${index}-${optionIndex}`}
                      value={optionIndex}
                    />
                    <label htmlFor={`option-${index}-${optionIndex}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )
    case "link":
      return (
        <div className="space-y-2">
          <h3>{content.title}</h3>
          <a
            href={content.content.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            {content.content.title}
          </a>
          <p className="text-gray-600">{content.content.description}</p>
        </div>
      )
    default:
      return null
  }
} 