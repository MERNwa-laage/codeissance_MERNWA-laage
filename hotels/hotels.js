import express from 'express';
import axios from 'axios';
import cors from 'cors'

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

const API_KEY = 'AIzaSyBFvczia282iXn0-LlBP8j-4cxxTcl4A2I'; // Replace with your actual API key

app.get('/api/hotels', async (req, res) => {
    console.log("HI");
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const data = {
        "contents": [
            {
                "role": "user",
                "parts": [
                    {
                        "text": "Generate Travel Plan for Location: Mumbai, for 3 Days for a disabled Couple with a Cheap budget, Give me a Hotels (that support wheelchair assistance) options list with HotelName, HotelAddress, PriceINR, hotelImageUrl, geoCoordinates, rating, descriptions(which describes the assistance the hotel can provide for the person)\n and suggest itinerary with placeName, PlaceDetails, PlaceImageUrl, GeoCoordinates, ticketPricing, TimeToTravel each of the location for 3 days with each day plan with best time to visit in JSON format.Make sure that there are no blank spaces between the json names"
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

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const output = response.data.candidates[0].content.parts[0].text;
        const joutput = JSON.parse(output);
        
        if (Array.isArray(joutput.hotels)) {
            const extractedHotels = joutput.hotels.map(hotel => ({
                name: hotel.HotelName,
                image: hotel.hotelImageUrl,
                rating: hotel.rating,
                description: hotel.descriptions,
                pricing: hotel.PriceINR,
            }));
            console.log("DONE");
            console.log(extractedHotels);
            
            res.json(extractedHotels); // Send the extracted hotels as a JSON response
        } else {
            res.status(400).json({ error: "Unexpected structure: hotels is not an array." });
        }
    } catch (error) {
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
