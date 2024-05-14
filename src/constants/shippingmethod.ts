import { OfficialMethod, NonOfficialMethod } from '@/types/Cart';

const shipmentmethod: Record<
  (OfficialMethod | NonOfficialMethod)['name'],
  string
> = {
  instant: 'Official Instant',
  sameday: 'Official SameDay',
  jne: 'Jalur Nugraha Ekakurir (JNE)',
  tiki: 'Citra Van Titipan Kilat (TIKI)',
};

export default shipmentmethod;
