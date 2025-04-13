import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

type VirtualAssistantLoaderProps = {
  message: string
  mood?: "happy" | "thinking" | "excited" | "default"
}

export default function VirtualAssistantLoader({ 
  message, 
  mood = "default"
}: VirtualAssistantLoaderProps) {
  const getMascotEmoji = () => {
    switch (mood) {
      case "happy":
        return "🤖😊"
      case "thinking":
        return "🤖🤔"
      case "excited":
        return "🤖✨"
      default:
        return "🤖"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center justify-center gap-3 bg-orange-500/10 backdrop-blur-sm rounded-lg p-6 shadow-lg w-full"
    >
      <div className="relative">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-4xl"
        >
          {getMascotEmoji()}
        </motion.div>
      </div>
      
      <span className="text-lg text-orange-500">{message}</span>
      
      <Sparkles className="w-5 h-5 text-orange-500/50" />
    </motion.div>
  )
} 