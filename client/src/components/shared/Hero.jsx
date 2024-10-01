import React from 'react';
import { useNavigate } from 'react-router-dom';
import VoiceHover from '../pages/VoiceHover';

const Hero = () => {
    const nav = useNavigate()
    const handleTrip = () => {
        nav('/createtrip')
    }
    
    return (
        <VoiceHover>
            <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                            <span className="block text-blue-600 mb-2">Accessible Travel Guide</span>
                            <span className="block">Empowering Journeys for All</span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Your personalized travel assistant, providing detailed accessibility information for destinations, accommodations, and transport options tailored to your specific needs.
                        </p>
                        <div className="mt-10">
                            <button 
                                className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300"
                                onClick={handleTrip}
                            >
                                Plan Your Accessible Journey
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </VoiceHover>
    );
};

export default Hero;