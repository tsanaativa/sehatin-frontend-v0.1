import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './services/session';
import { AUTH_ROUTES, PROTECTED_ROUTES } from './constants/routes';

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = PROTECTED_ROUTES.some((p) => path.includes(p));
  const isAuthRoute = AUTH_ROUTES.some((p) => path.includes(p));

  const session = await getSession();

  if ((isProtectedRoute && !session?.user) || (isAuthRoute && session?.user)) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
