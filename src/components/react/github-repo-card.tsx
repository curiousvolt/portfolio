import { Star, GitFork } from 'lucide-react'
import type { GitHubRepo } from '@/consts'

export const GithubRepoCard = ({ repo }: { repo: GitHubRepo }) => {
  return (
    <a href={repo.url} target="_blank" rel="noopener noreferrer" className="block group p-5 sm:p-6 rounded-2xl border border-border/50 bg-card/20 hover:bg-secondary/30 hover:border-border/80 transition-all duration-300 mb-6">
      <div className="flex justify-between items-start gap-4 mb-2">
        <h4 className="text-lg sm:text-xl font-bold text-foreground group-hover:underline">
          {repo.name}
        </h4>
        <div className="flex flex-col items-end gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground shrink-0">
          <div className="flex items-center gap-1.5"><Star size={16} className="text-yellow-500" strokeWidth={2.5} /> {repo.stars}</div>
          <div className="flex items-center gap-1.5"><GitFork size={16} strokeWidth={2.5} /> {repo.forks}</div>
        </div>
      </div>
      <p className="text-sm sm:text-base text-foreground/80 mb-5 pr-8 sm:pr-16 line-clamp-2 leading-relaxed">
        {repo.description}
      </p>
      <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
        <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
        {repo.language}
      </div>
    </a>
  )
}
