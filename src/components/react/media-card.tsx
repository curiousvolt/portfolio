import type { CollectionEntry } from 'astro:content'
import { ArrowUpRight } from 'lucide-react'

export const MediaCard = ({ item }: { item: CollectionEntry<'media'> }) => {
  const data = item.data;
  return (
    <a href={data.url} target="_blank" rel="noopener noreferrer" className="block group w-48 sm:w-56 shrink-0 cursor-pointer text-left">
      {/* Image container with bottom-right circular cutout */}
      <div className="relative w-full aspect-[4/5] rounded-[20px] rounded-br-none overflow-hidden bg-secondary/30 mb-4 transition-all duration-500">
        <img src={data.image.src} alt={data.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        
        {/* Exact CSS trick from user's snippet */}
        <style>{`
          .cutout-mask-${data.title.replace(/\s+/g, '-').toLowerCase()} {
            border-top-left-radius: 50%;
          }
          .cutout-mask-${data.title.replace(/\s+/g, '-').toLowerCase()}::before {
            content: "";
            position: absolute;
            bottom: 0.375rem;
            left: -1.25rem;
            background: transparent;
            width: 1.25rem;
            height: 1.25rem;
            border-bottom-right-radius: 1.25rem;
            box-shadow: 0.313rem 0.313rem 0 0.313rem var(--background);
          }
          .cutout-mask-${data.title.replace(/\s+/g, '-').toLowerCase()}::after {
            content: "";
            position: absolute;
            top: -1.25rem;
            right: 0.375rem;
            background: transparent;
            width: 1.25rem;
            height: 1.25rem;
            border-bottom-right-radius: 1.25rem;
            box-shadow: 0.313rem 0.313rem 0 0.313rem var(--background);
          }
        `}</style>
        
        <div className={`absolute -bottom-[0.375rem] -right-[0.375rem] w-[6rem] h-[6rem] bg-background z-10 cutout-mask-${data.title.replace(/\s+/g, '-').toLowerCase()}`}>
          <div className="absolute inset-[0.625rem] bg-secondary rounded-full text-secondary-foreground flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:brightness-95 shadow-sm">
            <ArrowUpRight size={24} className="draw-icon transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="px-2 pb-2">
        <h3 className="font-bold font-custom text-xl mb-1.5 text-foreground transition-colors group-hover:text-primary line-clamp-1">{data.title}</h3>
        <p className="text-sm text-muted-foreground capitalize font-medium">
          {data.type}
        </p>
      </div>
    </a>
  )
}
