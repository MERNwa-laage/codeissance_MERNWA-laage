import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.get('/search-flights', async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights',
    params: {
      fromId: 'BOM.AIRPORT',
      toId: 'DEL.AIRPORT',
      departDate: '2024-10-04',
      pageNo: '1',
      adults: '1',
      children: '4,17',
      sort: 'CHEAPEST',
      cabinClass: 'ECONOMY',
      currency_code: 'INR',
    },
    headers: {
      'x-rapidapi-host': 'booking-com15.p.rapidapi.com',
      'x-rapidapi-key': '4ec29fefd8mshc338b3a4826109bp180805jsn659243609fc9',
    },
  };

    // Trial
    // const options = {
    //   method: 'GET',
    //   url : "https://wheelmap.org/api/nodes?lat=40.730610&lon=-73.935242&wheelchair=yes",
    //   //  -H "Content-Type: application/json"
    //   // url: 'https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights',
    //   // params: {
    //   //   fromId: 'BOM.AIRPORT',
    //   //   toId: 'DEL.AIRPORT',
    //   //   departDate: '2024-10-04',
    //   //   pageNo: '1',
    //   //   adults: '1',
    //   //   children: '0,17',
    //   //   sort: 'CHEAPEST',
    //   //   cabinClass: 'ECONOMY',
    //   //   currency_code: 'INR',
    //   // },
    //   headers: {
    //       'Content-Type': 'application/json'
    //   //   'x-rapidapi-host': 'booking-com15.p.rapidapi.com',
    //   //   'x-rapidapi-key': '845fc046e4msh14b5336e5a961adp1283e3jsnc4eefdd9db30',
    //   },
    // };

  try {
    const response = await axios.request(options);
    // Ensure that flightOffers exists and is not empty
    if (response.data && response.data.data.flightOffers && response.data.data.flightOffers.length > 0) {
        const flightOffers = response.data.data.flightOffers;
  
        const extractedFlights = flightOffers.map(offer => {
          // Ensure segments array exists and is not empty
          if (offer.segments && offer.segments.length > 0) {
            const segment = offer.segments[0];
            
            // Ensure legs array exists and is not empty
            if (segment.legs && segment.legs.length > 0) {
              const { departureTime, arrivalTime } = segment.legs[0];
              const airline = segment.legs[0].carriersData[0].name; // Ensure this array exists and is valid
              const flightNumber = segment.legs[0].flightInfo.flightNumber;
              const totalCost = offer.priceBreakdown.total.units + '.' + offer.priceBreakdown.total.nanos / 1e9;
  
              return {
                airline,
                flightNumber,
                departureTime,
                arrivalTime,
                totalCost: `INR ${totalCost}`,
              };
            } else {
              return { error: 'No legs found for this segment' };
            }
          } else {
            return { error: 'No segments found for this offer' };
          }
        });
  
        res.json(extractedFlights);
      } else {
        res.status(404).json({ error: 'No flight offers found in the response' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching flight data', details: error.message });
    }
  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
