import { useState, useEffect } from 'react'

interface AnimatedResumeIconProps {
  className?: string
  size?: number
}

export const AnimatedResumeIcon = ({ className = 'w-3.5 h-3.5', size = 16 }: AnimatedResumeIconProps) => {
  const [cycle, setCycle] = useState(0)

  // Periodically re-trigger the smooth line-drawing animation every 5.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCycle((prev) => prev + 1)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

  return (
    <svg
      key={cycle}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 transition-transform duration-300 group-hover:scale-110 ${className}`}
      aria-hidden="true"
    >
      {/* Document page outline - draws on mount/cycle */}
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        style={{
          strokeDasharray: 70,
          animation: 'resumeDocDraw 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards'
        }}
      />

      {/* Folded corner tab */}
      <path
        d="M14 2v6h6"
        style={{
          strokeDasharray: 14,
          animation: 'resumeFoldDraw 0.45s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards'
        }}
      />

      {/* Title / Heading line */}
      <path
        d="M10 9H8"
        className="resume-line-1"
        style={{
          strokeDasharray: 6,
          animation: 'resumeLineDraw 0.35s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards'
        }}
      />

      {/* Summary line 1 */}
      <path
        d="M16 13H8"
        className="resume-line-2"
        style={{
          strokeDasharray: 14,
          animation: 'resumeLineDraw 0.45s cubic-bezier(0.4, 0, 0.2, 1) 0.65s forwards'
        }}
      />

      {/* Experience line 2 */}
      <path
        d="M16 17H8"
        className="resume-line-3"
        style={{
          strokeDasharray: 14,
          animation: 'resumeLineDraw 0.45s cubic-bezier(0.4, 0, 0.2, 1) 0.8s forwards'
        }}
      />
    </svg>
  )
}

export default AnimatedResumeIcon
