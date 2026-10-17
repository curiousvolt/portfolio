import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ request, redirect }) => {
  const url = new URL(request.url)
  const ref = url.searchParams.get('reference') || url.searchParams.get('ref')
  const target = ref ? `/resumepm.pdf?reference=${encodeURIComponent(ref)}` : '/resumepm.pdf'
  return redirect(target, 307)
}
