import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IndianRupeeIcon } from "lucide-react";
import wheelchairAccessibleIcon from '../../assets/wheelchair-accessible-sign.png'

const FlightCard = ({ flight, onSelect }) => {
  const departureDate = new Date(flight.departureTime);
  const arrivalDate = new Date(flight.arrivalTime);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getDuration = (departure, arrival) => {
    const diff = arrival.getTime() - departure.getTime();
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
  };

  const handleSelect = () =>{
    
  }

  return (
    <Card className="mb-4 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold">
              <span className="flex items-center">
                {flight.airline}
                <img 
                  src={wheelchairAccessibleIcon}
                  alt="Wheelchair Accessible"
                  className="w-6 h-6 ml-2"
                />
              </span>
            </h3>
            <p className="text-sm text-gray-500">Flight {flight.flightNumber}</p>
          </div>
          <Badge variant="outline" className="text-lg font-semibold">
            <IndianRupeeIcon className="w-4 h-4 mr-1" />
            {parseFloat(flight.totalCost.split(' ')[1]).toFixed(2)}
          </Badge>
        </div>

        <div className="flex justify-between items-center">
          {/* Departure City and Time */}
          <div className="text-center">
            <p className="text-sm text-gray-500">{flight.departureCity}</p>
            <p className="text-xl font-bold">{formatTime(departureDate)}</p>
            <p className="text-sm text-gray-500">{formatDate(departureDate)}</p>
          </div>

          {/* Duration and Non-stop indicator */}
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-500">{getDuration(departureDate, arrivalDate)}</p>
            <div className="w-32 h-0.5 bg-gray-300 my-2 relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-xs text-gray-400">Non-stop</p>
          </div>

          {/* Arrival City and Time */}
          <div className="text-center">
            <p className="text-sm text-gray-500">{flight.arrivalCity}</p>
            <p className="text-xl font-bold">{formatTime(arrivalDate)}</p>
            <p className="text-sm text-gray-500">{formatDate(arrivalDate)}</p>
          </div>
        </div>

        {/* Select Button */}
        <div className="flex justify-end mt-4">
          <button 
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleSelect} // Forward flight data
          >
            Select
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightCard;
