import { Button } from '@/components/ui/button'
import { SunIcon, MoonIcon } from 'lucide-react'
import { useEffect } from 'react'

const ThemeToggle: React.FC = () => {
  useEffect(() => {
    const theme = (() => {
      const localStorageTheme = localStorage?.getItem('theme') ?? ''
      if (['dark', 'light'].includes(localStorageTheme)) {
        return localStorageTheme
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
      return 'light'
    })()

    if (theme === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }

    window.localStorage.setItem('theme', theme)
  }, [])

  const handleToggleClick = () => {
    const element = document.documentElement

    element.classList.add('disable-transitions')
    element.classList.toggle('dark')

    window.getComputedStyle(element).getPropertyValue('opacity')

    requestAnimationFrame(() => {
      element.classList.remove('disable-transitions')
    })

    const isDark = element.classList.contains('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  return (
    <Button
      id="theme-toggle"
      variant="secondary"
      size="icon"
      title="Toggle theme"
      onClick={handleToggleClick}
      className="cursor-pointer"
    >
      <SunIcon className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <MoonIcon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default ThemeToggle
