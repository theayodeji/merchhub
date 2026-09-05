import React from 'react';
import { type RouteObject } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { paths } from '../config/paths';
import { CreatorDashboardLayout } from '../components/layout/CreatorDashboardLayout';

const DashboardHome = React.lazy(() => import('../pages/Dashboard/DashboardHome'));
const Onboarding = React.lazy(() => import('../pages/Onboarding/Onboarding'));
const Settings = React.lazy(() => import('../pages/Dashboard/Settings'));
const Notifications = React.lazy(() => import('../pages/Dashboard/Notifications').then(module => ({ default: module.NotificationsPage })));
const Products = React.lazy(() => import('../pages/Dashboard/Products'));
const NewProduct = React.lazy(() => import('../pages/Dashboard/NewProduct'));
const EditProduct = React.lazy(() => import('../pages/Dashboard/EditProduct'));
const ProductDetails = React.lazy(() => import('../pages/Dashboard/ProductDetails'));
const Orders = React.lazy(() => import('../pages/Dashboard/Orders').then(module => ({ default: module.OrdersPage })));
const OrderDetails = React.lazy(() => import('../pages/Dashboard/OrderDetails'));
const ShopperPurchasesPage = React.lazy(() => import('../pages/public/ShopperPurchasesPage').then(module => ({ default: module.ShopperPurchasesPage })));
import { PublicLayout } from '../components/layout/PublicLayout';

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
        path: 'notifications',
        element: <Notifications />,
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
      {
        path: 'products/:id',
        element: <ProductDetails />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'orders/:id',
        element: <OrderDetails />,
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
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <PublicLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'purchases',
        element: <ShopperPurchasesPage />,
      },
    ],
  }
];
