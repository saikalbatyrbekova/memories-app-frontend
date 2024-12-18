// src/app/router/index.jsx
import { createBrowserRouter, redirect } from 'react-router-dom';
import { sessionApi } from '@entities/session/api/sessionApi';
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';

const authLoader = async () => {
  try {
    await sessionApi.check();
    return null;
  } catch (error) {
    return redirect('/login');
  }
};

const guestLoader = async () => {
  try {
    await sessionApi.check();
    return redirect('/');
  } catch (error) {
    return null;
  }
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    loader: authLoader, // Protected route
  },
  {
    path: '/login',
    element: <LoginPage />,
    loader: guestLoader, // Guest route
  },
]);
