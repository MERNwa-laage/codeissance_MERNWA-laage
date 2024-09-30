import React from 'react';
import Navbar from '../shared/Navbar';
import Hero from '../shared/Hero';
import Chatbot from '../shared/Chatbot';
import Footer from '../shared/Footer';
import AccessibleTravelGuide from '../shared/AccessibleTravelGuide';

const Home = () => {
  return (
    <div>
      <Navbar/>
      <AccessibleTravelGuide/>
      <Hero/>
      <Chatbot/>
      <Footer/>
    </div>
  );
}

export default Home;