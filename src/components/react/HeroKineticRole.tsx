import { useState, useEffect } from 'react'
import { getActiveRole, setActiveRole, type UserRole } from '@/lib/role'

export const HeroKineticRole = () => {
  const [index, setIndex] = useState(0)
  const [animState, setAnimState] = useState<'idle' | 'exit' | 'enter'>('idle')
  const [drawTick, setDrawTick] = useState(0)
  const [role, setRole] = useState<UserRole>('pe')

  useEffect(() => {
    setRole(getActiveRole())

    const handleRoleChanged = (e: Event) => {
      const customEvent = e as CustomEvent<{ role: UserRole }>
      if (customEvent.detail?.role) {
        setRole(customEvent.detail.role)
      }
    }

    window.addEventListener('cv_role_changed', handleRoleChanged)
    return () => window.removeEventListener('cv_role_changed', handleRoleChanged)
  }, [])

  // Ordered so "build" loads first, then cycles through design and ship
  const verbs = [
    {
      id: 'build',
      text: 'build',
      color: 'text-primary',
      pillBorder: 'border-border/70 hover:border-foreground/30',
      pillBg: 'bg-secondary/30 hover:bg-secondary/60',
      renderSvg: (isActive: boolean) => (
        <svg 
          viewBox="0 0 24 24" 
          className="w-3.5 h-3.5 text-primary shrink-0 transition-transform duration-200 group-hover/pill:scale-110" 
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
                ? 'stroke-dashoffset 0.45s cubic-bezier(0.2, 0, 0, 1)' 
                : 'stroke-dashoffset 0.22s cubic-bezier(0.2, 0, 0, 1)'
            }}
          />
          <path 
            d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"
            style={{
              strokeDasharray: 55,
              strokeDashoffset: isActive ? 0 : 55,
              transition: isActive 
                ? 'stroke-dashoffset 0.45s cubic-bezier(0.2, 0, 0, 1) 0.06s' 
                : 'stroke-dashoffset 0.22s cubic-bezier(0.2, 0, 0, 1)'
            }}
          />
          <path 
            d="m18 15 4-4" 
            style={{
              strokeDasharray: 12,
              strokeDashoffset: isActive ? 0 : 12,
              transition: isActive 
                ? 'stroke-dashoffset 0.25s cubic-bezier(0.2, 0, 0, 1) 0.12s' 
                : 'stroke-dashoffset 0.15s cubic-bezier(0.2, 0, 0, 1)'
            }}
          />
        </svg>
      )
    },
    {
      id: 'design',
      text: 'design',
      color: 'text-primary',
      pillBorder: 'border-border/70 hover:border-foreground/30',
      pillBg: 'bg-secondary/30 hover:bg-secondary/60',
      renderSvg: (isActive: boolean) => (
        <svg 
          viewBox="0 0 24 24" 
          className="w-3.5 h-3.5 text-primary shrink-0 transition-transform duration-200 group-hover/pill:scale-110" 
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
                ? 'stroke-dashoffset 0.45s cubic-bezier(0.2, 0, 0, 1)' 
                : 'stroke-dashoffset 0.22s cubic-bezier(0.2, 0, 0, 1)'
            }}
          />
          {/* Paint dots: fade in smoothly when active */}
          <circle cx="13.5" cy="6.5" r=".7" fill="currentColor" style={{ opacity: isActive ? 1 : 0, transition: isActive ? 'opacity 0.25s ease 0.15s' : 'opacity 0.1s ease' }} />
          <circle cx="17.5" cy="10.5" r=".7" fill="currentColor" style={{ opacity: isActive ? 1 : 0, transition: isActive ? 'opacity 0.25s ease 0.22s' : 'opacity 0.1s ease' }} />
          <circle cx="6.5" cy="12.5" r=".7" fill="currentColor" style={{ opacity: isActive ? 1 : 0, transition: isActive ? 'opacity 0.25s ease 0.29s' : 'opacity 0.1s ease' }} />
          <circle cx="8.5" cy="7.5" r=".7" fill="currentColor" style={{ opacity: isActive ? 1 : 0, transition: isActive ? 'opacity 0.25s ease 0.36s' : 'opacity 0.1s ease' }} />
        </svg>
      )
    },
    {
      id: 'ship',
      text: 'ship',
      color: 'text-primary',
      pillBorder: 'border-border/70 hover:border-foreground/30',
      pillBg: 'bg-secondary/30 hover:bg-secondary/60',
      renderSvg: (isActive: boolean) => (
        <svg 
          viewBox="0 0 24 24" 
          className="w-3.5 h-3.5 text-primary shrink-0 transition-transform duration-200 group-hover/pill:scale-110" 
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
                ? 'stroke-dashoffset 0.45s cubic-bezier(0.2, 0, 0, 1)' 
                : 'stroke-dashoffset 0.22s cubic-bezier(0.2, 0, 0, 1)'
            }}
          />
          <path 
            d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
            style={{
              strokeDasharray: 25,
              strokeDashoffset: isActive ? 0 : 25,
              transition: isActive 
                ? 'stroke-dashoffset 0.35s cubic-bezier(0.2, 0, 0, 1) 0.08s' 
                : 'stroke-dashoffset 0.18s cubic-bezier(0.2, 0, 0, 1)'
            }}
          />
          <path 
            d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" 
            style={{ opacity: isActive ? 1 : 0, transition: isActive ? 'opacity 0.25s ease 0.18s' : 'opacity 0.1s ease' }} 
          />
          <path 
            d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" 
            style={{ opacity: isActive ? 1 : 0, transition: isActive ? 'opacity 0.25s ease 0.24s' : 'opacity 0.1s ease' }} 
          />
        </svg>
      )
    }
  ]

  useEffect(() => {
    // Smooth readable cycle: line draws and rests, then line retracts before next builds
    const timer = setInterval(() => {
      // 1. Line goes back / retracts and word slides up
      setAnimState('exit')

      setTimeout(() => {
        // 2. Set next verb positioned below
        setIndex((prev) => (prev + 1) % verbs.length)
        setAnimState('enter')

        // 3. Slide up into position and trigger next SVG line build-up
        requestAnimationFrame(() => {
          setTimeout(() => {
            setAnimState('idle')
          }, 30)
        })
      }, 300) // 300ms smooth retract
    }, 2900)

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

  const handlePillClick = () => {
    // Immediate manual advance on click
    setAnimState('exit')
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % verbs.length)
      setAnimState('enter')
      requestAnimationFrame(() => {
        setTimeout(() => setAnimState('idle'), 30)
      })
    }, 300)
  }

  return (
    <div className="flex flex-wrap items-center justify-start text-start gap-x-2 gap-y-1.5 py-0.5 w-full min-h-[28px]">
      {/* "i [pill] stuff" sentence */}
      <div className="inline-flex items-center gap-1.5 shrink-0">
        {/* Small lowercase "i" */}
        <span className="text-xs sm:text-sm font-medium text-foreground/80 pl-0.5 select-none">
          i
        </span>

        {/* Stable-width Pill: prevents "stuff" from shifting or jittering */}
        <div 
          onClick={handlePillClick}
          onMouseEnter={() => setDrawTick((prev) => prev + 1)}
          className={`group/pill inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border shadow-2xs backdrop-blur-xs transition-colors duration-300 cursor-pointer select-none ${current.pillBg} ${current.pillBorder}`}
          title="Click to cycle next verb"
        >
          {/* Animated SVG (draws in, then retracts line back on exit; replays on every hover) */}
          <div key={`${index}-${drawTick}`} className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
            {current.renderSvg(animState === 'idle')}
          </div>

          {/* Kinetic Text container: fixed width slot (w-[38px] sm:w-[42px]) keeps 'stuff' 100% stationary */}
          <div className="h-4 overflow-hidden flex items-center justify-center w-[38px] sm:w-[42px] shrink-0">
            <span 
              className={`text-[11.5px] sm:text-xs font-semibold tracking-tight transition-all duration-300 transform ${motionClass} ${current.color} w-full text-center inline-block`}
            >
              {current.text}
            </span>
          </div>
        </div>

        {/* "stuff" - stays completely still, 0 jitter */}
        <span className="text-xs sm:text-sm font-medium text-foreground/90 select-none">
          stuff
        </span>
      </div>

      {/* Sleek, centered dot separator - visible on both mobile and desktop */}
      <span 
        className="w-1 h-1 rounded-full bg-foreground/30 dark:bg-foreground/40 shrink-0 select-none mx-0.5" 
        aria-hidden="true" 
      />

      {/* Role Badge: Clean minimal pill matching website aesthetic */}
      <button
        type="button"
        onClick={() => {
          const nextRole: UserRole = role === 'pm' ? 'pe' : 'pm'
          setRole(nextRole)
          setActiveRole(nextRole)
        }}
        className="group/role inline-flex items-center px-2.5 py-0.5 rounded-full border border-border/70 hover:border-foreground/30 bg-secondary/30 hover:bg-secondary/60 text-foreground text-xs sm:text-[13px] font-medium tracking-tight shadow-2xs transition-colors duration-200 cursor-pointer select-none active:scale-95 focus:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
        title={role === 'pm' ? 'Role: Product Manager (Click to switch to Product Engineer)' : 'Role: Product Engineer (Click to switch to Product Manager)'}
        aria-label={role === 'pm' ? 'Switch to Product Engineer role' : 'Switch to Product Manager role'}
      >
        <span>{role === 'pm' ? 'Product Manager' : 'Product Engineer'}</span>
      </button>
    </div>
  )
}
