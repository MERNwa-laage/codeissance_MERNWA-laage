// App.js
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import Flights from './components/pages/Flights';
import Login from './components/pages/Login';
import Hotels from './components/pages/Hotels';
import CreateTrip from './components/pages/CreateTrip';
import { TextToSpeechProvider } from './components/shared/useTextToSpeech';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/flights',
    element: <Flights />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/hotels',
    element: <Hotels />,
  },
  {
    path: '/createtrip',
    element: <CreateTrip />,
  },
]);

export default function App() {
  return (
    <TextToSpeechProvider>
    <div>
      <RouterProvider router={appRouter} />
    </div>
    </TextToSpeechProvider>
  );
}
