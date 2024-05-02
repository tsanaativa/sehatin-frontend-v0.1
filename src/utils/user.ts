import cookie from './publicCookie';

export function getUser() {
  const userCookies = cookie.get(process.env.NEXT_PUBLIC_USER_LOCAL_KEY || '');
  console.log(userCookies);
  return JSON.parse(userCookies);
}
