import React from 'react';
import { Carrier, Home, Sender, Login, TravelBulletin, TravelBulletinCreate, Quotations, AvailableLoads, Payments } from '@/pages';
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
      {
        icon: <Icon type="solid" name="map-marked" className="text-white"/>,
        name: 'Available Trips',
        path: '/available-trips',
        element: <TravelBulletin />,
      },
      {
        icon: <Icon type="solid" name="map-marked" className="text-white"/>,
        name: 'Available Loads',
        path: '/available-loads',
        element: <AvailableLoads />,
      },
      {
        icon: <Icon type="solid" name="paper-plane" className="text-white"/>,
        name: 'quotations',
        path: '/quotations',
        element: <Quotations />,
      },
      {
        path: '/available-trips/add',
        element: <TravelBulletinCreate />,
      },
      {
        icon: <Icon type="solid" name="cards-blank" className="text-white"/>,
        name: 'payments',
        path: '/payment',
        element: <Payments />,
      },
      
      // {
      //   icon: <Icon type="solid" name="map-marked" className="text-white"/>,
      //   name: 'trips',
      //   path: '/trips',
      //   element: <Trips />,
      // },
    ],
  },
  {
    layout: 'auth',
    pages: [
      {
        icon: <Icon type="solid" name="user" className="text-white"/>,
        name: 'signin',
        path: '/signin',
        element: <Login />,
      },
    ]
  }
];

export default routes;
