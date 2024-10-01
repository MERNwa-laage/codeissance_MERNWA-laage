// App.js

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

const tripDetails = {
  source: "New York",
  destination: "Paris",
  noOfDays: 7,
  departureDate: "2024-05-15",
  noOfPeople: 2,
  disability: "Wheelchair User"
};

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
  {
    path:'/checkout',
    element: <AppLayout><CheckoutPage tripDetails={tripDetails}/></AppLayout>
  },
]);
import VoiceNavigation from './components/VoiceNavigation';
import SignLanguageNavigation from './SignLanguageNavigation';
import CheckoutPage from './components/pages/CheckoutPage';

export default function App() {
  return (
    <TextToSpeechProvider>
    <BrowserRouter>
      <VoiceNavigation />
      <SignLanguageNavigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/createtrip" element={<CreateTrip />} />
        <Route path="/checkout" element={<CheckoutPage tripDetails={tripDetails}/>} />
      </Routes>
    </BrowserRouter>
    </TextToSpeechProvider>
  )
}