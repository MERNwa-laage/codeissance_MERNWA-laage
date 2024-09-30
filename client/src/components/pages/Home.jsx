import React from 'react';
import Navbar from '../shared/Navbar';
import Hero from '../shared/Hero';
import AccessibleTravelGuide from '../shared/AcessibleTravelGuide';

const Home = () => {
  return (
    <div>
      <Navbar/>
      <AccessibleTravelGuide/>
      <Hero/>
    </div>
  );
}

export default Home;
