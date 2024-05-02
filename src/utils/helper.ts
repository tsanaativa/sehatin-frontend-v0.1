export const overflowHandler = (type: 'hidden' | 'auto') => {
  setTimeout(() => {
    const notif = document.getElementById('unregister-notif');
    const bottomNav = document.getElementById('bottom-navigation');
    if (notif) {
      notif.style.display = type == 'hidden' ? 'none' : 'block';
    }
    if (bottomNav) {
      bottomNav.style.display = type == 'hidden' ? 'none' : 'block';
    }
    document.getElementsByTagName('body')[0].style.overflow = type;
  }, 0);
};

export const longdate = (date: string): string => {
  const day = new Date(date).getDate();
  const month = new Date(date).toLocaleDateString('id-ID', { month: 'long' });
  const year = new Date(date).getFullYear();
  return [day, month, year].join(' ');
};

export const slider = (e: React.SyntheticEvent, axis = 'X'): number => {
  e.persist();
  const event: any =
    e.nativeEvent instanceof TouchEvent ? e.nativeEvent.changedTouches[0] : e;
  return axis == 'X' ? event['pageX'] : event['pageY'];
};

export const convertBlob = (blob: Blob): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
};

export const minuteDifference = (date: string): number => {
  let diff = (new Date(date).getTime() - new Date().getTime()) / 1000;
  diff /= 60;
  return Math.round((diff + Number.EPSILON) * 100) / 100;
};

export const currency = (val: number): string =>
  'Rp ' + new Intl.NumberFormat('id-ID').format(val);
