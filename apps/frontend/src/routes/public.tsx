import React from 'react';
import { type RouteObject } from 'react-router-dom';
import { paths } from '../config/paths';
import { MarketplacePage } from '../pages/public/MarketplacePage';
import { CreatorStorefrontPage } from '../pages/public/CreatorStorefrontPage';
import { ProductDetailsPage } from '../pages/public/ProductDetailsPage';
import { MockPaymentGatewayPage } from '../pages/public/MockPaymentGatewayPage';
import { OrderSuccessPage } from '../pages/public/OrderSuccessPage';

import { PublicLayout } from '../components/layout/PublicLayout';

const Login = React.lazy(() => import('../pages/Auth/Login'));
const Signup = React.lazy(() => import('../pages/Auth/Signup'));

export const publicRoutes: RouteObject[] = [
  {
    path: paths.auth.login.path,
    element: <Login />,
  },
  {
    path: paths.auth.signup.path,
    element: <Signup />,
  },
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <MarketplacePage />,
      },
      {
        path: '/:username',
        element: <CreatorStorefrontPage />,
      },
      {
        path: '/product/:id',
        element: <ProductDetailsPage />,
      },
      {
        path: '/payment/mock',
        element: <MockPaymentGatewayPage />,
      },
      {
        path: '/order-success',
        element: <OrderSuccessPage />,
      }
    ]
  }
];
