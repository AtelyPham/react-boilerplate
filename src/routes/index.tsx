import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Home, NotFound } from '../pages';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes: React.FC<Record<string, never>> = () => {
  const { user } = useAuth();

  const commonRoutes: RouteObject[] = [{ index: true, element: <Home /> }];

  const routes = user ? protectedRoutes : publicRoutes;

  const element = useRoutes([
    ...commonRoutes,
    ...routes,
    { path: '*', element: <NotFound /> },
  ]);

  return <>{element}</>;
};

export default AppRoutes;
