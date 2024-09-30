// VoiceNavigation.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VoiceNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('VoiceNavigation mounted');

    // Check if SpeechRecognition is supported
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      console.error('Speech Recognition not supported');
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      console.log('Voice recognition started');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log('Recognized: ', transcript);

      switch (transcript) {
        case 'go to home':
          console.log('Navigating to home');
          navigate('/');
          break;
        case 'go to dashboard':
          console.log('Navigating to dashboard');
          navigate('/dashboard');
          break;
        case 'show flights':
          console.log('Navigating to flights');
          navigate('/flights');
          break;
        case 'log in':
          console.log('Navigating to login');
          navigate('/login');
          break;
        case 'view hotels':
          console.log('Navigating to hotels');
          navigate('/hotels');
          break;
        case 'create a trip':
          console.log('Navigating to create a trip');
          navigate('/createtrip');
          break;
        default:
          console.log('Command not recognized: ', transcript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error: ', event.error);
    };

    recognition.onend = () => {
      console.log('Voice recognition ended');
      recognition.start(); // Restart recognition
    };

    recognition.start();
    console.log('Voice recognition initiated');

    return () => {
      recognition.stop();
      console.log('Voice recognition stopped');
    };
  }, [navigate]);

  return null; // This component does not render anything
};

export default VoiceNavigation;
