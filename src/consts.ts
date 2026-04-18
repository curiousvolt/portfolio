import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'CuriousVolt',
  description:
    "I’m an electrical engineer—or so I’m told. That’s the “Volt.” The “Curious” part is me poking my nose into everything else, experimenting, breaking things, and learning along the way. This is what I’ve picked up from doing, not just academics.",
  href: 'https://www.curiousvolt.is-a.dev',
  author: 'Aman Kumar',
  locale: 'en-US',
  location: 'India',
  email: 'itscuriousvolt@gmail.com'
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/',
    label: 'home',
  },
  {
    href: '/projects',
    label: 'projects',
  },
  {
    href: '/blog',
    label: 'blog',
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