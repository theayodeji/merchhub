import React from 'react';
import { type RouteObject } from 'react-router-dom';
import { paths } from '../config/paths';

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
  }
];
