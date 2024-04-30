import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUser } from './utils/auth';

export function middleware(request: NextRequest) {
  if (!!getUser()) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/profile/:path*', '/my-cart/:path*', '/admin/:path*'],
};
