import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Share2, Check } from 'lucide-react'
import type { MarkdownHeading } from 'astro'

export const MobileTOC = ({
  headings,
  productHeadings,
  title,
}: {
  headings: MarkdownHeading[]
  productHeadings?: MarkdownHeading[]
  title?: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>('')
  const [progress, setProgress] = useState(0)
  const [isAtEnd, setIsAtEnd] = useState(false)
  const [isIdle, setIsIdle] = useState(false)
  const [copied, setCopied] = useState(false)
  const [currentTab, setCurrentTab] = useState<'product' | 'technical'>(() => {
    if (typeof window !== 'undefined') {
      const docTab = document.documentElement.getAttribute('data-project-tab') as 'product' | 'technical' | null
      if (docTab) return docTab
      const params = new URLSearchParams(window.location.search)
      const role = params.get('role')?.toLowerCase() || sessionStorage.getItem('cv_active_role')
      if (role === 'pm') return 'product'
    }
    return 'technical'
  })

  useEffect(() => {
    const docTab = document.documentElement.getAttribute('data-project-tab') as 'product' | 'technical' | null
    if (docTab && docTab !== currentTab) setCurrentTab(docTab)

    const handleTabSwitched = (e: Event) => {
      const customEvent = e as CustomEvent<{ tab: 'product' | 'technical' }>
      if (customEvent.detail?.tab) {
        setCurrentTab(customEvent.detail.tab)
      }
    }

    window.addEventListener('cv_tab_switched', handleTabSwitched)
    return () => window.removeEventListener('cv_tab_switched', handleTabSwitched)
  }, [currentTab])

  const activeHeadings = (currentTab === 'product' && productHeadings && productHeadings.length > 0)
    ? productHeadings
    : headings

  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isInteractingRef = useRef(false)
  const copiedRef = useRef(false)

  useEffect(() => {
    copiedRef.current = copied
  }, [copied])

  const resetIdleTimer = useCallback(() => {
    setIsIdle(false)
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current)
    }
    idleTimeoutRef.current = setTimeout(() => {
      // Only hide if the user is not touching/hovering and not showing the copied confirmation
      if (!isInteractingRef.current && !copiedRef.current) {
        setIsIdle(true)
      }
    }, 1000)
  }, [])

  const handleInteractionStart = () => {
    isInteractingRef.current = true
    setIsIdle(false)
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current)
    }
  }

  const handleInteractionEnd = () => {
    isInteractingRef.current = false
    resetIdleTimer()
  }

  useEffect(() => {
    const handleScroll = () => {
      // Calculate reading progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0
      setProgress(scrolled)

      // Hide pill when user reaches the post navigation / bottom area
      const postNav =
        document.getElementById('post-navigation') ||
        document.getElementById('project-details')
      if (postNav) {
        const rect = postNav.getBoundingClientRect()
        if (rect.top <= window.innerHeight) {
          setIsAtEnd(true)
        } else {
          setIsAtEnd(false)
        }
      } else {
        // Fallback: hide if > 95% scrolled
        setIsAtEnd(scrolled >= 95)
      }

      // Reappear and reset idle fade timer on scroll
      resetIdleTimer()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Trigger once on mount

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current)
      }
    }
  }, [resetIdleTimer])

  useEffect(() => {
    // Robust heading detection for both Product and Technical sections
    const updateActiveHeading = () => {
      const containerSelector = currentTab === 'product' ? '#project-product-content' : '#project-technical-content'
      const container = document.querySelector(containerSelector)
      const elements = container
        ? Array.from(container.querySelectorAll<HTMLElement>('.prose h2, .prose h3, .prose h4'))
        : Array.from(document.querySelectorAll<HTMLElement>('.prose h2, .prose h3, .prose h4'))

      if (!elements.length) return

      const triggerPoint = 140

      let current = ''
      for (let i = 0; i < elements.length; i++) {
        const rect = elements[i].getBoundingClientRect()
        if (rect.top <= triggerPoint) {
          current = elements[i].id
        } else {
          break
        }
      }

      if (current) {
        setActiveId(current)
      } else if (elements[0]?.id) {
        setActiveId(elements[0].id)
      }
    }

    updateActiveHeading()

    window.addEventListener('scroll', updateActiveHeading, { passive: true })
    return () => window.removeEventListener('scroll', updateActiveHeading)
  }, [currentTab])

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation()
    resetIdleTimer()

    const shareData = {
      title: title || document.title,
      url: window.location.href,
    }

    if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
        return
      } catch (err: any) {
        if (err?.name === 'AbortError') return
      }
    }

    // Fallback: copy link to clipboard
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(window.location.href)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = window.location.href
        document.body.appendChild(textArea)
        textArea.select()
        ;(document as any).execCommand?.('copy')
        document.body.removeChild(textArea)
      }
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        resetIdleTimer()
      }, 2000)
    } catch {
      // No-op if copying fails
    }
  }

  const activeHeading = activeHeadings.find((h) => h.slug === activeId) || activeHeadings[0]
  const radius = 8
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  if (!activeHeadings || activeHeadings.length === 0) return null

  const shouldShowBar = !isAtEnd && !isIdle && !isOpen

  return (
    <div className="xl:hidden">
      {/* Floating Bottom Bar: Reduced Width Pill + Circular Share Button */}
      <AnimatePresence>
        {shouldShowBar && (
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ bottom: 'max(1.5rem, calc(0.75rem + env(safe-area-inset-bottom, 0px)))' }}
            className="fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-2.5 max-w-[calc(100vw-2rem)]"
            onMouseEnter={handleInteractionStart}
            onMouseLeave={handleInteractionEnd}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
          >
            {/* TOC Navigation Pill */}
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open table of contents"
              className="flex items-center justify-between gap-2.5 h-11 sm:h-12 px-3.5 sm:px-4 bg-background/90 backdrop-blur-xl border border-border shadow-xl rounded-full text-sm font-medium w-[220px] sm:w-[250px] max-w-[calc(100vw-5.5rem)] select-none hover:border-primary/40 active:scale-[0.98] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2 sm:gap-2.5 overflow-hidden text-left min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="truncate text-xs sm:text-sm text-foreground/90 font-medium">
                  {activeHeading?.text.replace(/<[^>]+>/g, '') || 'Table of Contents'}
                </span>
              </div>
              <div className="shrink-0 relative w-6 h-6 flex items-center justify-center">
                <svg className="transform -rotate-90 w-6 h-6">
                  <circle
                    cx="12"
                    cy="12"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="transparent"
                    className="text-foreground/20"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="text-primary transition-all duration-300"
                  />
                </svg>
              </div>
            </button>

            {/* Circular Share Button */}
            <div className="relative shrink-0">
              <button
                onClick={handleShare}
                aria-label="Share this article"
                className="h-11 w-11 sm:h-12 sm:w-12 rounded-full flex items-center justify-center bg-background/90 backdrop-blur-xl border border-border shadow-xl text-foreground/80 hover:text-foreground hover:border-primary/40 active:scale-95 transition-all cursor-pointer"
              >
                {copied ? (
                  <Check size={18} className="text-emerald-500" />
                ) : (
                  <Share2 size={18} className="text-foreground/80" />
                )}
              </button>
              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: -8, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-foreground text-background text-[11px] font-semibold shadow-md whitespace-nowrap pointer-events-none"
                  >
                    Copied!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border rounded-t-3xl shadow-2xl flex flex-col max-h-[80vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Table of Contents
                </h3>
                <button onClick={() => setIsOpen(false)} className="p-2 -m-2">
                  <X size={18} className="text-muted-foreground" />
                </button>
              </div>
              <div className="overflow-y-auto p-6 flex flex-col gap-4 pb-safe">
                {activeHeadings.map((heading, i) => {
                  const isActive = activeId === heading.slug
                  return (
                    <a
                      key={i}
                      href={`#${heading.slug}`}
                      onClick={() => setIsOpen(false)}
                      className={`block text-sm transition-colors relative ${isActive ? 'text-primary font-bold' : 'text-foreground/70 hover:text-foreground'}`}
                      style={{ marginLeft: `${(heading.depth - 2) * 1}rem` }}
                    >
                      {isActive && (
                        <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary" />
                      )}
                      {heading.text.replace(/<[^>]+>/g, '')}
                    </a>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
