import { CodeBlock } from "@/components/code-block"
import { VideoEmbed } from "@/components/video-embed"
import { QuizSection } from "@/components/quiz-section"
import { ExternalLink } from "@/components/external-link"

// Define the types for different content sections
type ContentSection = {
  type: "text" | "video" | "code" | "quiz" | "link"
  title?: string
  content: any // This will be different based on the type
}

interface ChallengeContentProps {
  section: ContentSection
}

export default function ChallengeContent({ section }: ChallengeContentProps) {
  // Render different content based on the section type
  return (
    <div className="space-y-4">
      {section.title && <h3 className="text-xl font-semibold">{section.title}</h3>}

      {section.type === "text" && (
        <div 
          className="prose prose-slate dark:prose-invert max-w-none whitespace-pre-line"
          dangerouslySetInnerHTML={{ 
            __html: section.content.replace(/\n/g, '<br />')
          }} 
        />
      )}

      {section.type === "video" && <VideoEmbed videoId={section.content} />}

      {section.type === "code" && <CodeBlock code={section.content.code} language={section.content.language} />}

      {section.type === "quiz" && <QuizSection questions={section.content} />}

      {section.type === "link" && <ExternalLink link={section.content} />}
    </div>
  )
}
