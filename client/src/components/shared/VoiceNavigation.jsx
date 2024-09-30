import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useNavigate } from 'react-router-dom';

const VoiceNavigation = () => {
  const navigate = useNavigate();
  const commands = [
    {
      command: 'Go to *',
      callback: (page) => handleNavigation(page)
    },
    // Add more commands as needed
  ];

  const { transcript } = useSpeechRecognition({ commands });

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  const handleNavigation = (page) => {
    const lowercasePage = page.toLowerCase();
    switch (lowercasePage) {
      case 'home':
        navigate('/');
        break;
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'flights':
        navigate('/flights');
        break;
      case 'hotels':
        navigate('/hotels');
        break;
      case 'create trip':
        navigate('/createtrip');
        break;
      default:
        console.log('Unknown page');
    }
  };

  return null; // This component doesn't render anything visible
};

export default VoiceNavigation;