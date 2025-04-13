import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Loader2, Sparkles, X } from "lucide-react"

type ImmersiveAssistantProps = {
  username: string
  message: string
  isTyping?: boolean
  mood?: "happy" | "thinking" | "excited" | "default"
  onInteract?: () => void
  onMessageComplete?: () => void
  onClose?: () => void
}

export default function ImmersiveAssistant({ 
  username,
  message, 
  isTyping = false, 
  mood = "default",
  onInteract,
  onMessageComplete,
  onClose
}: ImmersiveAssistantProps) {
  const [displayedMessage, setDisplayedMessage] = useState("")
  const [showAssistant, setShowAssistant] = useState(true)
  const [bounce, setBounce] = useState(false)

  useEffect(() => {
    setShowAssistant(true)
    // Add occasional bounce animation
    const bounceInterval = setInterval(() => {
      setBounce(true)
      setTimeout(() => setBounce(false), 1000)
    }, 10000)
    return () => {
      clearInterval(bounceInterval)
      setShowAssistant(false)
    }
  }, [message])

  // Typewriter effect for messages
  useEffect(() => {
    if (isTyping) {
      setDisplayedMessage("")
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex < message.length) {
          setDisplayedMessage(prev => prev + message[currentIndex])
          currentIndex++
        } else {
          clearInterval(interval)
          onMessageComplete?.()
        }
      }, 30)
      return () => clearInterval(interval)
    } else {
      setDisplayedMessage(message)
    }
  }, [message, isTyping])

  const handleClose = () => {
    setShowAssistant(false)
    onClose?.()
  }

  const mascotVariants = {
    hover: {
      scale: 1.05,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.3
      }
    },
    bounce: {
      y: [0, -20, 0],
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    },
    default: {
      scale: 1,
      rotate: 0
    }
  }

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
    <AnimatePresence>
      {showAssistant && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)]" />
          
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          
          <div className="relative h-full flex flex-col items-center justify-center p-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={bounce ? "bounce" : "default"}
              variants={mascotVariants}
              className="relative w-40 h-40 md:w-48 md:h-48 mb-8"
            >
              <div className="w-full h-full bg-orange-500/20 rounded-full flex items-center justify-center text-6xl md:text-7xl shadow-lg backdrop-blur-sm">
                {getMascotEmoji()}
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/75 text-white text-sm px-3 py-2 rounded-full whitespace-nowrap"
              >
                Click me! 👋
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative bg-orange-500/10 rounded-2xl p-6 max-w-2xl w-full backdrop-blur-sm"
            >
              {isTyping ? (
                <div className="flex gap-2 h-8 items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-3 h-3 bg-orange-500 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                    className="w-3 h-3 bg-orange-500 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                    className="w-3 h-3 bg-orange-500 rounded-full"
                  />
                </div>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-white text-center text-xl md:text-2xl leading-relaxed"
                >
                  {displayedMessage}
                </motion.p>
              )}
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-4 right-4 flex items-center gap-2 text-orange-500/50"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Altreo Assistant</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 