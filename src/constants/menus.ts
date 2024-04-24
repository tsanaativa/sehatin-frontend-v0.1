import { icons } from 'lucide-react';

type MENU_TYPE = {
  label: string;
  link: string;
  icon?: keyof typeof icons;
};

export const MENUS: MENU_TYPE[] = [
  {
    label: 'Home',
    link: '/',
    icon: 'Home',
  },
  {
    label: 'Medicine',
    link: '/meds',
    icon: 'Pill',
  },
  {
    label: 'Consult',
    link: '',
    icon: 'MessageSquareMore',
  },
  {
    label: 'Orders',
    link: '/profile/my-orders',
    icon: 'ClipboardList',
  },
  {
    label: 'Profile',
    link: '/profile',
    icon: 'UserRound',
  },
];

export const MEDS_PATHS_MAP = {
  meds: 'Medicines',
  category: 'Category',
  search: 'Search',
};

export const PROFILE_MENUS: MENU_TYPE[] = [
  {
    link: '/profile/my-profile',
    label: 'My Profile',
  },
  {
    link: '/profile/my-addresses',
    label: 'My Addresses',
  },
  {
    link: '/profile/my-consultation-history',
    label: 'My Consultation History',
  },
  {
    link: '/profile/my-orders',
    label: 'My Orders',
  },
];
