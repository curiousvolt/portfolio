import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { MarkdownHeading } from 'astro'

export const MobileTOC = ({ headings }: { headings: MarkdownHeading[] }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>('')
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate reading progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      setProgress(scrolled)

      // Hide pill when user reaches the post navigation / bottom area
      const postNav = document.getElementById('post-navigation')
      if (postNav) {
        const rect = postNav.getBoundingClientRect()
        // If the post navigation is in view (or above), hide the pill
        if (rect.top <= window.innerHeight) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
      } else {
        // Fallback: hide if > 95% scrolled
        setIsVisible(scrolled < 95)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Trigger once on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Determine active heading based on scroll position
    const observer = new IntersectionObserver(
      (entries) => {
        let visibleId = ''
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleId = entry.target.id
          }
        })
        if (visibleId) {
          setActiveId(visibleId)
        }
      },
      { rootMargin: '-10% 0px -80% 0px' }
    )

    // Observe all headings inside the prose article
    const sectionElements = document.querySelectorAll('.prose h2, .prose h3, .prose h4')
    sectionElements.forEach((el) => observer.observe(el))
    
    return () => observer.disconnect()
  }, [])

  const activeHeading = headings.find(h => h.slug === activeId) || headings[0]
  const radius = 8
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  if (!headings || headings.length === 0) return null

  return (
    <div className="xl:hidden">
      {/* Floating Pill */}
      <AnimatePresence>
        {isVisible && !isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="w-full flex items-center justify-between gap-3 px-5 py-3.5 bg-background/90 backdrop-blur-xl border border-border shadow-2xl rounded-full text-sm font-medium"
            >
              <div className="flex items-center gap-3 overflow-hidden text-left">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="truncate">{activeHeading?.text.replace(/<[^>]+>/g, '') || "Table of Contents"}</span>
              </div>
              <div className="shrink-0 relative w-6 h-6 flex items-center justify-center">
                 <svg className="transform -rotate-90 w-6 h-6">
                    <circle cx="12" cy="12" r={radius} stroke="currentColor" strokeWidth="2" fill="transparent" className="text-foreground/20" />
                    <circle cx="12" cy="12" r={radius} stroke="currentColor" strokeWidth="2" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="text-primary transition-all duration-300" />
                 </svg>
              </div>
            </button>
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
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border rounded-t-3xl shadow-2xl flex flex-col max-h-[80vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Table of Contents</h3>
                <button onClick={() => setIsOpen(false)} className="p-2 -m-2">
                  <X size={18} className="text-muted-foreground" />
                </button>
              </div>
              <div className="overflow-y-auto p-6 flex flex-col gap-4 pb-safe">
                {headings.map((heading, i) => {
                  const isActive = activeId === heading.slug
                  return (
                    <a
                      key={i}
                      href={`#${heading.slug}`}
                      onClick={() => setIsOpen(false)}
                      className={`block text-sm transition-colors relative ${isActive ? 'text-primary font-bold' : 'text-foreground/70 hover:text-foreground'}`}
                      style={{ marginLeft: `${(heading.depth - 2) * 1}rem` }}
                    >
                      {isActive && <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary" />}
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
