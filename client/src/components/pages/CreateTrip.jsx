import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Input } from '../ui/input';
import { SelectBudgetOptions, SelectDisability, SelectTravelList } from '@/constants/options';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const indianAirports = [
  'DEL-delhi',
  'BOM-mumbai',
  'CCU-kolkata',
  'BLR-bangalore',
  'HYD-hyderabad',
  'MAA-chennai',
  'COK-kochi',
  'AMD-ahmedabad',
  'GOI-goa',
  'JAI-jaipur',
  'PNQ-pune',
  'ATQ-amritsar',
  'CCJ-kozhikode',
  'TRV-thiruvananthapuram',
  'SXR-srinagar',
  'VTZ-visakhapatnam',
  'GWL-gwalior',
  'IDR-indore',
  'PAB-bilaspur',
  'IXA-agartala',
  'IXB-bagdogra',
  'PAT-patna',
  'IXD-dehradun',
  'CNN-kannur',
  'STV-surat',
  'BBI-bhubaneswar',
  'GAU-guwahati',
  'VNS-varanasi',
  'TRZ-tiruchirappalli',
  'NAG-nagpur',
  'IMF-imphal',
  'IXM-madurai',
  'IXZ-port blair',
  'CDP-kadapa',
  'VGA-vijayawada',
  'RJA-rajahmundry',
  'TIR-tirupati',
  'IXT-pasighat',
  'BHO-bhopal',
  'BHU-bhavnagar',
  'BHJ-bhuj',
  'BKB-bikaner',
  'GOP-gorakhpur',
  'GUX-guna',
  'HBX-hubli',
  'HSS-hissar',
  'KLH-kolhapur',
  'KTU-kota',
  'KUU-kulu',
  'IXL-leh',
  'IXI-lilabari',
  'LKO-lucknow',
  'LUH-ludhiana',
  'ISK-nasik',
  'NVY-neyveli',
  'OMN-osmanabad',
  'PGH-pantnagar',
  'IXP-pathankot',
  'PNY-pondicherry',
  'PBD-porbandar',
  'RTC-ratnagiri',
  'REW-rewa',
  'TCR-tuticorin',
  'UDR-udaipur',
  'BDQ-vadodara',
  'WGC-warangal',
];

const CreateTrip = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({
    toId: '',
    noOfDays: '',
    budget: '',
    travelCompanion: '',
    disability: ''
  });
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognitionInstance = new window.webkitSpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = handleVoiceResult;
      recognitionInstance.onend = () => setIsListening(false);

      setRecognition(recognitionInstance);
    }
  }, []);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleVoiceResult = useCallback((event) => {
    const command = event.results[0][0].transcript.toLowerCase().trim();
    console.log('Voice command:', command);

    if (command.startsWith('set destination')) {
      const destination = command.replace('set destination', '').trim();
      handleInputChange('toId', destination);
      setInputValue(destination);
      speak(`Destination set to ${destination}`);
    } else if (command.startsWith('set days')) {
      const days = command.replace('set days', '').trim();
      handleInputChange('noOfDays', days);
      speak(`Number of days set to ${days}`);
    } else if (command.startsWith('set budget')) {
      const budget = command.replace('set budget', '').trim();
      handleInputChange('budget', budget);
      speak(`Budget set to ${budget}`);
    } else if (command.startsWith('set travel companion')) {
      const companion = command.replace('set travel companion', '').trim();
      handleInputChange('travelCompanion', companion);
      speak(`Travel companion set to ${companion}`);
    } else if (command.startsWith('set disability')) {
      const disability = command.replace('set disability', '').trim();
      handleInputChange('disability', disability);
      speak(`Disability set to ${disability}`);
    } else if (command === 'generate trip') {
      handleGenerateTrip();
    } else {
      speak("I'm sorry, I didn't understand that command.");
    }
  }, [formData]);

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  const toggleListening = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
        setIsListening(false);
      } else {
        recognition.start();
        setIsListening(true);
        speak("I'm listening for your commands.");
      }
    } else {
      console.error('Speech recognition not supported');
    }
  };

  const handleInputChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDestinationChange = async (e) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);
    handleInputChange('toId', newInputValue);

    if (newInputValue) {
      try {
        const response = await axios.get(`http://localhost:3000/api/autocomplete`, {
          params: { input: newInputValue },
        });
        setSuggestions(response.data.predictions);
      } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    let destination = suggestion.description.trim();
    indianAirports.forEach((airport) => {
      const [code, city] = airport.split('-');
      const regex = new RegExp(`\\b${city}\\b`, 'i');

      if (regex.test(destination)) {
        destination = destination.replace(regex, `${code}-${city}`);
      }
    });

    setInputValue(destination);
    setSuggestions([]);
    handleInputChange('toId', destination);
  };

  const handleGenerateTrip = () => {
    console.log(formData);
    navigate('/flights', { state: { formData } });
  };

  return (
    <div>
      <Navbar/>
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h1 className='font-bold text-3xl'>Tell us about your travel preferences</h1>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information and our trip planner will generate a customized trip based on your preferences.
      </p>

      <Button
        onClick={toggleListening}
        className={`mt-5 ${isListening ? 'bg-red-500' : 'bg-blue-500'}`}
      >
        {isListening ? 'Stop Listening' : 'Start Voice Command'}
      </Button>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          <Input 
            placeholder="Enter destination"
            value={inputValue}
            onChange={handleDestinationChange}
          />
          {suggestions.length > 0 && (
            <div className="bg-white border rounded-lg shadow-lg mt-2">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.description}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input placeholder={'E.g.: 3'} type='number' value={formData.noOfDays} onChange={(e) => handleInputChange('noOfDays', e.target.value)}/>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is your budget for this trip?</h2>
          <div className='grid grid-cols-4 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div 
                key={index} 
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${formData.budget === item.title ? 'border-blue-500 bg-blue-100' : ''}`}
                onClick={() => handleInputChange('budget', item.title)}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
          <div className='grid grid-cols-4 gap-5 mt-5'>
            {SelectTravelList.map((item, index) => (
              <div 
                key={index} 
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${formData.travelCompanion === item.title ? 'border-blue-500 bg-blue-100' : ''}`}
                onClick={() => handleInputChange('travelCompanion', item.title)}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is your disability?</h2>
          <div className='grid grid-cols-4 gap-5 mt-5'>
            {SelectDisability.map((item, index) => (
              <div 
                key={index} 
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${formData.disability === item.title ? 'border-blue-500 bg-blue-100' : ''}`}
                onClick={() => handleInputChange('disability', item.title)}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className='my-10 justify-end flex'>
          <Button onClick={handleGenerateTrip}>Generate Trip</Button>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default CreateTrip;