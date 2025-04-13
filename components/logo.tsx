import type { FC } from "react"

interface LogoProps {
  className?: string
}

export const Logo: FC<LogoProps> = ({ className = "h-8 w-auto" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full">
        <path d="M20 5L35 30H5L20 5Z" fill="#FF7B24" className="animate-pulse-slow" />
        <path
          d="M20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35Z"
          stroke="#FF7B24"
          strokeWidth="2"
          fill="none"
        />
        <path d="M15 15L25 25M15 25L25 15" stroke="#FF7B24" strokeWidth="2" />
        <text x="45" y="25" fill="#FFFFFF" fontSize="18" fontWeight="bold">
          Altreo
        </text>
      </svg>
    </div>
  )
}
