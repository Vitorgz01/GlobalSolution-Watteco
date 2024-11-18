interface Window {
    watsonAssistantChatOptions: {
      integrationID: string;
      region: string;
      serviceInstanceID: string;
      onLoad: (instance: any) => Promise<void>;
      clientVersion?: string; 
    };
  }
  