/* eslint-disable react/react-in-jsx-scope */
import { RouteObject } from 'react-router-dom';
import { Profile as ProfilePage } from '../pages';

export const protectedRoutes: RouteObject[] = [
  { path: '/protected', element: <ProfilePage /> },
];
