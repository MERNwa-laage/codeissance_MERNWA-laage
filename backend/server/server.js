import express from 'express';
import cors from 'cors';
import { searchFlights } from '../flights/flight.js'; // Import the function from flight.js
import {getAutocompleteSuggestions} from '../autocomplete/autocomplete.js';
import {getHotelsAndItinerary} from '../hotels/hotels.js';

const app = express();
const port = 3000;
app.use(cors());

//Flight search
app.get('/search-flights', async (req, res) => {
    const { fromId, toId, departDate, adults, children, sort, cabinClass, currency_code } = req.query;
    console.log(cabinClass);
    
    try {
        // Call the searchFlights function with query parameters
        const flights = await searchFlights(fromId, toId, departDate, adults, children, sort, cabinClass, currency_code);
        
        // Send the flight data as response
        console.log(flights);
        
        res.json(flights);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Error fetching flight data');
    }
});

//Autocomplete suggestions
app.get('/api/autocomplete', async (req, res) => {
    const { input } = req.query;
  
    try {
      // Call the getAutocompleteSuggestions function with the input
      const autocompleteSuggestions = await getAutocompleteSuggestions(input);
      
      // Send the autocomplete suggestions as a response
      res.json(autocompleteSuggestions);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Error fetching autocomplete suggestions');
    }
  });

  //Hotels
  app.get('/api/hotels', async (req, res) => {
    try {
        // Call the getHotelsAndItinerary function
        const hotels = await getHotelsAndItinerary();
        
        // Send the extracted hotels as a JSON response
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
