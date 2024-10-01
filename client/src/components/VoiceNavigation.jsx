import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = 'AIzaSyDpwt_nMAdiJRNDNeqDNCT_nRRAKuqBgyQ';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const summarizeContentWithGemini = async (pageContent) => {
    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const result = await chatSession.sendMessage(`Summarize the following content in about 3-4 sentences: ${pageContent}`);
        const response = result.response;
        return response.text();
    } catch (error) {
        console.error('Error summarizing content using Gemini AI:', error);
        if (error.response) {
            return `Error: ${error.response.data?.error?.message || 'Unknown error'}`;
        } else if (error.request) {
            return 'No response received from the server. Please check your internet connection.';
        } else {
            return 'An unexpected error occurred. Please try again later.';
        }
    }
};

const VoiceNavigationWithAI = () => {
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const [summary, setSummary] = useState('');
    const [lastCommand, setLastCommand] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const recognitionInstance = new window.webkitSpeechRecognition();
            recognitionInstance.continuous = true;
            recognitionInstance.interimResults = true;

            recognitionInstance.onstart = () => setIsListening(true);
            recognitionInstance.onend = () => setIsListening(false);

            recognitionInstance.onresult = async (event) => {
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        const command = event.results[i][0].transcript.toLowerCase().trim();
                        setLastCommand(command);
                        const bestMatch = findBestMatch(command, commands);

                        if (bestMatch) {
                            await bestMatch();
                        } else {
                            console.log('Unknown command:', command);
                        }
                    }
                }
            };

            setRecognition(recognitionInstance);
        }

        return () => {
            if (recognition) {
                recognition.stop();
            }
        };
    }, []);

    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.onstart = () => {
                // Stop listening when speech starts
                if (recognition) {
                    recognition.stop();
                    setIsListening(false);
                }
            };
            utterance.onend = () => {
                // Start listening again when speech ends
                if (recognition) {
                    recognition.start();
                    setIsListening(true);
                }
            };
            window.speechSynthesis.speak(utterance);
        } else {
            console.error('Text-to-speech not supported in this browser');
        }
    };

    const handleSummarize = async () => {
        setError('');
        setSummary('Summarizing...');
        // Get content from the main content area of the current page
        const pageContent = document.querySelector('main')?.innerText || document.body.innerText;
        const summaryText = await summarizeContentWithGemini(pageContent);
        if (summaryText.startsWith('Error')) {
            setError(summaryText);
            setSummary('');
            speakText('An error occurred while summarizing the page.');
        } else {
            setSummary(summaryText);
            speakText(summaryText);
        }
    };

    const commands = [
        { keywords: ['home', 'go home'], action: () => navigate('/') },
        { keywords: ['dashboard'], action: () => navigate('/dashboard') },
        { keywords: ['flights'], action: () => navigate('/flights') },
        { keywords: ['login'], action: () => navigate('/login') },
        { keywords: ['hotels'], action: () => navigate('/hotels') },
        { keywords: ['create trip'], action: () => navigate('/createtrip') },
        { keywords: ['summarize', 'summary'], action: handleSummarize },
    ];

    const findBestMatch = (command, commands) => {
        return commands.find(({ keywords }) => 
            keywords.some(keyword => command.includes(keyword))
        )?.action;
    };

    const toggleListening = () => {
        if (recognition) {
            if (isListening) {
                recognition.stop();
            } else {
                recognition.start();
            }
        }
    };

    return (
        <div className="fixed left-1/2 top-3 transform -translate-x-1/2">
            <button
                onClick={toggleListening}
                className={`p-2 rounded-full ${isListening ? 'bg-red-500' : 'bg-blue-500'} text-white`}
            >
                {isListening ? 'Stop Listening' : 'Start Listening'}
            </button>
            {lastCommand && (
                <div className="mt-2 p-2 border rounded bg-gray-100 max-w-md">
                    <h3 className="font-bold">Last Command:</h3>
                    <p>{lastCommand}</p>
                </div>
            )}
            {error && (
                <div className="mt-2 p-2 border rounded bg-red-100 max-w-md">
                    <h3 className="font-bold">Error:</h3>
                    <p>{error}</p>
                </div>
            )}
            {summary && (
                <div className="mt-2 p-2 border rounded bg-gray-100 max-w-md">
                    <h3 className="font-bold">Summary:</h3>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
};

export default VoiceNavigationWithAI;
