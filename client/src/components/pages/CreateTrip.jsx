import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '../ui/input';
import { SelectBudgetOptions, SelectDisability, SelectTravelList } from '@/constants/options';
import { Button } from '../ui/button';
import FlightCard from '../shared/FlightCard';

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

// Create a mapping of airport codes to city names
// const airportMapping = indianAirports.reduce((acc, entry) => {
//   const [code, city] = entry.split('-');
//   acc[city.trim()] = code.trim(); // Store city name as key and code as value
//   return acc;
// }, {});

const CreateTrip = () => {
  const [inputValue, setInputValue] = useState('');
  const [fromInputValue, setFromInputValue] = useState('');
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [sourceSuggestions, setSourceSuggestions] = useState([]);
  const [formData, setFormData] = useState({
    fromID: '',
    toID: '',
    noOfDays: '',
    budget: '',
    travelCompanion: '',
    disability: '',
    departureDate: ''
  });
  const [flights, setFlights] = useState([]); // State for flight data

  const handleInputChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSourceChange = async (e) => {
    const newInputValue = e.target.value;
    setFromInputValue(newInputValue);
    handleInputChange('fromID', newInputValue);

    if (newInputValue) {
      try {
        const response = await axios.get(`http://localhost:3000/api/autocomplete`, {
          params: { input: newInputValue },
        });
        setSourceSuggestions(response.data.predictions);
      } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
      }
    } else {
      setSourceSuggestions([]);
    }
  };

  const handleDestinationChange = async (e) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);
    handleInputChange('toID', newInputValue);

    if (newInputValue) {
      try {
        const response = await axios.get(`http://localhost:3000/api/autocomplete`, {
          params: { input: newInputValue },
        });
        setDestinationSuggestions(response.data.predictions);
      } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
      }
    } else {
      setDestinationSuggestions([]);
    }
  };

  const handleSourceSuggestionClick = (suggestion) => {
    let destination = suggestion.description.trim();

    indianAirports.forEach((airport) => {
      const [code, city] = airport.split('-');
      const regex = new RegExp(`\\b${city}\\b`, 'i'); // Create a regex to match city names case-insensitively
  
      if (regex.test(destination)) {
        // Replace the city name with the formatted 'code-city' in the destination
        destination = `${code}.AIRPORT`; // Only keep code-city
      }
    });

    setFromInputValue(suggestion.description);
    setSourceSuggestions([]);
    handleInputChange('fromID', destination);
  };

  const handleSuggestionClick = (suggestion) => {
    let destination = suggestion.description.trim();
  
    // Loop through the indianAirports array to find a match
    indianAirports.forEach((airport) => {
      const [code, city] = airport.split('-');
      const regex = new RegExp(`\\b${city}\\b`, 'i'); // Create a regex to match city names case-insensitively
  
      if (regex.test(destination)) {
        // Replace the city name with the formatted 'code-city' in the destination
        destination = `${code}.AIRPORT`; // Only keep code-city
      }
    });
  
    setInputValue(suggestion.description); // Set the updated destination as inputValue
    setDestinationSuggestions([]); // Clear suggestions after selection
    
    // Update formData with the modified destination
    handleInputChange('toID', destination);
  };
  

  const handleGenerateTrip = async () => {
    const adults = 1;
    const children = 0;
    const sort = formData.budget === 'Cheap' ? 'cheapest' : 
                 formData.budget === 'Moderate' ? 'fastest' : 
                 'best';
    const cabinClass = formData.budget === 'Cheap' ? 'economy' : 
                       formData.budget === 'Moderate' ? 'PREMIUM_ECONOMY' : 
                       'first_class';

    try {
      const response = await axios.get(`http://localhost:3000/search-flights`, {
        params: {
          fromId: formData.fromID,
          toId: formData.toID,
          departDate: formData.departureDate,
          adults,
          children,
          sort,
          cabinClass,
          currency_code: 'INR' // Adjust as needed for your application
        },
      });
      setFlights(response.data); // Set flight data to state
    } catch (error) {
      console.error('Error fetching flight data:', error);
    }
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h1 className='font-bold text-3xl'>Tell us about your travel preferences</h1>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information and our trip planner will generate a customized trip based on your preferences.
      </p>

      <div className='mt-20 flex flex-col gap-10'>
        {/* Source Location Input */}
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your source location?</h2>
          <Input 
            placeholder="Enter source location"
            value={fromInputValue}
            onChange={handleSourceChange}
          />
          {sourceSuggestions.length > 0 && (
            <div className="bg-white border rounded-lg shadow-lg mt-2">
              {sourceSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSourceSuggestionClick(suggestion)}
                >
                  {suggestion.description}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Destination Input */}
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          <Input 
            placeholder="Enter destination"
            value={inputValue}
            onChange={handleDestinationChange}
          />
          {destinationSuggestions.length > 0 && (
            <div className="bg-white border rounded-lg shadow-lg mt-2">
              {destinationSuggestions.map((suggestion, index) => (
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

        {/* No. of Days Input */}
        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input placeholder={'E.g.: 3'} type='number' onChange={(e) => handleInputChange('noOfDays', e.target.value)}/>
        </div>

        {/* Departure Date Input */}
        <div>
          <h2 className='text-xl my-3 font-medium'>Enter departure date</h2>
          <Input 
            type='date' 
            onChange={(e) => handleInputChange('departureDate', e.target.value)} 
            required 
          />
        </div>

        {/* Budget Options */}
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
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

        {/* Travel Companion Options */}
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

        {/* Disability Options */}
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

        <div className='mt-10'>
          <Button onClick={handleGenerateTrip}>Generate Trip</Button>
        </div>

        {/* Render Flight Cards */}
        {flights.length > 0 && (
          <div className='mt-10'>
            {flights.map((flight, index) => (
              <FlightCard key={index} flight={flight} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTrip;