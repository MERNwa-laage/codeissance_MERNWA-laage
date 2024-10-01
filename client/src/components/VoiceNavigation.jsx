import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const VoiceNavigation = () => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognitionInstance = new window.webkitSpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            const command = event.results[i][0].transcript.toLowerCase().trim();
            handleVoiceCommand(command);
          }
        }
      };

      setRecognition(recognitionInstance);
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const handleVoiceCommand = useCallback((command) => {
    switch (command) {
      case 'go to home':
        navigate('/');
        break;
      case 'go to dashboard':
        navigate('/dashboard');
        break;
      case 'go to flights':
        navigate('/flights');
        break;
      case 'go to login':
        navigate('/login');
        break;
      case 'go to hotels':
        navigate('/hotels');
        break;
      case 'create trip':
        navigate('/createtrip');
        break;
      default:
        console.log('Unknown command:', command);
    }
  }, [navigate]);

  const toggleListening = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
    } else {
      console.error('Speech recognition not supported');
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={toggleListening}
        className={`p-2 rounded-full ${
          isListening ? 'bg-red-500' : 'bg-blue-500'
        } text-white`}
      >
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
    </div>
  );
};

export default VoiceNavigation;