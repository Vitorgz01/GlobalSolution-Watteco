"use client"
import { useEffect } from 'react';

interface WatsonAssistantInstance {
  render: () => Promise<void>;
}

const WatsonChat = () => {
  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: "b189444e-771b-4db4-8e3d-ca748c534b6f", 
      region: "au-syd",
      serviceInstanceID: "a60974e2-ae9c-4c92-b53f-af031624f3ff",
      onLoad: async (instance: WatsonAssistantInstance) => { 
        await instance.render(); 
      }
    };

    const script = document.createElement('script');
    script.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    script.async = true;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null; 
};

export default WatsonChat;
