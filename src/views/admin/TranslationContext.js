import React, { createContext, useState, useContext } from "react";

// Create Context
export const TranslationContext = createContext();

// Provider Component
export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  // Function to return translated text (mock example)
  const autoTranslate = (text) => {
    const translations = {
      en: { "Queue Tracking": "Queue Tracking", "Virtual Darshan": "Virtual Darshan", "Services": "Services" },
      hi: { "Queue Tracking": "क्यू ट्रैकिंग", "Virtual Darshan": "वर्चुअल दर्शन", "Services": "सेवाएँ" },
      mr: { "Queue Tracking": "रांगेचा मागोवा", "Virtual Darshan": "आभासी दर्शन", "Services": "सेवा" },
    };
    return translations[language][text] || text;
  };

  return (
    <TranslationContext.Provider value={{ autoTranslate, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom Hook
export const useTranslation = () => {
  return useContext(TranslationContext);
};
