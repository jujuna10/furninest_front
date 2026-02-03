import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('auth_token')
  const pathname = request.nextUrl.pathname

  if (!token && (pathname.startsWith('/profile') || pathname.startsWith('/orderCheckout'))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/orderCheckout/:path*'],
}
