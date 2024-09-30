import React from 'react';
import Navbar from '../shared/Navbar';
import Hero from '../shared/Hero';
import VoiceHover from './VoiceHover';

const Home = () => {
  return (
    <div>
      <VoiceHover>
        <Navbar />
        <Hero />
      </VoiceHover>
    </div>
  );
}

export default Home;