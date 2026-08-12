import type { CollectionEntry } from 'astro:content'

export const LogCard = ({ log }: { log: CollectionEntry<'logs'> }) => {
  const data = log.data
  
  let dateStr = data.date
  if (data.date) {
    const parts = data.date.split(' ')
    if (parts.length === 2) {
      dateStr = `${parts[0]} / ${parts[1]}`
    }
  }

  return (
    <a href={`/logs/${log.id}`} className="block group p-4 rounded-2xl border border-black/5 dark:border-white/5 bg-gradient-to-br from-white/60 to-white/10 dark:from-[#1a1a1a]/80 dark:to-[#0a0a0a]/80 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:border-black/10 dark:hover:border-white/10 hover:shadow-md transition-all duration-500 relative overflow-hidden text-left drop-shadow-sm">
      
      {/* Subtle Noise Texture for frosted look */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.1] dark:opacity-[0.2] mix-blend-overlay pointer-events-none transition-opacity duration-500 group-hover:opacity-[0.15] dark:group-hover:opacity-[0.25]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      ></div>

      {/* Top right date */}
      <div className="absolute top-4 right-4 z-10 font-mono text-[10px] sm:text-xs tracking-[0.2em] text-foreground/40 dark:text-white/40 uppercase font-medium">
        {dateStr}
      </div>

      <div className="relative z-10 flex flex-col h-full mt-2 sm:mt-3">
        {/* Sub-heading */}
        <div className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.15em] mb-3 uppercase text-primary">
          // {data.status}
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-foreground dark:text-white mb-4 leading-tight max-w-[90%] group-hover:text-primary transition-colors duration-200">
          {data.title}
        </h3>

        {/* Conditionally render line if there's content below it */}
        {(data.description || (data.tags && data.tags.length > 0)) && (
          <div className="h-px bg-black/5 dark:bg-white/5 w-full mb-4 mt-2"></div>
        )}

        {/* Description (Always visible) */}
        {data.description && (
          <p className="text-xs sm:text-sm font-mono text-muted-foreground/70 dark:text-white/50 mb-4 leading-relaxed max-w-[95%] line-clamp-2">
            {data.description}
          </p>
        )}

        {/* Tags / Tabs */}
        {data.tags && data.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-auto">
            {data.tags.map((tag, i) => (
               <span key={tag} className="px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 text-[9px] sm:text-[10px] font-mono text-foreground/60 dark:text-white/50 bg-black/5 dark:bg-white/5 hover:border-primary/50 hover:text-primary hover:bg-primary/10 transition-colors uppercase tracking-[0.1em] font-semibold">
                 {(i + 1).toString().padStart(2, '0')} {tag}
               </span>
            ))}
          </div>
        )}
      </div>
    </a>
  )
}
