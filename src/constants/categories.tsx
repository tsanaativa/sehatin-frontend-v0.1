import {
  CoughBadge,
  FeverBadge,
  HeadacheBadge,
  SoreThroatBadge,
  SupplementBadge,
  VitaminBadge,
} from '@/assets/icons';
import ChildBadge from '@/assets/icons/ChildBadge';
import PregnantBadge from '@/assets/icons/PregnantBadge';
import { Category } from '@/types/Product';

type CategoryData = Category & {
  icon: React.ReactNode;
};

export const DISPLAYED_CATEGORIES: CategoryData[] = [
  {
    id: 1,
    name: 'Vitamin C',
    icon: <VitaminBadge />,
  },
  {
    id: 3,
    name: 'Obat Sakit Kepala',
    icon: <HeadacheBadge />,
  },
  {
    id: 3,
    name: 'Suplemen Daya Tahan',
    icon: <SupplementBadge />,
  },
  {
    id: 3,
    name: 'Obat Demam',
    icon: <FeverBadge />,
  },
  {
    id: 3,
    name: 'Obat Batuk',
    icon: <CoughBadge />,
  },
  {
    id: 3,
    name: 'Obat Sakit Tenggorokan',
    icon: <SoreThroatBadge />,
  },
  {
    id: 3,
    name: 'Vitamin Anak',
    icon: <ChildBadge />,
  },
  {
    id: 2,
    name: 'Vitamin Ibu Hamil',
    icon: <PregnantBadge />,
  },
];