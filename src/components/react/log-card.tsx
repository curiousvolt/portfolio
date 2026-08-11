import type { CollectionEntry } from 'astro:content'
import { Terminal, Activity, CheckCircle, Layers, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { MatrixRain, Waveform, Eclipse } from './log-animations'

const getLogVisuals = (status: string) => {
  const baseVisuals = { colorClass: 'text-primary', hex: '#eab308', badge: 'border-primary/50 text-primary bg-primary/10' }
  
  switch (status.toLowerCase()) {
    case 'active':
      return { icon: 'lucide:terminal', ...baseVisuals }
    case 'prototyping':
      return { icon: 'lucide:activity', ...baseVisuals }
    case 'shipped':
      return { icon: 'lucide:check-circle', ...baseVisuals }
    default:
      return { icon: 'lucide:terminal', ...baseVisuals }
  }
}

const IconMap: Record<string, any> = {
  'lucide:terminal': Terminal,
  'lucide:activity': Activity,
  'lucide:check-circle': CheckCircle,
}

const renderAnimation = (icon: string, hexColor: string) => {
  switch (icon) {
    case 'lucide:terminal': return <MatrixRain color={hexColor} />
    case 'lucide:activity': return <Waveform color={hexColor} />
    case 'lucide:check-circle': return <Eclipse color={hexColor} />
    default: return null
  }
}

export const LogCard = ({ log, compactMobile = false }: { log: CollectionEntry<'logs'>, compactMobile?: boolean }) => {
  const data = log.data
  const visuals = getLogVisuals(data.status)
  const IconComponent = IconMap[visuals.icon] || Layers

  return (
    <a href={`/logs/${log.id}`} className="block group p-4 rounded-2xl border border-border/50 bg-card/20 hover:bg-secondary/30 hover:border-border/80 transition-all duration-300 relative overflow-hidden">
      
      {/* Top Row: Icon + Badges */}
      <div className="flex items-center gap-3 mb-3 relative z-10">
        <IconComponent size={20} className={`${visuals.colorClass} shrink-0`} strokeWidth={2} />
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className={`uppercase text-[10px] tracking-wider font-bold ${visuals.badge}`}>
            {data.status}
          </Badge>
          {data.tags && data.tags.map(tag => (
             <Badge key={tag} variant="secondary" className="uppercase text-[10px] tracking-wider font-medium text-muted-foreground bg-secondary/50">
               {tag}
             </Badge>
          ))}
        </div>
      </div>

      {/* Title */}
      <h3 className="relative z-10 text-base font-mono font-bold text-foreground mb-1 sm:pr-8 group-hover:text-primary transition-colors duration-200">
        {data.title}
      </h3>

      {/* Description */}
      <p className={`relative z-10 text-sm leading-relaxed text-muted-foreground line-clamp-2 sm:pr-8 ${compactMobile ? 'hidden sm:block' : ''}`}>
        {data.description}
      </p>

      {/* Hover Arrow (Bottom Right) */}
      <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10">
        <div className="w-9 h-9 rounded-full bg-secondary border border-border/50 flex items-center justify-center shadow-sm">
          <ArrowRight size={18} className="text-foreground" />
        </div>
      </div>

    </a>
  )
}
