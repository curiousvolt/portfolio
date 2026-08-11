import { Badge } from '@/components/ui/badge'
import { Hash } from 'lucide-react'
import type { CollectionEntry } from 'astro:content'

const TEMP_IMAGE = "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop"

const BlogCardJSX = ({ entry, variant = "list" }: { entry: CollectionEntry<'blog'>, variant?: "list" | "grid" }) => {
  if (variant === "grid") {
    return (
      <a
        href={`/${entry.collection}/${entry.id}`}
        className="flex flex-col h-full w-full rounded-2xl overflow-hidden bg-card hover:shadow-lg transition-all duration-300 border border-card-foreground/10"
      >
        <div className="aspect-[16/10] w-full overflow-hidden">
          <img
            alt={entry.data.title}
            src={entry.data.image?.src || TEMP_IMAGE}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-between p-5 flex-grow">
          <div>
            <h3 className="text-xl font-medium text-foreground mb-2">{entry.data.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {entry.data.description}
            </p>
          </div>
          <div className="flex flex-wrap justify-between items-center mt-auto pt-3 border-t border-border/40">
            {entry.data.tags && (
              <div className="flex flex-wrap gap-2">
                {entry.data.tags.slice(0, 2).map((tag, index) => (
                  <span key={index} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium flex items-center gap-1">
                    <Hash size={10} />
                    {tag}
                  </span>
                ))}
                {entry.data.tags.length > 2 && (
                  <span className="text-xs px-2 py-1 rounded-full bg-secondary/80 text-primary font-medium">+{entry.data.tags.length - 2}</span>
                )}
              </div>
            )}
            <p className="text-xs font-medium text-muted-foreground flex items-center">
              {new Date(entry.data.date || Date.now()).getFullYear()}
            </p>
          </div>
        </div>
      </a>
    )
  }

  return (
    <div className="group rounded-xl border border-border/60 p-4 transition-all duration-300 ease-out hover:border-border hover:bg-secondary/40 hover:shadow-md hover:-translate-y-0.5">
      <a
        href={`/${entry.collection}/${entry.id}`}
        className="flex flex-col gap-4 sm:flex-row sm:items-center"
      >
        <div className="w-full sm:w-36 h-28 shrink-0 overflow-hidden rounded-lg">
          <img
            alt={entry.data.title}
            src={entry.data.image?.src || TEMP_IMAGE}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="grow">
          <h3 className="mb-1 text-lg font-medium transition-colors duration-200 group-hover:text-primary">{entry.data.title}</h3>
          <p className="text-muted-foreground mb-2 text-sm leading-relaxed line-clamp-2">
            {entry.data.description}
          </p>

          {entry.data.tags && (
            <div className="flex flex-wrap gap-2 mt-2">
              {entry.data.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-x-1 transition-colors duration-200 group-hover:bg-secondary"
                >
                  <Hash size={12} />
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </a>
    </div>
  )
}

export default BlogCardJSX
