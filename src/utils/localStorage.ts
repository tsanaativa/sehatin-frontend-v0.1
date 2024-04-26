const get = <T>(key: string): T => JSON.parse(localStorage.getItem(key)!);

const set = <T>(key: string, data: T): void =>
  localStorage.setItem(key, JSON.stringify(data));

const remove = (key: string): void => localStorage.removeItem(key);

const local = { get, set, remove };
export default local;
