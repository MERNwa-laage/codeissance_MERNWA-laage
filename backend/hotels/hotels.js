import http from 'https';

// Function to get hotels and itinerary
export const getHotelsAndItinerary = async (hotelData) => {
    // Destructure the necessary properties
    const { locationDescription } = hotelData;

    // Construct the path dynamically using locationDescription
    const options = {
        method: 'GET',
        hostname: 'booking-com15.p.rapidapi.com',
        port: null,
        path: `/api/v1/hotels/searchDestination?query=${encodeURIComponent(locationDescription)}`, // encode location
        headers: {
            'x-rapidapi-key': '781d6b5670msh3c1fc65760e429ap11a851jsn362da7e3678c',
            'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
        }
    };

    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            const chunks = [];

            res.on('data', (chunk) => {
                chunks.push(chunk);
            });

            res.on('end', () => {
                const body = Buffer.concat(chunks).toString();
                try {
                    // Assuming the API response is JSON, attempt to parse it
                    const parsedResponse = JSON.parse(body);
                    console.log(parsedResponse); // Log the response for debugging

                    // Process and return hotel information (adjust as per response structure)
                    if (parsedResponse && Array.isArray(parsedResponse.data)) {
                        const hotels = parsedResponse.results.map(hotel => ({
                            name: hotel.hotelName,
                            address: hotel.hotelAddress,
                            image: hotel.hotelImageUrl,
                            rating: hotel.rating,
                            pricing: hotel.PriceINR,
                            coordinates: hotel.geoCoordinates
                        }));
                        resolve(hotels);
                    } else {
                        reject(new Error("Unexpected structure: 'results' is not an array."));
                    }
                } catch (error) {
                    reject(new Error("Error parsing JSON response: " + error.message));
                }
            });
        });

        req.on('error', (error) => {
            console.error('Error fetching hotels and itinerary:', error);
            reject(new Error(error.message));
        });

        req.end();
    });
};
