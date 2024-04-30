import ChildBadge from '@/assets/icons/ChildBadge';
import ENTBadge from '@/assets/icons/ENTBadge';
import EyeBadge from '@/assets/icons/EyeBadge';
import HeartBadge from '@/assets/icons/HeartBadge';
import LungsBadge from '@/assets/icons/LungsBadge';
import PregnantBadge from '@/assets/icons/PregnantBadge';
import SkinBadge from '@/assets/icons/SkinBadge';
import TeethBadge from '@/assets/icons/TeethBadge';
import { Specialist } from '@/types/Doctor';

type SpecialistData = Specialist & {
  icon: React.ReactNode;
};

export const DISPLAYED_SPECIALISTS: SpecialistData[] = [
  {
    id: 3,
    name: 'Sp. THT',
    icon: <ENTBadge />,
  },
  {
    id: 1,
    name: 'Sp. Kandungan & Kebidanan',
    icon: <PregnantBadge />,
  },
  {
    id: 6,
    name: 'Sp. Anak',
    icon: <ChildBadge />,
  },
  {
    id: 2,
    name: 'Sp. Kulit & Kelamin',
    icon: <SkinBadge />,
  },
  {
    id: 8,
    name: 'Dokter Gigi',
    icon: <TeethBadge />,
  },
  {
    id: 15,
    name: 'Sp. Jantung & Pembuluh Darah',
    icon: <HeartBadge />,
  },
  {
    id: 12,
    name: 'Sp. Paru',
    icon: <LungsBadge />,
  },
  {
    id: 7,
    name: 'Sp. Mata',
    icon: <EyeBadge />,
  },
];
