import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'CuriousVolt',
  description:
    "I'm an electrical engineer - or so I'm told. That's the \"Volt.\" The \"Curious\" part is me poking my nose into everything else, experimenting, breaking things, and learning along the way. This is what I've picked up from doing, not just academics.",
  href: 'https://www.curiousvolt.is-a.dev',
  author: 'Aman Kumar',
  locale: 'en-US',
  location: 'India',
  email: 'itscuriousvolt@gmail.com'
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/about',
    label: 'about',
  },
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/projects',
    label: 'projects',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/CuriousVolt?ref=personal-website',
    label: 'GitHub',
  },
  {
    href: 'mailto:itscuriousvolt@gmail.com',
    label: 'Email',
  },
  {
    href: 'tel:+919034692930',
    label: 'Phone',
  },
  {
    href: 'https://www.instagram.com/curiousvolt?ref=personal-website',
    label: 'Instagram',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  Instagram: 'lucide:instagram',
  Phone: 'lucide:phone',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}

export interface Category {
  text: string
  logo: string
}

export type Technologies = {
  'Artificial Intelligence & Machine Learning': Category[]
  'Data Science': Category[]
  'Programming Languages': Category[]
  'Algorithms & Data Structures': Category[]
  'Cloud & Deployment': Category[]
  'Development Tools': Category[]
}

export const technologies: Technologies = {
  'Artificial Intelligence & Machine Learning': [
    { text: 'AI Models', logo: 'mdi:robot-outline' },
    { text: 'Generative AI', logo: 'mdi:creation-outline' },
  ],

  'Data Science': [
    { text: 'Data Science', logo: 'mdi:database' },
    { text: 'Data Analysis', logo: 'mdi:chart-line' },
  ],

  'Programming Languages': [
    { text: 'Python', logo: 'mdi:language-python' },
    { text: 'C++', logo: 'mdi:language-cpp' },
  ],

  'Algorithms & Data Structures': [
    { text: 'Algorithms', logo: 'mdi:graph-outline' },
    { text: 'Data Structures', logo: 'mdi:sitemap-outline' },
    { text: 'Optimization', logo: 'mdi:tune-variant' },
  ],

  'Cloud & Deployment': [
    { text: 'Google Cloud', logo: 'simple-icons:googlecloud' },
  ],

  'Development Tools': [
    { text: 'Git', logo: 'mdi:git' },
    { text: 'Linux', logo: 'mdi:linux' },
    { text: 'Visual Studio Code', logo: 'mdi:visual-studio-code' },
  ],
}

export interface LogEntry {
  status: 'Active' | 'Prototyping' | 'Shipped'
  title: string
  description: string
  date: string
  tags?: string[]
  icon: string
  color: string
}

export const LOGS: LogEntry[] = [
  {
    status: 'Active',
    title: 'Shipping a terminal-style nav for the site',
    description: 'Rethinking navigation as an interactive command bar instead of static menus - testing if it makes the site feel more "product" than "portfolio."',
    date: 'Aug 2026',
    tags: [],
    icon: 'lucide:terminal',
    color: 'text-green-500'
  },
  {
    status: 'Prototyping',
    title: 'Simulating circuits in Python to explain EE concepts visually',
    description: 'Turning textbook signal-processing theory into interactive visualizations - the goal is to make abstract EE ideas click for non-engineers too.',
    date: 'Aug 2026',
    tags: [],
    icon: 'lucide:activity',
    color: 'text-yellow-500'
  },
  {
    status: 'Shipped',
    title: 'Fixed dark mode flicker + reworked load sequence',
    description: 'Cut the flash-of-unstyled-theme bug on load, improving perceived speed and first impression for new visitors.',
    date: 'Jul 2026',
    tags: [],
    icon: 'lucide:check-circle',
    color: 'text-purple-500'
  }
]

export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stars: string;
  forks: string;
  url: string;
  pushed_at?: string;
}

export const GITHUB_REPOS: GitHubRepo[] = [
  {
    name: 'Gemini-Search',
    description: 'Perplexity-style AI search built with Gemini 2.0 Flash and Grounding.',
    language: 'TypeScript',
    stars: '2.1k',
    forks: '416',
    url: '#'
  },
  {
    name: 'gemma-chat',
    description: 'Local AI chat and coding agent for Apple Silicon, powered by Gemma 4 via MLX with Ollama support.',
    language: 'TypeScript',
    stars: '1.1k',
    forks: '185',
    url: '#'
  }
];

export interface SideProject {
  title: string;
  description: string;
  image: string;
  isLargeImage: boolean;
  links?: { name: string; url: string }[];
  tags?: string[];
}

export const SIDE_PROJECTS: SideProject[] = [
  {
    title: 'Alice and Sparkle',
    description: 'One weekend, I decided to see if I could combine the AI tools I was exploring and publish a book. I used ChatGPT to help write it, Midjourney to illustrate it, and 72 hours later it was live on Amazon.',
    image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop',
    isLargeImage: true,
    links: [
      { name: 'Washington Post', url: '#' },
      { name: 'TIME Magazine', url: '#' },
      { name: 'BuzzFeed', url: '#' },
      { name: 'NBC', url: '#' },
      { name: 'Amazon', url: '#' },
      { name: 'Audible', url: '#' },
      { name: 'Apple Books', url: '#' },
    ]
  },
  {
    title: 'Letterboxd',
    description: 'Growing up with family movie nights, I went through movies like most went through books. If you\'re looking for recommendations or want to check out some of my favorites, head over to my Letterboxd!',
    image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop',
    isLargeImage: false,
    tags: ['HOBBIES']
  },
  {
    title: 'HackCampus',
    description: 'Work at a startup of your choice and live in London for free - this was an ambitious goal, but Ben Chin and I were frustrated by the lack of startups and tech companies coming to campus while we were in college. We set out to create the internship program of our dreams with Index Ventures.',
    image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop',
    isLargeImage: false,
    tags: ['SIDE PROJECTS']
  }
];
export interface MediaItem {
  title: string;
  type: 'movie' | 'book' | 'music' | 'game';
  image: string;
  url: string;
}

export const RECENT_MEDIA: MediaItem[] = [
  {
    title: 'The Almanack of Naval Ravikant',
    type: 'book',
    image: 'https://covers.openlibrary.org/b/id/10449931-L.jpg',
    url: '#'
  },
  {
    title: 'Everything is Fucked',
    type: 'book',
    image: 'https://covers.openlibrary.org/b/id/9351865-L.jpg',
    url: '#'
  },
  {
    title: 'Clouds',
    type: 'music',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/c2/38/87/c23887b2-b0db-6962-61ac-203f801c5fa3/21UMGIM08880.rgb.jpg/1000x1000bb.jpg',
    url: '#'
  }
];