import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import Flights from './components/pages/Flights';
import Login from './components/pages/Login';
import Hotels from './components/pages/Hotels';
import CreateTrip from './components/pages/CreateTrip';
import VoiceNavigation from './components/VoiceNavigation';
import SignLanguageNavigation from './SignLanguageNavigation';

export default function App() {
  return (
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
      </Routes>
    </BrowserRouter>
  );
}