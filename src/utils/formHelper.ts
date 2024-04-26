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
