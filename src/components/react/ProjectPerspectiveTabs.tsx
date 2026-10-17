import { useState, useEffect } from 'react'
import { getActiveRole, type UserRole } from '@/lib/role'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/utils'
import { Briefcase, Cpu } from 'lucide-react'

export const ProjectPerspectiveTabs = () => {
  const [activeTab, setActiveTab] = useState<'product' | 'technical'>('technical')

  const applyVisibility = (tab: 'product' | 'technical') => {
    const productEl = document.getElementById('project-product-content')
    const technicalEl = document.getElementById('project-technical-content')
    const prodTOC = document.getElementById('project-product-toc')
    const techTOC = document.getElementById('project-technical-toc')

    if (productEl && technicalEl) {
      if (tab === 'product') {
        productEl.classList.remove('hidden')
        technicalEl.classList.add('hidden')
      } else {
        productEl.classList.add('hidden')
        technicalEl.classList.remove('hidden')
      }
    }

    if (prodTOC && techTOC) {
      if (tab === 'product') {
        prodTOC.classList.remove('hidden')
        prodTOC.classList.add('flex')
        techTOC.classList.add('hidden')
        techTOC.classList.remove('flex')
      } else {
        prodTOC.classList.add('hidden')
        prodTOC.classList.remove('flex')
        techTOC.classList.remove('hidden')
        techTOC.classList.add('flex')
      }
    }

    document.documentElement.setAttribute('data-project-tab', tab)
    window.dispatchEvent(new CustomEvent('cv_tab_switched', { detail: { tab } }))
  }

  useEffect(() => {
    // Check if initial inline script or role set it to product
    const docTab = document.documentElement.getAttribute('data-project-tab') as 'product' | 'technical' | null
    const initial = docTab || (getActiveRole() === 'pm' ? 'product' : 'technical')
    setActiveTab(initial)
    applyVisibility(initial)

    const handleRoleChanged = (e: Event) => {
      const customEvent = e as CustomEvent<{ role: UserRole }>
      if (customEvent.detail?.role) {
        const next = customEvent.detail.role === 'pm' ? 'product' : 'technical'
        setActiveTab(next)
        applyVisibility(next)
      }
    }

    const handleTabSwitched = (e: Event) => {
      const customEvent = e as CustomEvent<{ tab: 'product' | 'technical' }>
      if (customEvent.detail?.tab && customEvent.detail.tab !== activeTab) {
        setActiveTab(customEvent.detail.tab)
      }
    }

    window.addEventListener('cv_role_changed', handleRoleChanged)
    window.addEventListener('cv_tab_switched', handleTabSwitched)
    return () => {
      window.removeEventListener('cv_role_changed', handleRoleChanged)
      window.removeEventListener('cv_tab_switched', handleTabSwitched)
    }
  }, [activeTab])

  const handleTabClick = (tab: 'product' | 'technical') => {
    setActiveTab(tab)
    applyVisibility(tab)
    trackEvent('Perspective Switched', {
      perspective: tab,
      path: window.location.pathname,
    })
  }

  return (
    <div className="w-full flex justify-center items-center my-0.5 sm:my-1.5">
      {/* Centered Pill-shaped tab container with minimal spacing */}
      <div 
        className="relative inline-flex items-center p-1 rounded-full bg-secondary/80 border border-border/60 backdrop-blur-md shadow-xs select-none" 
        role="tablist"
        aria-label="Project Perspective"
      >
        {/* Smooth sliding pill background animation */}
        <span
          className={cn(
            'absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-background border border-border/40 shadow-xs transition-transform duration-300 ease-out pointer-events-none',
            activeTab === 'product' ? 'left-1 translate-x-0' : 'left-1 translate-x-full'
          )}
          aria-hidden="true"
        />

        {/* Product Tab (Pill shape) */}
        <button
          type="button"
          data-perspective="product"
          onClick={() => handleTabClick('product')}
          className={cn(
            'relative z-10 flex-1 flex items-center justify-center gap-2 px-5 py-2 2xl:px-6 2xl:py-2.5 rounded-full text-xs sm:text-sm 2xl:text-base font-semibold transition-colors duration-200 cursor-pointer min-w-[110px] sm:min-w-[125px] 2xl:min-w-[140px]',
            activeTab === 'product'
              ? 'text-foreground font-bold'
              : 'text-muted-foreground hover:text-foreground'
          )}
          aria-selected={activeTab === 'product'}
          role="tab"
        >
          <Briefcase className={cn("size-3.5 2xl:size-4", activeTab === 'product' ? 'text-primary' : 'opacity-70')} />
          <span>Product</span>
        </button>

        {/* Technical Tab (Pill shape) */}
        <button
          type="button"
          data-perspective="technical"
          onClick={() => handleTabClick('technical')}
          className={cn(
            'relative z-10 flex-1 flex items-center justify-center gap-2 px-5 py-2 2xl:px-6 2xl:py-2.5 rounded-full text-xs sm:text-sm 2xl:text-base font-semibold transition-colors duration-200 cursor-pointer min-w-[110px] sm:min-w-[125px] 2xl:min-w-[140px]',
            activeTab === 'technical'
              ? 'text-foreground font-bold'
              : 'text-muted-foreground hover:text-foreground'
          )}
          aria-selected={activeTab === 'technical'}
          role="tab"
        >
          <Cpu className={cn("size-3.5 2xl:size-4", activeTab === 'technical' ? 'text-primary' : 'opacity-70')} />
          <span>Technical</span>
        </button>
      </div>
    </div>
  )
}

export default ProjectPerspectiveTabs
