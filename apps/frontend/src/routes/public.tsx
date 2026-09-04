import React from 'react';
import { type RouteObject } from 'react-router-dom';
import { paths } from '../config/paths';
import { Home } from '../pages/public/Home';
import { CreatorStorefrontPage } from '../pages/public/CreatorStorefrontPage';
import { ProductDetailsPage } from '../pages/public/ProductDetailsPage';
import { MockPaymentGatewayPage } from '../pages/public/MockPaymentGatewayPage';
import { OrderSuccessPage } from '../pages/public/OrderSuccessPage';

import { PublicLayout } from '../components/layout/PublicLayout';

import { SearchPage } from '../pages/public/SearchPage';
import { ShopperOrderDetailsPage } from '../pages/public/ShopperOrderDetailsPage';

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
        element: <Home />,
      },
      {
        path: '/search',
        element: <SearchPage />,
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
      },
      {
        path: '/orders/:id',
        element: <ShopperOrderDetailsPage />,
      }
    ]
  }
];
