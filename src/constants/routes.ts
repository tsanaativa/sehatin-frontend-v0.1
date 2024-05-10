export const PUBLIC_API_ROUTES = [
  '/auth/register',
  '/auth/login',
  '/auth/refresh-token',
  '/auth/oauth/google',
  '/auth/verify',
  '/auth/logout',
  '/products',
  '/categories',
  '/doctors/verified',
  '/specialists',
];

export const AUTH_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/auth',
  '/admin/login',
];

export const PROTECTED_ROUTES = ['/profile', '/consult'];

export const ADMIN_PROTECTED_ROUTES = [
  '/admin/dashboard',
  '/admin/user',
  '/admin/doctor',
  '/admin/pharmacy',
  '/admin/stock-mutaton',
];
