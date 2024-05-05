import { Address } from '@/types/Address';

export function formatTime(timestamp: string) {
  const date = new Date(timestamp);
  return `${date.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' })}`;
}

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return `${date.toLocaleString('default', { day: 'numeric', month: 'short' })}`;
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
