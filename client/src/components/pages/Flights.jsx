import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import Navbar from '../shared/Navbar';
import FlightCard from '../shared/FlightCard';
import { useLocation } from 'react-router-dom';

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

const Flights = () => {
  const location = useLocation();
    // const { formData } = location.state || {}; // Retrieve formData from state
  const [flightResults, setFlightResults] = useState([]);
  const [formData, setFormData] = useState({
    fromId: '',
    toId: location.state.formData.toId || '',
    departDate: '',
    returnDate: '',
    adults: '1',
    children: '0',
    sort: 'CHEAPEST',
    cabinClass: 'ECONOMY',
  });
  console.log(location.state.formData.toId);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (name, value) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fromId || !formData.toId || !formData.departDate) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    const response = { ...formData };

    try {
      setLoading(true);
      const res = await axios.get('http://localhost:3000/search-flights', { params: response });
      console.log(res.data);
      
      setFlightResults(res.data); // Update this according to your API response structure
    } catch (error) {
      console.error('Error fetching flight data:', error);
      setError('Failed to fetch flight data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-4">
        <form className="flex flex-wrap items-end gap-4" onSubmit={handleSubmit}>
          {/* From Select */}
          <Select onValueChange={(value) => handleInputChange('fromId', value)}>
            <SelectTrigger className="h-14">
              <SelectValue placeholder="Select origin" />
            </SelectTrigger>
            <SelectContent>
              {indianAirports.map(airport => {
                const [code, city] = airport.split('-');
                return (
                  <SelectItem key={code} value={`${code}.AIRPORT`}>
                    {city.charAt(0).toUpperCase() + city.slice(1)}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          {/* To Select */}
          <Select onValueChange={(value) => handleInputChange('toId', value)}>
            <SelectTrigger className="h-14">
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              {indianAirports.map(airport => {
                const [code, city] = airport.split('-');
                return (
                  <SelectItem key={code} value={`${code}.AIRPORT`}>
                    {city.charAt(0).toUpperCase() + city.slice(1)}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          {/* Departure Date */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full h-14 justify-start text-left font-normal">
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>{formData.departDate || 'Pick a date'}</span>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.departDate}
                onSelect={(date) => handleInputChange('departDate', date.toISOString().split('T')[0])}
              />
            </PopoverContent>
          </Popover>

          {/* Return Date */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full h-14 justify-start text-left font-normal">
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>{formData.returnDate || 'Pick a date'}</span>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.returnDate}
                onSelect={(date) => handleInputChange('returnDate', date.toISOString().split('T')[0])}
              />
            </PopoverContent>
          </Popover>

          {/* Adults Select */}
          <Select onValueChange={(value) => handleInputChange('adults', value)}>
            <SelectTrigger className="h-14">
              <SelectValue placeholder="1 Adult" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4].map(num => (
                <SelectItem key={num} value={num.toString()}>{num} Adult{num > 1 ? 's' : ''}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Children Select */}
          <Select onValueChange={(value) => handleInputChange('children', value)}>
            <SelectTrigger className="h-14">
              <SelectValue placeholder="0 Children" />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2, 3].map(num => (
                <SelectItem key={num} value={num.toString()}>{num} Child{num !== 1 ? 'ren' : ''}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Cabin Class Select */}
          <Select onValueChange={(value) => handleInputChange('cabinClass', value)}>
            <SelectTrigger className="h-14">
              <SelectValue placeholder="Economy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ECONOMY">Economy</SelectItem>
              <SelectItem value="PREMIUM_ECONOMY">Premium Economy</SelectItem>
              <SelectItem value="BUSINESS">Business</SelectItem>
              <SelectItem value="FIRST">First Class</SelectItem>
            </SelectContent>
          </Select>

          {/* Search Button */}
          <Button type="submit" className="w-full h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white">
            {loading ? 'Searching...' : 'Search Flights'}
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>

      <div className='mx-8 sm:mx-16 md:mx-24 mt-8'>
        {flightResults.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold mb-6">Flight Results</h2>
            <div className="w-full grid grid-cols-1 gap-8 sm:grid-cols-2">
              {flightResults.map((flight, index) => (
                <FlightCard key={index} flight={flight} />
              ))}
            </div>
          </>
        ) : (
          <h2 className="text-2xl font-bold mb-6">No Flights Available</h2>
        )}
      </div>
    </div>
  );
};

export default Flights;
