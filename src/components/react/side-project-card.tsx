import type { SideProject } from '@/consts'

export const SideProjectCard = ({ project }: { project: SideProject }) => {
  return (
    <div className="block group p-5 sm:p-6 rounded-2xl border border-border/50 bg-card/20 hover:bg-secondary/30 hover:border-border/80 transition-all duration-300 relative overflow-hidden flex flex-col sm:flex-row gap-6 mb-6">
      <div className={`shrink-0 flex items-start justify-center ${project.isLargeImage ? 'w-full sm:w-48 aspect-[2/3]' : 'w-16 h-16'} rounded-xl overflow-hidden shadow-sm`}>
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col justify-center py-2">
        <h3 className="text-xl font-bold font-custom mb-3 text-foreground dark:text-blue-400">{project.title}</h3>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
          {project.description}
        </p>
        
        {project.links && project.links.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-3 mt-auto">
            {project.links.map((link, idx) => (
              <a key={idx} href={link.url} className="text-sm font-semibold text-muted-foreground underline hover:text-foreground transition-colors underline-offset-4">
                {link.name}
              </a>
            ))}
          </div>
        )}

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag, idx) => (
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
