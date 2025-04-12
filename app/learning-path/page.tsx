import LearningPathDesigner from "@/components/learning-path-designer"

export default function LearningPathPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1E1E1E]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <LearningPathDesigner />
        </div>
      </div>
    </div>
  )
} 