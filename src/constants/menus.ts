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

export const ADMIN_MENUS: MENU_TYPE[] = [
  {
    label: 'Dashboard',
    link: '/admin/dashboard',
    icon: 'LayoutDashboard',
  },
  {
    label: 'Admin',
    link: '/admin/admin',
    icon: 'UserRoundCog',
  },
  {
    label: 'Partner',
    link: '/admin/partner',
    icon: 'Store',
  },
  {
    label: 'User',
    link: '/admin/user',
    icon: 'User',
  },
  {
    label: 'Doctor',
    link: '/admin/doctor',
    icon: 'UserRoundCog',
  },
  {
    label: 'Medicine',
    link: '/admin/medicine',
    icon: 'Pill',
  },
  {
    label: 'Pharmacy',
    link: '/admin/pharmacy',
    icon: 'Store',
  },
  {
    label: 'Stock Mutation Request',
    link: '/admin/stock-mutation',
    icon: 'Archive',
  },
  {
    label: 'Order',
    link: '/admin/order',
    icon: 'ClipboardList',
  },
  {
    label: 'Sales Report',
    link: '/admin/sales-report',
    icon: 'LineChart',
  },
];

export const PATHS_MAP = {
  meds: 'Medicines',
  category: 'Category',
  search: 'Search',
  doctors: 'Doctors',
  specialist: 'Specialist',
  user: 'User',
  list: 'List',
  create: 'Create',
  update: 'Update',
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
