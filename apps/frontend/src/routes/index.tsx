import { useRoutes, Navigate } from 'react-router-dom';
import { publicRoutes } from './public';
import { protectedRoutes } from './protected';
import { paths } from '../config/paths';

export const AppRoutes = () => {
  // Combine all routes and add a catch-all redirect for undefined paths
  const element = useRoutes([
    ...publicRoutes, 
    ...protectedRoutes,
    { path: '*', element: <Navigate to={paths.app.dashboard.getHref()} replace /> }
  ]);
  
  return <>{element}</>;
};
