/* eslint-disable react/react-in-jsx-scope */
import { RouteObject } from 'react-router-dom';
import { Login } from '../pages';

export const publicRoutes: RouteObject[] = [
  { path: '/public', element: <Login /> },
];
