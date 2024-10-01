// FlightResults.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FlightCard from '../shared/FlightCard';

const FlightResults = ({ location }) => {
  const [flights, setFlights] = useState([]);
  const { fromId, toId, departDate, sort } = location.state || {};

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const adults = 1;
        const children = 0;

        // Determine the cabin class based on the sort parameter
        const cabinClass = 
          sort === "cheapest" ? "economy" :
          sort === "fastest" ? "PREMIUM_ECONOMY" :
          "first_class";

        const response = await axios.get('http://localhost:3000/search-flights', {
          params: {
            fromId,
            toId,
            departDate,
            adults,
            children,
            sort,
            cabinClass,
            currency_code: 'INR', // or any other currency code you need
          },
        });
        console.log(response.data);
        
        setFlights(response.data); // Assuming response.data contains the flight list
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, [fromId, toId, departDate, sort]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Flight Results</h1>
      {flights.length > 0 ? (
        flights.map((flight, index) => <FlightCard key={index} flight={flight} />)
      ) : (
        <p>No flights found.</p>
      )}
    </div>
  );
};

export default FlightResults;
