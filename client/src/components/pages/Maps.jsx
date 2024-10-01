import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, MapPin, Navigation, Car, Train, Bus, Accessibility } from "lucide-react";

const AccessibleMaps = () => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [directionsService, setDirectionsService] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);
    const [heatmap, setHeatmap] = useState(null);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [travelMode, setTravelMode] = useState("WALKING");
    const [serviceType, setServiceType] = useState("hospital");
    const [accessibilityFeatures, setAccessibilityFeatures] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(0);
    const [transportOptions, setTransportOptions] = useState([]);

    useEffect(() => {
        const loadGoogleMaps = () => {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC0oYtcX6j6gBsYt0eNJstvZ9PU3ccLdMA&libraries=places,visualization&callback=initMap`;
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
        };

        window.initMap = initMap;
        loadGoogleMaps();

        return () => {
            delete window.initMap;
        };
    }, []);

    const initMap = () => {
        if (!window.google) return;

        const initialPosition = { lat: 28.6139, lng: 77.2090 }; // New Delhi coordinates
        const mapInstance = new window.google.maps.Map(mapRef.current, {
            center: initialPosition,
            zoom: 11,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
        });

        setMap(mapInstance);

        const directionsServiceInstance = new window.google.maps.DirectionsService();
        const directionsRendererInstance = new window.google.maps.DirectionsRenderer();
        directionsRendererInstance.setMap(mapInstance);

        setDirectionsService(directionsServiceInstance);
        setDirectionsRenderer(directionsRendererInstance);

        // Initialize heatmap
        const heatmapData = getHeatmapData();
        const heatmapInstance = new window.google.maps.visualization.HeatmapLayer({
            data: heatmapData,
            map: mapInstance,
        });
        setHeatmap(heatmapInstance);

        // Add accessibility features
        getAccessibilityFeatures().forEach(feature => {
            addAccessibilityFeature(feature.lat, feature.lng, feature.description);
        });
    };

    const getHeatmapData = () => {
        // Dummy data for heatmap (traffic congestion)
        const heatmapData = [
            { location: new window.google.maps.LatLng(28.6139, 77.2090), weight: 5 },
            { location: new window.google.maps.LatLng(28.6229, 77.2080), weight: 3 },
            { location: new window.google.maps.LatLng(28.6339, 77.2200), weight: 4 },
            { location: new window.google.maps.LatLng(28.6519, 77.2315), weight: 2 },
            { location: new window.google.maps.LatLng(28.6359, 77.2100), weight: 5 },
            { location: new window.google.maps.LatLng(28.6429, 77.2080), weight: 4 },
            { location: new window.google.maps.LatLng(28.6239, 77.2400), weight: 3 },
            { location: new window.google.maps.LatLng(28.6619, 77.2315), weight: 5 },
            { location: new window.google.maps.LatLng(28.6339, 77.2500), weight: 2 },
            { location: new window.google.maps.LatLng(28.6229, 77.2280), weight: 4 },
        ];
        return heatmapData;
    };

    const getAccessibilityFeatures = () => {
        // Dummy data for accessibility features
        return [
            { lat: 28.6139, lng: 77.2090, description: "Wheelchair Access" },
            { lat: 28.6229, lng: 77.2080, description: "Braille Signage" },
            { lat: 28.6339, lng: 77.2200, description: "Accessible Restroom" },
            { lat: 28.6519, lng: 77.2315, description: "Elevator Access" },
            { lat: 28.6359, lng: 77.2100, description: "Hearing Loop System" },
            { lat: 28.6429, lng: 77.2080, description: "Visual Alarm System" },
            { lat: 28.6239, lng: 77.2400, description: "Tactile Paving" },
            { lat: 28.6619, lng: 77.2315, description: "Sign Language Services" },
            { lat: 28.6339, lng: 77.2500, description: "Accessible Parking" },
            { lat: 28.6229, lng: 77.2280, description: "Assistive Listening Devices" },
        ];
    };

    const addAccessibilityFeature = (lat, lng, description) => {
        if (!map || !window.google) return;

        const marker = new window.google.maps.Marker({
            position: { lat, lng },
            map,
            icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: "#4CAF50",
                fillOpacity: 0.8,
                strokeWeight: 2,
                strokeColor: "#FFFFFF",
            },
            title: description,
        });

        const infoWindow = new window.google.maps.InfoWindow({
            content: `<div><strong>${description}</strong><p>Details about assistance available here.</p></div>`,
        });

        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });

        setAccessibilityFeatures(prev => [...prev, { lat, lng, description }]);
    };

    const plotRoute = (start, end) => {
        if (!directionsService || !directionsRenderer) return;

        clearDirections();
        const request = {
            origin: start,
            destination: end,
            travelMode: window.google.maps.TravelMode[travelMode],
            unitSystem: window.google.maps.UnitSystem.METRIC,
            provideRouteAlternatives: true,
        };

        directionsService.route(request, (result, status) => {
            if (status === "OK") {
                setRoutes(result.routes);
                showRoute(0); // Show the first route by default
                const accessibilityWarnings = checkRouteForAccessibility(result.routes[0]);
                if (accessibilityWarnings.length > 0) {
                    alert("Accessibility Warnings:\n" + accessibilityWarnings.join("\n"));
                }
                fetchTransportOptions(start, end);
            } else {
                console.error("Directions request failed due to " + status);
                alert("Could not retrieve directions: " + status);
            }
        });
    };

    const showRoute = (index) => {
        if (!directionsRenderer || !routes[index]) return;
        setSelectedRoute(index);
        directionsRenderer.setDirections({ routes: [routes[index]], routeIndex: 0 });
    };

    const fetchTransportOptions = (start, end) => {
        // Dummy data for transport options
        const mockOptions = [
            { type: "cab", name: "AccessiCab", accessible: true },
            { type: "train", name: "Metro Line 1", accessible: true },
            { type: "bus", name: "City Bus 42", accessible: false },
            { type: "cab", name: "Uber WAV", accessible: true },
            { type: "train", name: "Metro Line 2", accessible: true },
            { type: "bus", name: "Low Floor Bus 101", accessible: true },
            { type: "cab", name: "Ola Accessible", accessible: true },
            { type: "train", name: "Airport Express", accessible: true },
            { type: "bus", name: "Hop-On Hop-Off Tourist Bus", accessible: false },
            { type: "cab", name: "EasyGo Accessible Taxi", accessible: true },
        ];
        setTransportOptions(mockOptions);
    };

    const checkRouteForAccessibility = (route) => {
        const warnings = [];
        route.legs[0].steps.forEach((step, index) => {
            if (step.travel_mode === "WALKING") {
                if (step.distance.value > 500) {
                    warnings.push(`Step ${index + 1}: Long walking distance (${step.distance.text})`);
                }
            }
            // Add more accessibility checks here
        });
        return warnings;
    };

    const clearDirections = () => {
        if (directionsRenderer) {
            directionsRenderer.setDirections({ routes: [] });
        }
        setRoutes([]);
        setTransportOptions([]);
    };

    const handleGetRoute = () => {
        if (start && end) {
            plotRoute(start, end);
        } else {
            alert("Please enter both starting point and destination.");
        }
    };

    const searchNearbyPlaces = () => {
        if (!map || !window.google) return;

        const service = new window.google.maps.places.PlacesService(map);
        const request = {
            location: map.getCenter(),
            radius: '500',
            type: [serviceType],
        };

        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
                results.forEach(place => {
                    addPlaceMarker(place);
                });
            } else {
                console.error("Places request failed due to " + status);
                alert("No places found or an error occurred.");
            }
        });
    };

    const addPlaceMarker = (place) => {
        if (!map || !window.google) return;

        const marker = new window.google.maps.Marker({
            position: place.geometry.location,
            map,
            title: place.name,
        });

        const infoWindow = new window.google.maps.InfoWindow({
            content: `<div><strong>${place.name}</strong><p>${place.vicinity}</p></div>`,
        });

        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
    };

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Accessible Travel Map - India</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="route">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="route">Route Planning</TabsTrigger>
                        <TabsTrigger value="nearby">Nearby Places</TabsTrigger>
                    </TabsList>
                    <TabsContent value="route">
                        <div className="space-y-4">
                            <Input
                                type="text"
                                value={start}
                                onChange={(e) => setStart(e.target.value)}
                                placeholder="Starting Point"
                                className="w-full"
                            />
                            <Input
                                type="text"
                                value={end}
                                onChange={(e) => setEnd(e.target.value)}
                                placeholder="Destination"
                                className="w-full"
                            />
                            <Select value={travelMode} onValueChange={setTravelMode}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select travel mode" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="WALKING">Walking</SelectItem>
                                    <SelectItem value="TRANSIT">Public Transport</SelectItem>
                                    <SelectItem value="DRIVING">Driving</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button onClick={handleGetRoute} className="w-full">
                                <Navigation className="mr-2 h-4 w-4" /> Get Route
                            </Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="nearby">
                        <div className="space-y-4">
                            <Select value={serviceType} onValueChange={setServiceType}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select service type" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="hospital">Hospital</SelectItem>
                                    <SelectItem value="restaurant">Restaurant</SelectItem>
                                    <SelectItem value="park">Park</SelectItem>
                                    <SelectItem value="atm">ATM</SelectItem>
                                    <SelectItem value="school">School</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button onClick={searchNearbyPlaces} className="w-full">
                                <MapPin className="mr-2 h-4 w-4" /> Find Nearby Places
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
                <div ref={mapRef} className="w-full h-96 mt-4 rounded-lg shadow-lg" />
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Available Transport Options</h3>
                    <ul className="list-disc pl-5">
                        {transportOptions.map((option, index) => (
                            <li key={index} className={option.accessible ? "text-green-600" : "text-red-600"}>
                                {option.name} ({option.type}) - {option.accessible ? "Accessible" : "Not Accessible"}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Accessibility Features</h3>
                    <ul className="list-disc pl-5">
                        {accessibilityFeatures.map((feature, index) => (
                            <li key={index}>{feature.description} at ({feature.lat}, {feature.lng})</li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
};

export default AccessibleMaps;
