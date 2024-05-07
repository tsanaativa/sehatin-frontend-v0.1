const set = (cname: string, cvalue: string | number, minute: number): void => {
  const d = new Date();
  d.setTime(d.getTime() + minute * 60 * 1000);
  const expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
};

const get = <T>(cname: string): T | null => {
  const name = cname + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length) as T;
    }
  }
  return '' as T;
};

const remove = (cname: string): void => set(cname, '', -1);

const cookie = { set, get, remove };
export default cookie;
