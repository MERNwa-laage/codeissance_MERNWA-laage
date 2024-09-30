import React, { useEffect, useState } from 'react';
import HotelCard from '../shared/HotelCard';
import Navbar from '../shared/Navbar';
import axios from 'axios';

const Hotels = () => {
    const [hotelData, setHotelData] = useState([]);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/hotels'); // Adjust the URL as necessary
                setHotelData(response.data); // Set the state with the fetched data
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };

        fetchHotels();
        console.log(hotelData);
        
    }, []); // Empty dependency array ensures this runs once when the component mounts

    return (
        <div>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Our Hotels</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
                    {hotelData.map((hotel, index) => (
                        <HotelCard key={index} hotel={hotel} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hotels;
