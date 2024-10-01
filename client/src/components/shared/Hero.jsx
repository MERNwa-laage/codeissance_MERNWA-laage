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
            <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 pb-72">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <div className="">
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