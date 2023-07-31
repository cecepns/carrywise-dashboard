import React from 'react';
import { Carrier, Home, Sender, Signin } from '@/pages';
import { Icon } from '@/components/atoms';

export interface PageRoutes {
  icon?: React.ReactNode;
  name?: string;
  path: string;
  element: React.ReactNode;
}

export interface Layout {
  layout: string;
  title?: string;
  pages: PageRoutes[];
}

export const routes: Layout[] = [
  {
    layout: 'dashboard',
    pages: [
      {
        icon: <Icon type="solid" name="house" className="text-white"/>,
        name: 'home',
        path: '/home',
        element: <Home />,
      },
      {
        icon: <Icon type="solid" name="user" className="text-white"/>,
        name: 'senders',
        path: '/senders',
        element: <Sender />,
      },
      {
        icon: <Icon type="solid" name="user" className="text-white"/>,
        name: 'carriers',
        path: '/carriers',
        element: <Carrier />,
      },
    ],
  },
  {
    layout: 'auth',
    pages: [
      {
        icon: <Icon type="solid" name="user" className="text-white"/>,
        name: 'signin',
        path: '/signin',
        element: <Signin />,
      },
    ]
  }
];

export default routes;
