import { icons } from 'lucide-react';
type MENU_TYPE = {
  label: string;
  link: string;
  icon: keyof typeof icons;
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
    link: '/orders',
    icon: 'ClipboardList',
  },
  {
    label: 'Profile',
    link: '/profile',
    icon: 'UserRound',
  },
];

export const PROFILE_MENUS = [
  {
    path: '/profile/my-profile',
    name: 'My Profile',
  },
  {
    path: '/profile/my-addresses',
    name: 'My Addresses',
  },
  {
    path: '/profile/my-consultation-history',
    name: 'My Consultation History',
  },
  {
    path: '/profile/my-orders',
    name: 'My Orders',
  },
];
