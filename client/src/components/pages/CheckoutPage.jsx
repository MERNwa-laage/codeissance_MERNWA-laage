import React from 'react';

const CheckoutPage = ({ tripDetails }) => {
  // Assuming tripDetails is passed as a prop
  const { source, destination, noOfDays, departureDate, noOfPeople, disability } = tripDetails;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Trip Summary</div>
          <h1 className="block mt-1 text-lg leading-tight font-medium text-black">Final Checkout</h1>
          
          <div className="mt-4">
            <p className="text-gray-500">From: <span className="font-bold text-gray-700">{source}</span></p>
            <p className="text-gray-500">To: <span className="font-bold text-gray-700">{destination}</span></p>
            <p className="text-gray-500">Duration: <span className="font-bold text-gray-700">{noOfDays} days</span></p>
            <p className="text-gray-500">Departure: <span className="font-bold text-gray-700">{departureDate}</span></p>
            <p className="text-gray-500">Travelers: <span className="font-bold text-gray-700">{noOfPeople}</span></p>
            <p className="text-gray-500">Accessibility Needs: <span className="font-bold text-gray-700">{disability}</span></p>
          </div>

          <div className="mt-6">
            <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition duration-300">
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;