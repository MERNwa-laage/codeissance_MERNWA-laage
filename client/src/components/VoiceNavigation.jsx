// VoiceNavigation.js
import React, { useEffect } from 'react';

const VoiceNavigation = () => {
  useEffect(() => {
    console.log('VoiceNavigation mounted'); // Check if this logs

    return () => {
      console.log('VoiceNavigation unmounted'); // Check if this logs on unmount
    };
  }, []);

  return null; // This component does not render anything
};

export default VoiceNavigation;
