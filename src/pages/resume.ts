import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ request, redirect }) => {
  const url = new URL(request.url)
  const ref = url.searchParams.get('reference') || url.searchParams.get('ref')
  const role = url.searchParams.get('role')?.toLowerCase()

  const isPM = role === 'pm'
  const basePath = isPM ? '/resumepm.pdf' : '/resume.pdf'
  const params = new URLSearchParams()
  if (ref) params.set('reference', ref)
  if (role) params.set('role', role)

  const query = params.toString()
  const target = query ? `${basePath}?${query}` : basePath

  return redirect(target, 307)
}
