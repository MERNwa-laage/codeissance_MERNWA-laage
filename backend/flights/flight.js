import axios from 'axios';

export const searchFlights = async (fromId, toId, departDate, adults, children, sort, cabinClass, currency_code) => {
    const options = {
        method: 'GET',
        url: 'https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights',
        params: {
            fromId: fromId || 'BOM.AIRPORT',
            toId: toId || 'DEL.AIRPORT',
            departDate: departDate || '2024-10-04',
            // returnDate: returnDate || null,
            pageNo: '1',
            adults: adults || '1',
            children: children || '0,17',
            sort: sort || 'CHEAPEST',
            cabinClass: cabinClass || 'ECONOMY',
            currency_code: currency_code || 'INR',
        },
        headers: {
            'x-rapidapi-host': 'booking-com15.p.rapidapi.com',
            'x-rapidapi-key': '781d6b5670msh3c1fc65760e429ap11a851jsn362da7e3678c', // Secure this key in production!
        },
    };

    try {
        const response = await axios.request(options);

        if (response.data && response.data.data.flightOffers && response.data.data.flightOffers.length > 0) {
            const flightOffers = response.data.data.flightOffers;

            const extractedFlights = flightOffers.map(offer => {
                if (offer.segments && offer.segments.length > 0) {
                    const segment = offer.segments[0];

                    if (segment.legs && segment.legs.length > 0) {
                        const { departureTime, arrivalTime } = segment.legs[0];
                        const airline = segment.legs[0].carriersData[0].name; // Ensure this array exists and is valid
                        const flightNumber = segment.legs[0].flightInfo.flightNumber;
                        const totalCost = offer.priceBreakdown.total.units + '.' + (offer.priceBreakdown.total.nanos / 1e9).toFixed(9);
                        // const departureCity = 

                        return {
                            airline,
                            flightNumber,
                            departureTime,
                            arrivalTime,
                            totalCost: `INR ${totalCost}`, // Fixed string interpolation
                        };
                    } else {
                        return { error: 'No legs found for this segment' };
                    }
                } else {
                    return { error: 'No segments found for this offer' };
                }
            });

            return extractedFlights;
        } else {
            return { error: 'No flight offers found in the response' };
        }
    } catch (error) {
        console.log(error);
        
        console.error('Error fetching flight data:', error);
        throw new Error('Error fetching flight data');
    }
};
