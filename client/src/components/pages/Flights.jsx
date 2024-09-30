import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, PlaneTakeoff, PlaneLanding, Users } from 'lucide-react';
import Navbar from '../shared/Navbar';
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

const FlightResult=
  [
    {
      "airline": "IndiGo",
      "flightNumber": 2775,
      "departureTime": "2024-10-04T01:15:00",
      "arrivalTime": "2024-10-04T03:20:00",
      "totalCost": "INR 14104.0.91"
    },
    {
      "airline": "Vistara",
      "flightNumber": 984,
      "departureTime": "2024-10-04T01:20:00",
      "arrivalTime": "2024-10-04T03:35:00",
      "totalCost": "INR 14432.0.17"
    },
    {
      "airline": "Vistara",
      "flightNumber": 954,
      "departureTime": "2024-10-04T05:55:00",
      "arrivalTime": "2024-10-04T08:05:00",
      "totalCost": "INR 14476.0.53"
    },
    {
      "airline": "Vistara",
      "flightNumber": 928,
      "departureTime": "2024-10-04T06:30:00",
      "arrivalTime": "2024-10-04T08:40:00",
      "totalCost": "INR 14476.0.53"
    },
    {
      "airline": "Air India",
      "flightNumber": 6439,
      "departureTime": "2024-10-04T01:20:00",
      "arrivalTime": "2024-10-04T03:35:00",
      "totalCost": "INR 14856.0.53"
    },
    {
      "airline": "IndiGo",
      "flightNumber": 762,
      "departureTime": "2024-10-04T06:15:00",
      "arrivalTime": "2024-10-04T08:20:00",
      "totalCost": "INR 15260.0.79"
    },
    {
      "airline": "IndiGo",
      "flightNumber": 2224,
      "departureTime": "2024-10-04T23:30:00",
      "arrivalTime": "2024-10-05T01:35:00",
      "totalCost": "INR 15260.0.79"
    },
    {
      "airline": "IndiGo",
      "flightNumber": 2168,
      "departureTime": "2024-10-04T04:50:00",
      "arrivalTime": "2024-10-04T07:05:00",
      "totalCost": "INR 15260.0.79"
    },
    {
      "airline": "IndiGo",
      "flightNumber": 2236,
      "departureTime": "2024-10-04T03:00:00",
      "arrivalTime": "2024-10-04T05:10:00",
      "totalCost": "INR 15280.0.04"
    },
    {
      "airline": "Akasa Air",
      "flightNumber": 1410,
      "departureTime": "2024-10-04T07:50:00",
      "arrivalTime": "2024-10-04T10:05:00",
      "totalCost": "INR 15881.0.83"
    },
    {
      "airline": "Akasa Air",
      "flightNumber": 1127,
      "departureTime": "2024-10-04T12:55:00",
      "arrivalTime": "2024-10-04T15:15:00",
      "totalCost": "INR 15881.0.83"
    },
    {
      "airline": "Air India Express",
      "flightNumber": 2773,
      "departureTime": "2024-10-04T00:40:00",
      "arrivalTime": "2024-10-04T02:55:00",
      "totalCost": "INR 16175.0.62"
    },
    {
      "airline": "Air India",
      "flightNumber": 6419,
      "departureTime": "2024-10-04T06:30:00",
      "arrivalTime": "2024-10-04T08:40:00",
      "totalCost": "INR 16178.0.97"
    },
    {
      "airline": "Air India",
      "flightNumber": 613,
      "departureTime": "2024-10-04T05:30:00",
      "arrivalTime": "2024-10-04T07:25:00",
      "totalCost": "INR 16178.0.97"
    },
    {
      "airline": "Air India",
      "flightNumber": 631,
      "departureTime": "2024-10-04T15:30:00",
      "arrivalTime": "2024-10-04T16:50:00",
      "totalCost": "INR 16271.0.03"
    }
  ]


const Flights = () => {
  
  const [formData, setFormData] = useState({
    fromId: '',
    toId: '',
    departDate: '',
    returnDate:'',
    adults: '1',
    children: '0',
    sort: 'CHEAPEST',
    cabinClass: 'ECONOMY',
  });

  const handleInputChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = {
      ...formData,
      pageNo: '1',
      children: formData.children + ',17', // Assuming 17 is the max age for children
      currency_code: 'INR',
    };
    console.log(response);
  };

  return (
    <div>
      <Navbar/>
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-4">
        <form className="flex flex-wrap items-end gap-4" onSubmit={handleSubmit}>
          <div className="flex-1 min-w-[200px]">
            <Select onValueChange={(value) => handleInputChange('fromId', value)}>
              <SelectTrigger className="h-14">
                <div className="flex flex-col items-start">
                  <span className="text-sm text-gray-500">From</span>
                  <SelectValue placeholder="Select origin" />
                </div>
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
          </div>

          <div className="flex-1 min-w-[200px]">
            <Select onValueChange={(value) => handleInputChange('toId', value)}>
              <SelectTrigger className="h-14">
                <div className="flex flex-col items-start">
                  <span className="text-sm text-gray-500">To</span>
                  <SelectValue placeholder="Select destination" />
                </div>
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
          </div>

          <div className="flex-1 min-w-[200px]">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full h-14 justify-start text-left font-normal">
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-500">Departure</span>
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>{formData.departDate || 'Pick a date'}</span>
                    </div>
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
          </div>

          <div className="flex-1 min-w-[200px]">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full h-14 justify-start text-left font-normal">
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-500">Return</span>
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>{formData.returnDate|| 'Pick a date'}</span>
                    </div>
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
          </div>

          <div className="flex-1 min-w-[450px]">
            <Select onValueChange={(value) => handleInputChange('adults', value)}>
              <SelectTrigger className="h-14">
                <div className="flex flex-col items-start">
                  <span className="text-sm text-gray-500">Adults</span>
                  <SelectValue placeholder="1 Adult" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4].map(num => (
                  <SelectItem key={num} value={num.toString()}>{num} Adult{num > 1 ? 's' : ''}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[300px]">
            <Select onValueChange={(value) => handleInputChange('children', value)}>
              <SelectTrigger className="h-14">
                <div className="flex flex-col items-start">
                  <span className="text-sm text-gray-500">Children</span>
                  <SelectValue placeholder="0 Children" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3].map(num => (
                  <SelectItem key={num} value={num.toString()}>{num} Child{num !== 1 ? 'ren' : ''}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <Select onValueChange={(value) => handleInputChange('cabinClass', value)}>
              <SelectTrigger className="h-14">
                <div className="flex flex-col items-start">
                  <span className="text-sm text-gray-500">Cabin Class</span>
                  <SelectValue placeholder="Economy" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ECONOMY">Economy</SelectItem>
                <SelectItem value="PREMIUM_ECONOMY">Premium Economy</SelectItem>
                <SelectItem value="BUSINESS">Business</SelectItem>
                <SelectItem value="FIRST">First Class</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white">
            Search Flights
          </Button>
        </form>
      </div>
      <div className='mx-8 sm:mx-16 md:mx-24 mt-8'>
      <h2 className="text-2xl font-bold mb-6 mx-8">Flight Results</h2>
      <div className="w-full mx-auto p-4 grid grid-cols-1 gap-8 sm:grid-cols-2">
      {FlightResult.map((flight, index) => (
        <FlightCard key={index} flight={flight} />
      ))}
    </div>
    </div>
    </div>
  );
};

export default Flights;