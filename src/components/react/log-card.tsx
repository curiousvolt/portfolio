import { Terminal, Activity, CheckCircle, Layers, ArrowRight } from 'lucide-react'
import type { LogEntry } from '@/consts'
import { Badge } from '@/components/ui/badge'
import { MatrixRain, Waveform, Eclipse } from './log-animations'

const IconMap: Record<string, any> = {
  'lucide:terminal': Terminal,
  'lucide:activity': Activity,
  'lucide:check-circle': CheckCircle,
}

const renderAnimation = (icon: string, colorClass: string) => {
  const hexColor = colorClass.includes('green') ? '#22c55e' : colorClass.includes('yellow') ? '#eab308' : '#a855f7'
  switch (icon) {
    case 'lucide:terminal': return <MatrixRain color={hexColor} />
    case 'lucide:activity': return <Waveform color={hexColor} />
    case 'lucide:check-circle': return <Eclipse color={hexColor} />
    default: return null
  }
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active': return 'border-green-500/50 text-green-600 dark:text-green-400 bg-green-500/10'
    case 'shipped': return 'border-blue-500/50 text-blue-600 dark:text-blue-400 bg-blue-500/10'
    case 'paused': return 'border-yellow-500/50 text-yellow-600 dark:text-yellow-400 bg-yellow-500/10'
    case 'prototyping': return 'border-orange-500/50 text-orange-600 dark:text-orange-400 bg-orange-500/10'
    default: return 'border-border text-foreground'
  }
}

export const LogCard = ({ log }: { log: LogEntry }) => {
  const IconComponent = IconMap[log.icon] || Layers
  const colorClass = log.color // e.g. text-green-500

  return (
    <a href="/logs" className="block group p-5 sm:p-6 rounded-2xl border border-border/50 bg-card/20 hover:bg-secondary/30 hover:border-border/80 transition-all duration-300 relative overflow-hidden">
      
      {/* Dynamic Background Animation */}
      {renderAnimation(log.icon, colorClass)}

      {/* Top Row: Icon + Badges */}
      <div className="flex items-center gap-4 mb-4 relative z-10">
        <IconComponent size={20} className={`${colorClass} shrink-0`} strokeWidth={2} />
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className={`uppercase text-[10px] tracking-wider font-bold ${getStatusColor(log.status)}`}>
            {log.status}
          </Badge>
          {log.tags && log.tags.map(tag => (
             <Badge key={tag} variant="secondary" className="uppercase text-[10px] tracking-wider font-medium text-muted-foreground bg-secondary/50">
               {tag}
             </Badge>
          ))}
        </div>
      </div>

      {/* Title */}
      <h3 className="relative z-10 text-xl font-medium text-foreground mb-2 pr-8 group-hover:text-primary transition-colors duration-300">
        {log.title}
      </h3>

      {/* 1-Line Description */}
      <p className="relative z-10 text-sm text-muted-foreground truncate pr-8">
        {log.description}
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
