import { createBrowserRouter, redirect } from 'react-router-dom';
import { sessionApi } from '@entities/session/api/sessionApi';
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import EntriesList from '@entities/entry/ui/EntriesList'; // Import Entries List component
import EntryCreateForm from '@entities/entry/ui/EntryCreateForm'; // Import Entry Create component
import EntryEditForm from '@entities/entry/ui/EntryEditForm'; // Import Entry Edit component

// Loaders for route protection
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

// Router configuration
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
  {
    path: '/entries',
    element: <EntriesList />, // List of entries
    loader: authLoader, // Protected route
  },
  {
    path: '/entries/create',
    element: <EntryCreateForm />, // Create entry form
    loader: authLoader, // Protected route
  },
  {
    path: '/entries/edit/:entryId',
    element: <EntryEditForm />, // Edit entry form
    loader: authLoader, // Protected route
  },
]);
