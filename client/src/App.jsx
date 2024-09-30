// App.js
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import Flights from './components/pages/Flights';
import Login from './components/pages/Login';
import Hotels from './components/pages/Hotels';
import CreateTrip from './components/pages/CreateTrip';
import { TextToSpeechProvider } from './components/shared/useTextToSpeech';
import Chatbot from './components/shared/Chatbot'; // Import the Chatbot component

const AppLayout = ({ children }) => (
  <>
    {children}
    <Chatbot /> {/* Add the Chatbot component here */}
  </>
);

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
  {
    path:'/',
    element: <AppLayout><Home/></AppLayout>
  },
  {
    path:'/dashboard',
    element: <AppLayout><Dashboard/></AppLayout>
  },
  {
    path:'/flights',
    element: <AppLayout><Flights/></AppLayout>
  },
  {
    path:'/login',
    element: <AppLayout><Login/></AppLayout>
  },
  {
    path:'/hotels',
    element: <AppLayout><Hotels/></AppLayout>
  },
  {
    path:'/createtrip',
    element: <AppLayout><CreateTrip/></AppLayout>
  },
]);

export default function App() {
  return (
    <TextToSpeechProvider>
    <div>
      <RouterProvider router={appRouter} />
    </div>
    </TextToSpeechProvider>
    <RouterProvider router={appRouter}/>
  );
}