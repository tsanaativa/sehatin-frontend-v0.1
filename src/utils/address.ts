import { Address } from '@/types/Address';

export function formatAddress(address: Address) {
  return `${address.address}, ${address.subdistrict}, ${address.district}, ${address.city}, ${address.province}, ${address.postal_code}`;
}
