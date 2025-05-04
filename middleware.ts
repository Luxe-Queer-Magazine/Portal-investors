import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Get URL information
  const url = req.nextUrl.clone()
  const path = url.pathname
  const host = req.headers.get('host') || ''
  
  // Handle custom domain
  const isCustomDomain = host.includes('invest.luxequeer.com')
  
  // Custom domain handling - redirect root to landing page
  if (isCustomDomain && path === '/') {
    url.pathname = '/landing'
    return NextResponse.redirect(url)
  }
  
  return res
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/admin/:path*',
    '/investor/:path*',
  ],
}
