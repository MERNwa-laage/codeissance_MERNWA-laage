const axios = require('axios');

const getAutocompleteSuggestions = async (input) => {
  try {
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
    return response.data;
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error);
    throw new Error('Error fetching autocomplete suggestions');
  }
};

module.exports = { getAutocompleteSuggestions };
