import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Add chatbot configuration script
    const configScript = document.createElement('script');
    configScript.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "GmbREBb38z5nkuAopiGlH",
        domain: "www.chatbase.co"
      }
    `;
    document.body.appendChild(configScript);

    // Add chatbot embed script
    const embedScript = document.createElement('script');
    embedScript.src = "https://www.chatbase.co/embed.min.js";
    embedScript.chatbotId = "GmbREBb38z5nkuAopiGlH";
    embedScript.domain = "www.chatbase.co";
    embedScript.defer = true;
    document.body.appendChild(embedScript);

    // Cleanup function
    return () => {
      document.body.removeChild(configScript);
      document.body.removeChild(embedScript);
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default Chatbot;