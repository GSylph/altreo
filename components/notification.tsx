// components/Notification.tsx
import { useEffect } from "react"



export function Notification({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg z-50 text-white ${type === "error" ? "bg-red-600" : "bg-green-600"}`}>
      {message}
    </div>
  )
}
