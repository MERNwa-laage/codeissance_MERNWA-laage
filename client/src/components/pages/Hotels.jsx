import React from 'react';
import HotelCard from '../shared/Hotelcard';
import Navbar from '../shared/Navbar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Hotels = () => {
    const location = useLocation();
    const [hotelData, setHotelData] = useState([]);

    useEffect(() => {
        const fetchHotels = async () => {
            if (!location.state) return;
            try {
                console.log(location.state);
                
                // Assuming location.state contains the necessary data to be sent
                const response = await axios.post('http://localhost:3000/api/hotels', location.state); // Adjust the URL as necessary
                setHotelData(response.data); // Set the state with the fetched data
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };

        fetchHotels();
    }, [location.state]); // Empty dependency array ensures this runs once when the component mounts

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