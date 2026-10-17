import { useState, useEffect, useRef } from 'react'

interface AnimatedResumeIconProps {
  className?: string
  size?: number
}

export const AnimatedResumeIcon = ({ className = 'w-3.5 h-3.5', size = 16 }: AnimatedResumeIconProps) => {
  const [animKey, setAnimKey] = useState(0)
  const svgRef = useRef<SVGSVGElement>(null)

  // Listen on parent interactive container (.group, button, <a>) so hover restarts EVERY TIME
  // No automatic periodic interval - only animates when hovered ("whn i hover then only")
  useEffect(() => {
    const el = svgRef.current?.closest('a, button, .group') || svgRef.current
    if (!el) return

    const handleEnter = () => {
      setAnimKey((prev) => prev + 1)
    }

    el.addEventListener('mouseenter', handleEnter)
    return () => el.removeEventListener('mouseenter', handleEnter)
  }, [])

  const isAnimating = animKey > 0

  return (
    <svg
      ref={svgRef}
      key={animKey}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 transition-transform duration-250 group-hover:scale-110 ${className}`}
      aria-hidden="true"
    >
      {/* Document page outline - smooth draw on hover */}
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        style={isAnimating ? {
          strokeDasharray: 70,
          animation: 'resumeDocDrawSmooth 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards'
        } : undefined}
      />

      {/* Folded corner tab */}
      <path
        d="M14 2v6h6"
        style={isAnimating ? {
          strokeDasharray: 14,
          animation: 'resumeFoldDrawSmooth 0.28s cubic-bezier(0.4, 0, 0.2, 1) 0.12s forwards'
        } : undefined}
      />

      {/* Title / Heading line */}
      <path
        d="M10 9H8"
        style={isAnimating ? {
          strokeDasharray: 6,
          animation: 'resumeLineDrawSmooth 0.22s cubic-bezier(0.4, 0, 0.2, 1) 0.18s forwards'
        } : undefined}
      />

      {/* Summary line 1 */}
      <path
        d="M16 13H8"
        style={isAnimating ? {
          strokeDasharray: 14,
          animation: 'resumeLineDrawSmooth 0.28s cubic-bezier(0.4, 0, 0.2, 1) 0.26s forwards'
        } : undefined}
      />

      {/* Experience line 2 */}
      <path
        d="M16 17H8"
        style={isAnimating ? {
          strokeDasharray: 14,
          animation: 'resumeLineDrawSmooth 0.28s cubic-bezier(0.4, 0, 0.2, 1) 0.36s forwards'
        } : undefined}
      />
    </svg>
  )
}

export default AnimatedResumeIcon
