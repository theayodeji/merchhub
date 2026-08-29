import React from 'react';
import { type RouteObject } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { paths } from '../config/paths';
import { CreatorDashboardLayout } from '../components/layout/CreatorDashboardLayout';

const DashboardHome = React.lazy(() => import('../pages/Dashboard/DashboardHome'));
const Onboarding = React.lazy(() => import('../pages/Onboarding/Onboarding'));

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
