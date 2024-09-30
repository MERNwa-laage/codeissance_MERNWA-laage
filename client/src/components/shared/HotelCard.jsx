import React from 'react';

import Navbar from './Navbar';
import { Star } from 'lucide-react';

const HotelCard = ({ hotel }) => {
  return (<div>
    
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full h-48 object-cover" src={hotel.image} alt={hotel.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{hotel.name}</div>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
              <Star
                key={index}
                className={`h-5 w-5 ${
                  ratingValue <= hotel.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              />
            );
          })}
          <span className="ml-2 text-gray-600">({hotel.rating})</span>
        </div>
        <p className="text-gray-700 text-base mb-2">{hotel.description}</p>
        <p className="text-gray-900 font-bold text-xl">
          ₹{hotel.pricing} <span className="text-sm font-normal">per night</span>
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Book Now
        </button>
      </div>
    </div>
    </div>
  );
};

export default HotelCard;