import axios from 'axios';

const API_KEY = 'AIzaSyBFvczia282iXn0-LlBP8j-4cxxTcl4A2I';  // Replace with your actual API key

const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const data = {
    "contents": [
        {
            "role": "user",
            "parts": [
                {
                    "text": "Generate Travel Plan for Location: Mumbai, for 3 Days for a disabled Couple with a Cheap budget, Give me a Hotels (that support wheelchair assistance) options list with HotelName, Hotel address, Price INR, hotel image url, geo coordinates, rating, descriptions(which describes the assistance the hotel can provide for the person)\n and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for 3 days with each day plan with best time to visit in JSON format."
                }
            ]
        },
        {
            "role": "model",
            "parts": [
                {
                    "text": "..."
                }
            ]
        },
        {
            "role": "user",
            "parts": [
                {
                    "text": "INSERT_INPUT_HERE"
                }
            ]
        }
    ],
    "generationConfig": {
        "temperature": 1,
        "topK": 64,
        "topP": 0.95,
        "maxOutputTokens": 8192,
        "responseMimeType": "application/json"
    }
};

axios.post(url, data, {
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    console.log('Response data:', response.data.candidates[0].content.parts[0].text);
})
.catch(error => {
    console.error('Error:', error.response ? error.response.data : error.message);
});
