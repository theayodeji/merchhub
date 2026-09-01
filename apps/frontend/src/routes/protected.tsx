import React from 'react';
import { type RouteObject } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { paths } from '../config/paths';
import { CreatorDashboardLayout } from '../components/layout/CreatorDashboardLayout';

const DashboardHome = React.lazy(() => import('../pages/Dashboard/DashboardHome'));
const Onboarding = React.lazy(() => import('../pages/Onboarding/Onboarding'));
const Settings = React.lazy(() => import('../pages/Dashboard/Settings'));
const Products = React.lazy(() => import('../pages/Dashboard/Products'));
const NewProduct = React.lazy(() => import('../pages/Dashboard/NewProduct'));
const EditProduct = React.lazy(() => import('../pages/Dashboard/EditProduct'));
export const protectedRoutes: RouteObject[] = [
  {
    path: paths.app.dashboard.path,
    element: (
      <ProtectedRoute>
        <CreatorDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'products/new',
        element: <NewProduct />,
      },
      {
        path: 'products/:id/edit',
        element: <EditProduct />,
      },
    ],
  },
  {
    path: paths.app.onboarding.path,
    element: (
      <ProtectedRoute>
        <Onboarding />
      </ProtectedRoute>
    ),
  }
];
