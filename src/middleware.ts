import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './services/session';
import {
  ADMIN_PROTECTED_ROUTES,
  AUTH_ROUTES,
  GENERAL_ADMIN_PROTECTED_ROUTES,
  PHARMACY_MANAGER_PROTECTED_ROUTES,
  PROTECTED_ROUTES,
} from './constants/routes';

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = PROTECTED_ROUTES.some((p) => path.includes(p));
  const isProtectedGeneralAdminRoute = GENERAL_ADMIN_PROTECTED_ROUTES.some(
    (p) => path.includes(p)
  );
  const isProtectedAdminRoute = ADMIN_PROTECTED_ROUTES.some((p) =>
    path.includes(p)
  );
  const isProtectedManagerRoute = PHARMACY_MANAGER_PROTECTED_ROUTES.some((p) =>
    path.includes(p)
  );
  const isAuthRoute = AUTH_ROUTES.some((p) => path.includes(p));

  const session = await getSession();

  if ((isProtectedRoute && !session?.user) || (isAuthRoute && session?.user)) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  if (
    isProtectedAdminRoute &&
    isProtectedGeneralAdminRoute &&
    session.user?.role !== 'admin'
  ) {
    return NextResponse.redirect(new URL('/admin/login', req.nextUrl));
  }

  if (
    isProtectedManagerRoute &&
    isProtectedGeneralAdminRoute &&
    session.user?.role !== 'pharmacyManager'
  ) {
    return NextResponse.redirect(new URL('/admin/login', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
