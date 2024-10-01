import React from 'react';
import { useTextToSpeech } from '../shared/useTextToSpeech';

const VoiceHover = ({ children }) => {
  const { speak, stop, enabled } = useTextToSpeech();

  const addSpeechProps = (element) => {
    if (React.isValidElement(element)) {
      const newProps = {
        onMouseEnter: () => {
          if (enabled) {
            const text = extractText(element);
            if (text) speak(text);
          }
        },
        onMouseLeave: stop,
      };

      if (element.props.children) {
        return React.cloneElement(element, newProps, 
          React.Children.map(element.props.children, addSpeechProps)
        );
      }

      return React.cloneElement(element, newProps);
    }
    return element;
  };

  const extractText = (element) => {
    if (typeof element === 'string') return element;
    if (Array.isArray(element)) return element.map(extractText).join(' ');
    if (React.isValidElement(element)) {
      if (element.props.children) {
        return extractText(element.props.children);
      }
    }
    return '';
  };

  return React.Children.map(children, addSpeechProps);
};

export default VoiceHover;