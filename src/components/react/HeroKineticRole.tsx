import { useState, useEffect } from 'react'

export const HeroKineticRole = () => {
  const [index, setIndex] = useState(0)
  const [animState, setAnimState] = useState<'idle' | 'exit' | 'enter'>('idle')

  // Ordered so "build" loads first, then cycles through design and ship
  const verbs = [
    {
      id: 'build',
      text: 'build',
      color: 'text-primary dark:text-primary',
      pillBorder: 'border-primary/25',
      pillBg: 'bg-primary/5',
      renderSvg: (isActive: boolean) => (
        <svg 
          viewBox="0 0 24 24" 
          className="w-3.5 h-3.5 text-primary shrink-0" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.75" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Lucide Hammer: draws forward on enter, retracts back on exit */}
          <path 
            d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9"
            style={{
              strokeDasharray: 45,
              strokeDashoffset: isActive ? 0 : 45,
              transition: isActive 
                ? 'stroke-dashoffset 1.1s cubic-bezier(0.4, 0, 0.2, 1)' 
                : 'stroke-dashoffset 0.45s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
          <path 
            d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"
            style={{
              strokeDasharray: 55,
              strokeDashoffset: isActive ? 0 : 55,
              transition: isActive 
                ? 'stroke-dashoffset 1.1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s' 
                : 'stroke-dashoffset 0.45s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
          <path 
            d="m18 15 4-4" 
            style={{
              strokeDasharray: 12,
              strokeDashoffset: isActive ? 0 : 12,
              transition: isActive 
                ? 'stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s' 
                : 'stroke-dashoffset 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
        </svg>
      )
    },
    {
      id: 'design',
      text: 'design',
      color: 'text-pink-500 dark:text-pink-400',
      pillBorder: 'border-pink-500/25',
      pillBg: 'bg-pink-500/5',
      renderSvg: (isActive: boolean) => (
        <svg 
          viewBox="0 0 24 24" 
          className="w-3.5 h-3.5 text-pink-500 dark:text-pink-400 shrink-0" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.75" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Lucide Palette body: draws forward on enter, retracts back on exit */}
          <path
            d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"
            style={{
              strokeDasharray: 80,
              strokeDashoffset: isActive ? 0 : 80,
              transition: isActive 
                ? 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' 
                : 'stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
          {/* Paint dots: fade in sequentially when active, fade out quickly on exit */}
          <circle cx="13.5" cy="6.5" r=".7" fill="currentColor" style={{ opacity: isActive ? 1 : 0, transition: isActive ? 'opacity 0.5s ease 0.5s' : 'opacity 0.2s ease' }} />
          <circle cx="17.5" cy="10.5" r=".7" fill="currentColor" style={{ opacity: isActive ? 1 : 0, transition: isActive ? 'opacity 0.5s ease 0.7s' : 'opacity 0.2s ease' }} />
          <circle cx="6.5" cy="12.5" r=".7" fill="currentColor" style={{ opacity: isActive ? 1 : 0, transition: isActive ? 'opacity 0.5s ease 0.9s' : 'opacity 0.2s ease' }} />
          <circle cx="8.5" cy="7.5" r=".7" fill="currentColor" style={{ opacity: isActive ? 1 : 0, transition: isActive ? 'opacity 0.5s ease 1.1s' : 'opacity 0.2s ease' }} />
        </svg>
      )
    },
    {
      id: 'ship',
      text: 'ship',
      color: 'text-emerald-500 dark:text-emerald-400',
      pillBorder: 'border-emerald-500/25',
      pillBg: 'bg-emerald-500/5',
      renderSvg: (isActive: boolean) => (
        <svg 
          viewBox="0 0 24 24" 
          className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.75" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Lucide Rocket: draws forward on enter, retracts back on exit */}
          <path 
            d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
            style={{
              strokeDasharray: 65,
              strokeDashoffset: isActive ? 0 : 65,
              transition: isActive 
                ? 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' 
                : 'stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
          <path 
            d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
            style={{
              strokeDasharray: 25,
              strokeDashoffset: isActive ? 0 : 25,
              transition: isActive 
                ? 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s' 
                : 'stroke-dashoffset 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
          <path 
            d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" 
            style={{ opacity: isActive ? 1 : 0, transition: isActive ? 'opacity 0.5s ease 0.6s' : 'opacity 0.2s ease' }} 
          />
          <path 
            d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" 
            style={{ opacity: isActive ? 1 : 0, transition: isActive ? 'opacity 0.5s ease 0.8s' : 'opacity 0.2s ease' }} 
          />
        </svg>
      )
    }
  ]

  useEffect(() => {
    // 4.2s cycle: line draws and rests, then line retracts back before next builds
    const timer = setInterval(() => {
      // 1. Line goes back / retracts and word slides up
      setAnimState('exit')

      setTimeout(() => {
        // 2. After line has cleanly retracted back, set next verb positioned below
        setIndex((prev) => (prev + 1) % verbs.length)
        setAnimState('enter')

        // 3. Slide up into position and trigger next SVG line build-up
        requestAnimationFrame(() => {
          setTimeout(() => {
            setAnimState('idle')
          }, 35)
        })
      }, 520) // 520ms gives full time for the stroke to retract back
    }, 4200)

    return () => clearInterval(timer)
  }, [verbs.length])

  const current = verbs[index]

  // Slot machine roll:
  // - exit: slides UP (-translate-y-3) and fades out
  // - enter: starts DOWN (+translate-y-3) and invisible
  // - idle: at rest (translate-y-0) and fully visible
  let motionClass = 'translate-y-0 opacity-100'
  if (animState === 'exit') {
    motionClass = '-translate-y-3 opacity-0'
  } else if (animState === 'enter') {
    motionClass = 'translate-y-3 opacity-0 transition-none'
  }

  return (
    <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1.5 py-0.5 animate-fade-in-up">
      {/* "i [pill] stuff" sentence */}
      <div className="inline-flex items-center gap-1.5 shrink-0">
        {/* Small lowercase "i" */}
        <span className="text-xs sm:text-sm font-medium text-foreground/80 pl-0.5 select-none">
          i
        </span>

        {/* Compact, clean Pill hugging contents with balanced padding */}
        <div 
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border shadow-2xs backdrop-blur-xs transition-all duration-300 ${current.pillBg} ${current.pillBorder}`}
        >
          {/* Animated SVG (draws in, then retracts line back on exit) */}
          <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
            {current.renderSvg(animState === 'idle')}
          </div>

          {/* Kinetic Text container: hugs text with no extra trailing gap */}
          <div className="h-4 overflow-hidden flex items-center">
            <span 
              className={`text-[11.5px] sm:text-xs font-semibold tracking-tight transition-all duration-350 transform ${motionClass} ${current.color}`}
            >
              {current.text}
            </span>
          </div>
        </div>

        {/* "stuff" */}
        <span className="text-xs sm:text-sm font-medium text-foreground/90 select-none">
          stuff
        </span>
      </div>

      {/* Sleek, centered dot separator - visible on both mobile and desktop */}
      <span 
        className="w-1 h-1 rounded-full bg-foreground/30 dark:bg-foreground/40 shrink-0 select-none mx-0.5" 
        aria-hidden="true" 
      />

      {/* Product Engineer Role Badge */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary/60 hover:bg-secondary/90 text-foreground border border-border/40 text-[11.5px] sm:text-xs font-medium whitespace-nowrap shadow-2xs transition-colors duration-200 shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Product Engineer
      </div>
    </div>
  )
}
