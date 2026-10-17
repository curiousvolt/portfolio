import { track } from '@vercel/analytics'

export interface AttributionData {
  source: string
  medium: string
  campaign?: string
  referrer: string
  landingPath: string
  timestamp: number
}

function parseReferrer(referrerUrl: string): { source: string; medium: string } {
  if (!referrerUrl) {
    return { source: 'Direct', medium: 'none' }
  }

  try {
    const url = new URL(referrerUrl)
    const hostname = url.hostname.toLowerCase()

    if (hostname.includes('instagram.com')) {
      return { source: 'Instagram', medium: 'social' }
    }
    if (hostname.includes('github.com')) {
      return { source: 'GitHub', medium: 'social' }
    }
    if (hostname.includes('linkedin.com')) {
      return { source: 'LinkedIn', medium: 'social' }
    }
    if (hostname.includes('t.co') || hostname.includes('twitter.com') || hostname.includes('x.com')) {
      return { source: 'Twitter/X', medium: 'social' }
    }
    if (hostname.includes('reddit.com')) {
      return { source: 'Reddit', medium: 'social' }
    }
    if (hostname.includes('youtube.com')) {
      return { source: 'YouTube', medium: 'social' }
    }
    if (hostname.includes('news.ycombinator.com')) {
      return { source: 'Hacker News', medium: 'community' }
    }
    if (hostname.includes('google.')) {
      return { source: 'Google', medium: 'organic' }
    }
    if (hostname.includes('bing.com')) {
      return { source: 'Bing', medium: 'organic' }
    }
    if (hostname.includes('substack.com')) {
      return { source: 'Substack', medium: 'newsletter' }
    }

    // Check if internal referral (same host)
    if (typeof window !== 'undefined' && hostname === window.location.hostname.toLowerCase()) {
      return { source: 'Internal', medium: 'internal' }
    }

    return { source: hostname, medium: 'referral' }
  } catch {
    return { source: 'Referral', medium: 'referral' }
  }
}

export function getAttribution(): AttributionData {
  if (typeof window === 'undefined') {
    return {
      source: 'Direct',
      medium: 'none',
      referrer: '',
      landingPath: '/',
      timestamp: Date.now(),
    }
  }

  const stored = sessionStorage.getItem('cv_attribution')
  if (stored) {
    try {
      return JSON.parse(stored) as AttributionData
    } catch {
      // Fallback
    }
  }

  const searchParams = new URLSearchParams(window.location.search)
  const utmSource = searchParams.get('utm_source') || searchParams.get('ref') || searchParams.get('reference') || searchParams.get('source')
  const utmMedium = searchParams.get('utm_medium')
  const utmCampaign = searchParams.get('utm_campaign') || undefined

  let source = utmSource
  let medium = utmMedium

  if (!source) {
    const parsed = parseReferrer(document.referrer)
    source = parsed.source
    medium = medium || parsed.medium
  } else {
    medium = medium || 'custom_link'
  }

  const attribution: AttributionData = {
    source: source || 'Direct',
    medium: medium || 'none',
    campaign: utmCampaign,
    referrer: document.referrer || '',
    landingPath: window.location.pathname,
    timestamp: Date.now(),
  }

  try {
    sessionStorage.setItem('cv_attribution', JSON.stringify(attribution))
  } catch {
    // Ignore quota errors
  }

  return attribution
}

export function initAnalytics() {
  if (typeof window === 'undefined') return

  // Check if initial referral visit has already been recorded this session
  const alreadyTracked = sessionStorage.getItem('cv_session_tracked')
  const attribution = getAttribution()

  if (!alreadyTracked && attribution.source !== 'Internal') {
    track('Referral Visit', {
      source: attribution.source,
      medium: attribution.medium,
      campaign: attribution.campaign || 'none',
      referrer: attribution.referrer || 'none',
      landingPath: attribution.landingPath,
    })
    sessionStorage.setItem('cv_session_tracked', 'true')
  }

  // Attach click listener for outbound and conversion links
  document.addEventListener('click', (event) => {
    const target = (event.target as HTMLElement)?.closest('a')
    if (!target) return

    const href = target.getAttribute('href')
    if (!href) return

    // Track Resume Clicks
    if (href.includes('resume') || target.hasAttribute('data-resume-link')) {
      const activeRole = localStorage.getItem('curiousvolt_role') || 'pe'
      track('Resume Click', {
        role: activeRole,
        destination: href,
        source: attribution.source,
      })
      return
    }

    // Track Outbound Social / External Links
    if (href.startsWith('http://') || href.startsWith('https://')) {
      try {
        const url = new URL(href)
        if (url.hostname !== window.location.hostname) {
          track('Outbound Link', {
            destination: url.hostname,
            url: href,
            label: target.getAttribute('aria-label') || target.innerText?.trim() || url.hostname,
          })
        }
      } catch {
        // Ignore URL parsing errors
      }
    }
  }, { capture: true })
}

export function trackEvent(name: string, data?: Record<string, string | number | boolean | null>) {
  try {
    track(name, data)
  } catch (err) {
    console.debug('[Analytics] Failed to track event:', name, err)
  }
}
