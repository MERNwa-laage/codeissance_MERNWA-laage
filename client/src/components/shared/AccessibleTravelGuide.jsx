import React, { useState } from 'react';

// PlaceCard component
const PlaceCard = ({ place }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={place.image} 
        alt={place.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
        <p className="text-gray-600 mb-2">{place.description}</p>
        <div className="mb-2">
          <strong className="text-gray-700">Accessibility Features:</strong>
          <ul className="list-disc list-inside">
            {place.accessibilityFeatures.map((feature, index) => (
              <li key={index} className="text-gray-600">{feature}</li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Rating: {place.rating}/5</span>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

// Main AccessibleTravelGuide component
const AccessibleTravelGuide = () => {
  const [disability, setDisability] = useState('');
  const [destination, setDestination] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Dummy data
  const dummyPlaces = [
    {
      id: 1,
      name: "Accessible Beach Resort",
      image: "https://example.com/beach-resort.jpg",
      description: "A beautiful beachfront resort with full wheelchair accessibility and trained staff for various disabilities.",
      accessibilityFeatures: [
        "Wheelchair ramps",
        "Accessible rooms",
        "Beach wheelchairs available",
        "Visual alarms"
      ],
      rating: 4.8
    },
    {
      id: 2,
      name: "Inclusive Adventure Park",
      image: "https://example.com/adventure-park.jpg",
      description: "An adventure park designed for all abilities, featuring adaptive equipment and sensory-friendly areas.",
      accessibilityFeatures: [
        "Adaptive zip lines",
        "Sensory-friendly quiet zones",
        "Braille signage",
        "Accessible restrooms"
      ],
      rating: 4.5
    },
    {
      id: 3,
      name: "Universal Design Museum",
      image: "https://example.com/ud-museum.jpg",
      description: "A museum showcasing universal design principles with exhibits accessible to visitors of all abilities.",
      accessibilityFeatures: [
        "Audio descriptions",
        "Tactile exhibits",
        "Sign language tours",
        "Wheelchair accessible throughout"
      ],
      rating: 4.9
    }
  ];

  const handleSearch = () => {
    // Filter the dummy data based on the search criteria
    const filteredResults = dummyPlaces.filter(place => 
      place.name.toLowerCase().includes(destination.toLowerCase()) ||
      place.accessibilityFeatures.some(feature => 
        feature.toLowerCase().includes(disability.toLowerCase())
      )
    );
    setSearchResults(filteredResults);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Accessible Travel Guide</h1>
      
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <select
          value={disability}
          onChange={(e) => setDisability(e.target.value)}
          className="flex-1 p-2 border rounded"
        >
          <option value="">Select disability</option>
          <option value="wheelchair">Wheelchair user</option>
          <option value="visual">Visual impairment</option>
          <option value="hearing">Hearing impairment</option>
          <option value="sensory">Sensory needs</option>
        </select>
        <button 
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map(place => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </div>
  );
};

export default AccessibleTravelGuide;