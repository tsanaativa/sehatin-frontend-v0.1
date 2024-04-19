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
