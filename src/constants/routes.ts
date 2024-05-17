export const PUBLIC_API_ROUTES = [
  '/auth/register',
  '/auth/login',
  '/auth/oauth/google',
  '/auth/verify',
  '/auth/logout',
  '/products',
  '/categories',
  '/doctors/verified',
  '/specialists',
  '/auth/verify/resend',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/verify',
];

export const AUTH_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/auth',
  '/admin/login',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/verify',
];

export const PROTECTED_ROUTES = ['/profile', '/consult'];

export const GENERAL_ADMIN_PROTECTED_ROUTES = ['/admin/dashboard'];

export const ADMIN_PROTECTED_ROUTES = ['/admin/user', '/admin/doctor'];

export const PHARMACY_MANAGER_PROTECTED_ROUTES = [
  '/admin/pharmacy',
  '/admin/stock-mutation',
];
