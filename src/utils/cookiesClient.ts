import { setCookie, getCookie, deleteCookie } from 'cookies-next';

const get = <T>(key: string): T => JSON.parse(getCookie(key) || '""');

const set = <T>(key: string, data: T) => {
  setCookie(key, JSON.stringify(data));
};

const remove = (key: string) => deleteCookie(key);

const cookiesClientStore = { get, set, remove };
export default cookiesClientStore;
