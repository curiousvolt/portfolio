import { type FC } from 'react'

interface AnimatedResumeIconProps {
  className?: string
  size?: number
}

export const AnimatedResumeIcon: FC<AnimatedResumeIconProps> = ({ className = 'w-3.5 h-3.5', size = 16 }) => {
  return (
    <svg
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
        className="resume-doc"
        style={{ strokeDasharray: 70, strokeDashoffset: 0 }}
      />

      {/* Folded corner tab */}
      <path
        d="M14 2v6h6"
        className="resume-fold"
        style={{ strokeDasharray: 14, strokeDashoffset: 0 }}
      />

      {/* Title / Heading line */}
      <path
        d="M10 9H8"
        className="resume-line-1"
        style={{ strokeDasharray: 6, strokeDashoffset: 0 }}
      />

      {/* Summary line 1 */}
      <path
        d="M16 13H8"
        className="resume-line-2"
        style={{ strokeDasharray: 14, strokeDashoffset: 0 }}
      />

      {/* Experience line 2 */}
      <path
        d="M16 17H8"
        className="resume-line-3"
        style={{ strokeDasharray: 14, strokeDashoffset: 0 }}
      />
    </svg>
  )
}

export default AnimatedResumeIcon
