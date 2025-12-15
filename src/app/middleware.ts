// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get auth token from cookies
  const authToken = request.cookies.get('auth-token')?.value
  const userRole = request.cookies.get('user-role')?.value

  // Public routes that don't require authentication
  const publicRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/otp',
    '/auth/forgot-password',
    '/auth/reset-password',
  ]

  // Check if current path is a public route
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  // Admin dashboard routes
  const isAdminRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/admin')

  // If user is not authenticated and trying to access protected routes
  if (!authToken && !isPublicRoute) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If user is authenticated and trying to access auth pages
  if (authToken && isPublicRoute) {
    // Redirect based on user role
    if (userRole === 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } else {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // If user is authenticated but trying to access admin routes without admin role
  if (authToken && isAdminRoute && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
}