import { Address } from '@/types/Address';

export function formatTime(timestamp: string) {
  const date = new Date(timestamp);
  date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  return `${date.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' })}`;
}

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  return `${date.toLocaleString('default', { day: 'numeric', month: 'short' })}${date.getFullYear() !== new Date().getFullYear() ? ` ${date.getFullYear()}` : ''}`;
}

export function formatDateTime(timestamp: string) {
  return `${formatDate(timestamp)}, ${formatTime(timestamp)}`;
}

export function formatAddress(address: Address) {
  return `${address.address}, ${address.sub_district}, ${address.district}, ${address.city}, ${address.province}, ${address.postal_code}`;
}

export function formatYearToExp(startYear: number) {
  const yearsOfExp = new Date().getFullYear() - startYear;
  if (!!!startYear || yearsOfExp === 0) {
    return '< 1 year';
  } else if (yearsOfExp === 1) {
    return '1 year';
  } else {
    return yearsOfExp + ' years';
  }
}

export function formatBirthDateToAge(birth_date: string) {
  let now = new Date();
  let date = new Date(birth_date);
  let currentYear = now.getFullYear();
  let yearDiff = currentYear - date.getFullYear();
  let birthdayThisYear = new Date(currentYear, date.getMonth(), date.getDate());
  let hadBirthdayThisYear = now >= birthdayThisYear;

  return hadBirthdayThisYear ? yearDiff : yearDiff - 1;
}

export function formatCoordinateToLongLat(coordinate: string) {
  let coordinateStr = coordinate.slice(16, -1);
  let coordinateArr = coordinateStr.split(' ');
  return {
    longitude: parseFloat(coordinateArr[0]),
    latitude: parseFloat(coordinateArr[1]),
  };
}
