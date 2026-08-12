import type { CollectionEntry } from 'astro:content'

export const LogCard = ({ 
  log, 
  index = 0, 
  total = 4, 
  compactMobile = false 
}: { 
  log: CollectionEntry<'logs'>, 
  index?: number, 
  total?: number, 
  compactMobile?: boolean 
}) => {
  const data = log.data
  
  const idxStr = (index + 1).toString().padStart(2, '0')
  const totalStr = total.toString().padStart(2, '0')

  return (
    <a href={`/logs/${log.id}`} className="block group p-6 sm:p-8 rounded-[24px] border border-white/5 bg-[#0a0a0a] hover:border-white/10 hover:bg-[#0c0c0c] transition-all duration-500 relative overflow-hidden text-left shadow-2xl">
      
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.4] mix-blend-overlay pointer-events-none transition-opacity duration-500 group-hover:opacity-[0.6]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      ></div>
      
      {/* Subtle Glow */}
      <div className={`absolute -top-[50%] -left-[20%] w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#48b5b5]/10 via-transparent to-transparent opacity-40 z-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-70`}></div>
      <div className={`absolute -bottom-[50%] -right-[20%] w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#eab308]/5 via-transparent to-transparent opacity-30 z-0 pointer-events-none`}></div>

      {/* Top right index */}
      <div className="absolute top-6 right-6 z-10 font-mono text-[10px] sm:text-xs tracking-[0.2em] text-white/40 uppercase font-medium">
        {idxStr} / {totalStr}
      </div>

      <div className="relative z-10 flex flex-col h-full mt-4 sm:mt-6">
        {/* Sub-heading */}
        <div className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.15em] mb-4 uppercase text-[#48b5b5]">
          // {data.status}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-tight max-w-[90%]">
          {data.title}
        </h3>

        {/* Description */}
        <p className={`text-xs sm:text-sm font-mono text-white/60 mb-8 leading-relaxed max-w-[95%] ${compactMobile ? 'hidden sm:block' : ''}`}>
          {data.description}
        </p>

        <div className="h-px bg-white/5 w-full mb-6"></div>

        {/* Tags / Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-auto">
          {data.tags && data.tags.map((tag, i) => (
             <span key={tag} className="px-4 py-2 rounded-full border border-white/10 text-[9px] sm:text-[10px] font-mono text-white/50 bg-white/5 hover:border-[#48b5b5]/50 hover:text-[#48b5b5] hover:bg-[#48b5b5]/10 transition-colors uppercase tracking-[0.1em] font-semibold">
               {(i + 1).toString().padStart(2, '0')} {tag}
             </span>
          ))}
        </div>
      </div>
    </a>
  )
}
