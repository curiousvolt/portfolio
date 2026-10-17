import { useState, useEffect } from 'react'
import { getActiveRole, type UserRole } from '@/lib/role'
import AnimatedResumeIcon from './AnimatedResumeIcon'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const HeroResumeButton = ({ className }: { className?: string }) => {
  const [role, setRole] = useState<UserRole>(() => {
    if (typeof window !== 'undefined') {
      return getActiveRole()
    }
    return 'pe'
  })

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

  const syncHref = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
    const active = getActiveRole()
    if (active !== role) {
      setRole(active)
    }
    e.currentTarget.href = active === 'pm' ? '/resumepm' : '/resume'
  }

  const href = role === 'pm' ? '/resumepm' : '/resume'

  return (
    <a
      href={href}
      data-resume-link="true"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={syncHref}
      onPointerDown={syncHref}
      onClick={syncHref}
      className={cn(
        buttonVariants({ variant: 'default', size: 'sm' }),
        'rounded-full px-4 gap-2 text-xs font-semibold group transition-all duration-300',
        className
      )}
      title={role === 'pm' ? 'Download Product Manager Resume' : 'Download Resume'}
    >
      <AnimatedResumeIcon size={14} className="size-3.5 text-primary-foreground" />
      <span>Resume</span>
    </a>
  )
}

export default HeroResumeButton
