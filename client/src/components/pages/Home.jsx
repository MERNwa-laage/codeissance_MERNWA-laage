import React from 'react';
import Navbar from '../shared/Navbar';
import Hero from '../shared/Hero';

import Chatbot from '../shared/Chatbot';

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Chatbot/>
    </div>
  );
}

export default Home;