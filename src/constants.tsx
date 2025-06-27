import { Role } from './types';
import { ReactNode } from 'react';

interface NavItem {
  path: string;
  label: string;
  icon?: ReactNode;
  role?: Role;
}

export const NAV_ITEMS: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/sales', label: 'Ventas' },
  { path: '/products', label: 'Productos' },
];
