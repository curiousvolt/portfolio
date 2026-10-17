/**
 * Client-side role management for CuriousVolt.
 * Supports: 'pe' (Product Engineer - default) and 'pm' (Product Manager).
 * Reads from URL ?role=pm / ?role=pe and session.
 * Clean: does NOT pollute localStorage across browser restarts/normal browsing.
 */

export type UserRole = 'pe' | 'pm'

export const ROLE_STORAGE_KEY = 'cv_active_role'

export function getActiveRole(): UserRole {
  if (typeof window === 'undefined') return 'pe'

  try {
    // Clear legacy localStorage to prevent sticky PM mode during normal browsing
    if (localStorage.getItem(ROLE_STORAGE_KEY)) {
      localStorage.removeItem(ROLE_STORAGE_KEY)
    }

    const params = new URLSearchParams(window.location.search)
    const roleParam = params.get('role')?.toLowerCase()

    if (roleParam === 'pm') {
      sessionStorage.setItem(ROLE_STORAGE_KEY, 'pm')
      return 'pm'
    } else if (roleParam === 'pe') {
      sessionStorage.removeItem(ROLE_STORAGE_KEY)
      return 'pe'
    }

    const stored = sessionStorage.getItem(ROLE_STORAGE_KEY)
    if (stored === 'pm') return 'pm'
  } catch (e) {
    // ignore storage access issues
  }

  return 'pe'
}

export function setActiveRole(role: UserRole) {
  if (typeof window === 'undefined') return
  try {
    if (role === 'pm') {
      sessionStorage.setItem(ROLE_STORAGE_KEY, 'pm')
    } else {
      sessionStorage.removeItem(ROLE_STORAGE_KEY)
    }
    if (typeof history !== 'undefined' && history.replaceState) {
      const url = new URL(window.location.href)
      if (role === 'pm') {
        url.searchParams.set('role', 'pm')
      } else {
        url.searchParams.delete('role')
      }
      history.replaceState(null, '', url.toString())
    }
    window.dispatchEvent(new CustomEvent('cv_role_changed', { detail: { role } }))
  } catch (e) {
    // ignore
  }
}
