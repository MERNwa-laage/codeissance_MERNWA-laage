import React, { useState } from 'react';

const AccessibleTravelGuide = () => {
  const [disability, setDisability] = useState('');
  const [destination, setDestination] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', { disability, destination });
    // Implement your search logic here
  };

  return (
    <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            <span className="block text-red-500 mb-2">Accessible Travel Guide</span>
            <span className="block">Plan Your Journey with Confidence</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Find accessible destinations tailored to your needs. We provide personalized recommendations for wheelchair-friendly, braille-friendly, and more.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <select 
              className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300"
              value={disability}
              onChange={(e) => setDisability(e.target.value)}
            >
              <option value="">Select Disability</option>
              <option value="wheelchair">Wheelchair User</option>
              <option value="visual">Visually Impaired</option>
              <option value="hearing">Hearing Impaired</option>
              <option value="cognitive">Cognitive Disability</option>
            </select>
            
            <input 
              type="text" 
              placeholder="Enter Destination"
              className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            
            <button 
              className="w-full sm:w-auto bg-black text-white font-bold py-2 px-8 rounded-lg hover:bg-gray-800 transition duration-300"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibleTravelGuide;