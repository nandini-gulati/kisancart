import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Navigation
    home: 'Home',
    products: 'Products',
    farmers: 'Farmers',
    login: 'Login',
    register: 'Register',
    profile: 'Profile',
    logout: 'Logout',
    
    // Home page
    heroTitle: 'Connect Directly with Local Farmers',
    heroSubtitle: 'Fresh produce, fair prices, no middlemen. Supporting our farming community.',
    getStarted: 'Get Started',
    forFarmers: 'For Farmers',
    forBuyers: 'For Buyers',
    whyChooseKisanCart: 'Why Choose KisanCart?',
    connectingFarmersConsumers: 'Connecting farmers and consumers for a better future',
    
    // Features
    directConnection: 'Direct Connection',
    directConnectionDesc: 'Connect directly with farmers, no middlemen',
    localSourcing: 'Local Sourcing',
    localSourcingDesc: 'Find fresh produce from farmers near you',
    verifiedFarmers: 'Verified Farmers',
    verifiedFarmersDesc: 'All farmers are verified for authenticity',
    qualityAssured: 'Quality Assured',
    qualityAssuredDesc: 'Fresh, quality produce guaranteed',
    
    // Common
    name: 'Name',
    email: 'Email',
    password: 'Password',
    phone: 'Phone Number',
    location: 'Location',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    loading: 'Loading...',
    
    // Products
    addProduct: 'Add Product',
    productName: 'Product Name',
    price: 'Price',
    quantity: 'Quantity',
    description: 'Description',
    category: 'Category',
    
    // Farmers
    verifiedFarmer: 'Verified Farmer',
    contactFarmer: 'Contact Farmer',
    whatsapp: 'WhatsApp',
    call: 'Call',
  },
  hi: {
    // Navigation
    home: 'होम',
    products: 'उत्पाद',
    farmers: 'किसान',
    login: 'लॉगिन',
    register: 'पंजीकरण',
    profile: 'प्रोफाइल',
    logout: 'लॉगआउट',
    
    // Home page
    heroTitle: 'स्थानीय किसानों से सीधे जुड़ें',
    heroSubtitle: 'ताज़ी फसल, उचित मूल्य, कोई बिचौलिया नहीं। हमारे किसान समुदाय का समर्थन।',
    getStarted: 'शुरू करें',
    forFarmers: 'किसानों के लिए',
    forBuyers: 'खरीदारों के लिए',
    whyChooseKisanCart: 'KisanCart क्यों चुनें?',
    connectingFarmersConsumers: 'बेहतर भविष्य के लिए किसानों और उपभोक्ताओं को जोड़ना',
    
    // Features
    directConnection: 'सीधा संपर्क',
    directConnectionDesc: 'किसानों से सीधे जुड़ें, कोई बिचौलिया नहीं',
    localSourcing: 'स्थानीय स्रोत',
    localSourcingDesc: 'अपने आस-पास के किसानों से ताज़ी फसल पाएं',
    verifiedFarmers: 'सत्यापित किसान',
    verifiedFarmersDesc: 'सभी किसान प्रामाणिकता के लिए सत्यापित हैं',
    qualityAssured: 'गुणवत्ता आश्वासन',
    qualityAssuredDesc: 'ताज़ी, गुणवत्तापूर्ण फसल की गारंटी',
    
    // Common
    name: 'नाम',
    email: 'ईमेल',
    password: 'पासवर्ड',
    phone: 'फोन नंबर',
    location: 'स्थान',
    submit: 'सबमिट करें',
    cancel: 'रद्द करें',
    save: 'सेव करें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    loading: 'लोड हो रहा है...',
    
    // Products
    addProduct: 'उत्पाद जोड़ें',
    productName: 'उत्पाद का नाम',
    price: 'मूल्य',
    quantity: 'मात्रा',
    description: 'विवरण',
    category: 'श्रेणी',
    
    // Farmers
    verifiedFarmer: 'सत्यापित किसान',
    contactFarmer: 'किसान से संपर्क करें',
    whatsapp: 'व्हाट्सऐप',
    call: 'कॉल करें',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'hi'>('hi');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};