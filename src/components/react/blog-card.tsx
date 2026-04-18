import { Badge } from '@/components/ui/badge'
import { Hash } from 'lucide-react'
import type { CollectionEntry } from 'astro:content'

const BlogCardJSX = ({ entry }: { entry: CollectionEntry<'blog'> }) => {
  return (
    <div className="group rounded-xl border border-border/60 p-4 transition-all duration-300 ease-out hover:border-border hover:bg-secondary/40 hover:shadow-md hover:-translate-y-0.5">
      <a
        href={`/${entry.collection}/${entry.id}`}
        className="flex flex-col gap-4 sm:flex-row"
      >
        <div className="grow">
          <h3 className="mb-1 text-lg font-medium transition-colors duration-200 group-hover:text-primary">{entry.data.title}</h3>
          <p className="text-muted-foreground mb-2 text-sm leading-relaxed">
            {entry.data.description}
          </p>

          {entry.data.tags && (
            <div className="flex flex-wrap gap-2">
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
