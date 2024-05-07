import { Address } from '@/types/Address';

export function formatTime(timestamp: string) {
  const date = new Date(timestamp);
  return `${date.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' })}`;
}

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return `${date.toLocaleString('default', { day: 'numeric', month: 'short' })}${date.getFullYear() !== new Date().getFullYear() ? ` ${date.getFullYear()}` : ''}`;
}

export function formatDateTime(timestamp: string) {
  return `${formatDate(timestamp)}, ${formatTime(timestamp)}`;
}

export function formatAddress(address: Address) {
  return `${address.address}, ${address.subdistrict}, ${address.district}, ${address.city}, ${address.province}, ${address.postal_code}`;
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
  var now = new Date();
  let date = new Date(birth_date);
  var currentYear = now.getFullYear();
  var yearDiff = currentYear - date.getFullYear();
  var birthdayThisYear = new Date(currentYear, date.getMonth(), date.getDate());
  var hadBirthdayThisYear = now >= birthdayThisYear;

  return hadBirthdayThisYear ? yearDiff : yearDiff - 1;
}
