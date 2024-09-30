import React from 'react';
import Navbar from '../shared/Navbar';
import Hero from '../shared/Hero';
import AccessibleTravelGuide from '../shared/AcessibleTravelGuide';
import Chatbot from '../shared/Chatbot';

const Home = () => {
  return (
    <div>
      <Navbar/>
      <AccessibleTravelGuide/>
      <Hero/>
      <Chatbot/>
    </div>
  );
}

export default Home;
