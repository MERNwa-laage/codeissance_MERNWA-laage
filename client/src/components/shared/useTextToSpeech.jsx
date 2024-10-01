import React, { useState, useEffect, useContext, createContext } from 'react';

const TextToSpeechContext = createContext();

export const TextToSpeechProvider = ({ children }) => {
  const [voices, setVoices] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const updateVoices = () => {
      setVoices(synth.getVoices());
    };
    updateVoices();
    synth.onvoiceschanged = updateVoices;
    return () => {
      synth.onvoiceschanged = null;
    };
  }, []);

  const speak = (text, voice = null) => {
    if (!enabled) return;
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) {
      utterance.voice = voice;
    }
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    synth.speak(utterance);
  };

  const stop = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setSpeaking(false);
  };

  const toggleEnabled = () => {
    setEnabled(prev => !prev);
    if (speaking) {
      stop();
    }
  };

  return (
    <TextToSpeechContext.Provider value={{ speak, stop, voices, speaking, enabled, toggleEnabled }}>
      {children}
    </TextToSpeechContext.Provider>
  );
};

export const useTextToSpeech = () => useContext(TextToSpeechContext);

export default useTextToSpeech;