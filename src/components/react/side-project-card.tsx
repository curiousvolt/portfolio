import type { CollectionEntry } from 'astro:content'

export const SideProjectCard = ({ project }: { project: CollectionEntry<'sideProjects'> }) => {
  const data = project.data;
  const isCard = data.isLargeImage;
  return (
    <div className={`block group transition-all duration-300 relative overflow-hidden flex ${isCard ? 'p-5 sm:p-6 rounded-2xl border border-border/50 bg-card/20 hover:bg-secondary/30 hover:border-border/80 flex-col sm:flex-row gap-6 mb-6' : 'flex-row gap-4 sm:gap-6 mb-8'}`}>
      <div className={`shrink-0 flex items-start justify-center ${isCard ? 'w-full sm:w-48 aspect-[2/3] -rotate-3 group-hover:rotate-0 transition-transform duration-500 origin-center' : 'w-16 h-16'} rounded-xl overflow-hidden shadow-sm mt-1 sm:mt-0`}>
        <img src={data.image.src} alt={data.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col justify-start py-0">
        <h3 className="text-xl font-bold font-custom mb-1 sm:mb-2 text-foreground">{data.title}</h3>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
          {data.description}
        </p>
        
        {data.links && data.links.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-3 mt-auto">
            {data.links.map((link, idx) => (
              <a key={idx} href={link.url} className="text-sm font-semibold text-muted-foreground underline hover:text-foreground transition-colors underline-offset-4">
                {link.name}
              </a>
            ))}
          </div>
        )}

        {data.tags && data.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {data.tags.map((tag, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-secondary/80 border border-border/50 text-[10px] font-bold text-muted-foreground rounded tracking-widest uppercase">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
