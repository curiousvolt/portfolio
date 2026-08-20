import { useState, useEffect } from 'react'
import { GithubRepoCard } from './github-repo-card'
import { SideProjectCard } from './side-project-card'
import { MediaCard } from './media-card'
import { SITE, GITHUB_REPOS } from '@/consts'
import type { GitHubRepo } from '@/consts'
import type { CollectionEntry } from 'astro:content'
import { Folder, Github, Mail, FileText, Star, GitFork } from 'lucide-react'



export const AboutContent = ({ 
  initialGraphSvg, 
  githubData,
  sideProjects,
  media
}: { 
  initialGraphSvg?: string | null,
  githubData: { repos: GitHubRepo[], stars: string, forks: string },
  sideProjects: CollectionEntry<'sideProjects'>[],
  media: CollectionEntry<'media'>[]
}) => {
  const [activeTab, setActiveTab] = useState<'side' | 'github'>('side')
  const repos = githubData.repos
  const totalStars = githubData.stars
  const totalForks = githubData.forks
  const [graphSvg] = useState<string | null>(initialGraphSvg || null)

  // Github data is now fetched at build time in about.astro

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto py-12 px-4 sm:px-0">
      {/* Profile Header */}
      <div className="flex justify-between items-center w-full mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-20 sm:h-20 shrink-0 rounded-full overflow-hidden bg-secondary border border-border/50">
             <img src="/me.png" alt={SITE.author} fetchPriority="high" loading="eager" decoding="async" className="w-full h-full object-cover" />
          </div>
          <h1 className="font-custom text-2xl sm:text-4xl font-bold tracking-tight">{SITE.author}</h1>
        </div>

        <div className="flex items-center gap-2">
          <a 
            href="#" 
            onClick={(e) => { e.currentTarget.href = `mailto:${SITE.email}` }}
            onMouseEnter={(e) => { e.currentTarget.href = `mailto:${SITE.email}` }}
            className="group w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-secondary border border-border/30 transition-colors duration-300"
            aria-label="Email"
          >
            <Mail size={18} className="text-foreground/80 draw-icon transition-colors duration-300 group-hover:text-primary" />
          </a>
          <a href="https://twitter.com/CuriousVolt" target="_blank" className="group w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-secondary border border-border/30 transition-colors duration-300">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width={18} 
              height={18} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-foreground/80 draw-icon transition-colors duration-300 group-hover:text-primary"
            >
              <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
              <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
            </svg>
          </a>
        </div>
      </div>
      
      <p className="text-sm sm:text-lg text-foreground/80 leading-relaxed mb-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-700 break-words whitespace-normal" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
        Hi! I'm {SITE.author.split(' ')[0]}, a developer and creator based in {SITE.location}. Check out my work below and get to know me a bit through this little site!
      </p>

      <div className="w-full flex items-center gap-3 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
        <a 
          href="/resume.pdf" 
          target="_blank"
          className="group flex items-center gap-2 px-6 py-2.5 border border-border/50 bg-secondary/30 hover:bg-secondary text-foreground text-sm font-bold rounded-full transition-all duration-300"
        >
          <FileText size={16} className="text-primary group-hover:scale-110 transition-transform" />
          Download Resume
        </a>
        <a
          href="https://curiousvolt.substack.com"
          target="_blank"
          className="group flex items-center justify-center w-[42px] h-[42px] border border-border/50 bg-secondary/30 hover:bg-secondary text-foreground rounded-full transition-all duration-300"
          aria-label="Substack"
          title="Substack"
        >
          <svg role="img" viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="text-[#FF6719] group-hover:scale-110 transition-transform">
            <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
          </svg>
        </a>
      </div>

      {/* Main Tabs (Replaced) */}
      <div className="w-full mt-4 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '250ms', animationFillMode: 'both' }}>
        <div className="flex items-center gap-2 bg-secondary/20 p-1.5 rounded-full mb-12 border border-border/40 w-full max-w-sm mx-auto">
          <button 
            onClick={() => setActiveTab('side')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === 'side' ? 'bg-background text-foreground border border-border/40' : 'text-muted-foreground hover:text-foreground border border-transparent'}`}
          >
            <Folder size={16} className={activeTab === 'side' ? "text-primary" : ""} /> Weekend Builds
          </button>
          <button 
            onClick={() => setActiveTab('github')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === 'github' ? 'bg-background text-foreground border border-border/40' : 'text-muted-foreground hover:text-foreground border border-transparent'}`}
          >
            <Github size={16} className={activeTab === 'github' ? "text-primary" : ""} /> GitHub
          </button>
        </div>

        {/* PROJECTS CONTENT */}
        <div className="w-full relative min-h-[400px]">
          
          {activeTab === 'side' && (
            <div className="w-full relative min-h-[400px]">
               {sideProjects.map((project, i) => (
                 <div key={i} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}>
                   <SideProjectCard project={project} />
                 </div>
               ))}
            </div>
          )}

          {activeTab === 'github' && (
            <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6">
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                    <Github size={16} /> GITHUB BUILDS
                  </h4>
                  <p className="text-foreground/80 text-sm sm:text-base">Open-source experiments and tools I've built.</p>
                </div>
                <a href="https://github.com/CuriousVolt" target="_blank" className="text-sm font-bold text-foreground hover:underline shrink-0">View all</a>
              </div>

              <>
                  <div className="flex items-center justify-around bg-card/40 border border-border/40 rounded-2xl p-6 sm:p-8 mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
                      <div className="text-center flex gap-3 sm:gap-4 items-center">
                        <Star className="text-yellow-500" size={24} strokeWidth={2.5} /> 
                        <div className="flex items-center gap-1 sm:gap-2 text-xl sm:text-2xl font-bold">{totalStars} <span className="text-[10px] sm:text-xs text-muted-foreground font-bold uppercase tracking-widest">Stars</span></div>
                      </div>
                      <div className="text-center flex gap-3 sm:gap-4 items-center">
                        <GitFork className="text-muted-foreground" size={24} strokeWidth={2.5} /> 
                        <div className="flex items-center gap-1 sm:gap-2 text-xl sm:text-2xl font-bold">{totalForks} <span className="text-[10px] sm:text-xs text-muted-foreground font-bold uppercase tracking-widest">Forks</span></div>
                      </div>
                  </div>

                  <div className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: '250ms', animationFillMode: 'both' }}>
                    {repos.length > 0 ? repos.map((repo, i) => (
                      <GithubRepoCard key={i} repo={repo} />
                    )) : (
                      <div className="p-8 text-center text-muted-foreground">No repositories found.</div>
                    )}
                  </div>

                  {/* Mock Contribution Graph Component */}
                  <div className="w-full border border-border/40 rounded-2xl p-6 bg-card/40 flex flex-col gap-6 items-center animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: '350ms', animationFillMode: 'both' }}>
                    <div className="flex-1 w-full flex flex-col gap-2">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <div className="flex items-center gap-2 font-bold"><Github size={16}/> @CuriousVolt <span className="font-normal text-muted-foreground text-xs hidden sm:inline">Contribution Graph</span></div>
                          <div className="text-xs font-bold">1947 <span className="text-muted-foreground font-normal uppercase">2025 Total</span></div>
                        </div>
                        {/* Live Graph from Server */}
                        <div className="w-full h-32 sm:h-40 rounded-lg flex items-center justify-center p-2 sm:p-4
                            [&_rect[data-score='0']]:fill-black/10 dark:[&_rect[data-score='0']]:fill-white/10
                            [&_rect[data-score='1']]:fill-primary/30
                            [&_rect[data-score='2']]:fill-primary/50
                            [&_rect[data-score='3']]:fill-primary/80
                            [&_rect[data-score='4']]:fill-primary
                        ">
                          {graphSvg ? (
                            <div 
                              className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain" 
                              dangerouslySetInnerHTML={{ __html: graphSvg }} 
                            />
                          ) : (
                            <div className="text-muted-foreground text-sm font-bold">Failed to load graph</div>
                          )}
                        </div>
                    </div>
                  </div>
                </>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM MEDIA ROW */}
      <div className="w-full mt-24 border-t border-border/40 pt-16 animate-in fade-in duration-1000" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-8 text-center sm:text-left">Last watched / read / listened to / played</h3>
        
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
          {media.map((item, i) => (
            <div key={i} className="snap-start animate-in fade-in slide-in-from-right-8 duration-700" style={{ animationDelay: `${500 + (i * 100)}ms`, animationFillMode: 'both' }}>
                <MediaCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
