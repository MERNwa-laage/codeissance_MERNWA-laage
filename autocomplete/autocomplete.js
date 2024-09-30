const express = require('express');
const axios = require('axios');
const cors = require('cors')
const app = express();
const port = 5000; // You can choose any port

// Use CORS to allow requests from your frontend
app.use(cors({
    origin: 'http://localhost:5173', // Update this to match your frontend URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  }));

app.get('/api/autocomplete', async (req, res) => {
  try {
    console.log("HI");
    
    const { input } = req.query;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
      {
        params: {
          input: input,
          types: 'geocode',
          language: 'en',
          components: 'country:in',
          key: 'AIzaSyC0oYtcX6j6gBsYt0eNJstvZ9PU3ccLdMA', // Replace with your Google API key
        },
      }
    );
    console.log(response.data);
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error);
    res.status(500).send('Error fetching autocomplete suggestions');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
