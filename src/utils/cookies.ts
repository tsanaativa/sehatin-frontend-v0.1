import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

const get = <T>(key: string): T =>
  JSON.parse(cookies().get(key)?.value || '""');

const set = <T>(key: string, data: T): ResponseCookies =>
  cookies().set(key, JSON.stringify(data));

const remove = (key: string): ResponseCookies => cookies().delete(key);

const cookiesStore = { get, set, remove };
export default cookiesStore;
