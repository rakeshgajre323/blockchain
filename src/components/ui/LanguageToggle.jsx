import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const LanguageToggle = ({ className = '' }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const languages = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸'
    },
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिंदी',
      flag: '🇮🇳'
    }
  ];

  // Language translations for UI elements
  const translations = {
    en: {
      language: 'Language',
      selectLanguage: 'Select Language',
      home: 'Home',
      certificateManagement: 'Certificate Management',
      myWallet: 'My Wallet',
      verifyCredentials: 'Verify Credentials',
      verificationResults: 'Verification Results',
      settings: 'Settings',
      help: 'Help & Support',
      signIn: 'Sign In',
      signOut: 'Sign Out',
      dashboard: 'Dashboard',
      profile: 'Profile'
    },
    hi: {
      language: 'भाषा',
      selectLanguage: 'भाषा चुनें',
      home: 'होम',
      certificateManagement: 'प्रमाणपत्र प्रबंधन',
      myWallet: 'मेरा वॉलेट',
      verifyCredentials: 'क्रेडेंशियल सत्यापित करें',
      verificationResults: 'सत्यापन परिणाम',
      settings: 'सेटिंग्स',
      help: 'सहायता और समर्थन',
      signIn: 'साइन इन',
      signOut: 'साइन आउट',
      dashboard: 'डैशबोर्ड',
      profile: 'प्रोफ़ाइल'
    }
  };

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && languages?.find(lang => lang?.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
      applyLanguage(savedLanguage);
    }
  }, []);

  const applyLanguage = (languageCode) => {
    // Set document language
    document.documentElement.lang = languageCode;
    
    // Store language preference
    localStorage.setItem('preferredLanguage', languageCode);
    
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { 
        language: languageCode,
        translations: translations[languageCode]
      }
    }));
  };

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    applyLanguage(languageCode);
    setIsDropdownOpen(false);
  };

  const getCurrentLanguage = () => {
    return languages?.find(lang => lang?.code === currentLanguage) || languages?.[0];
  };

  const getTranslation = (key) => {
    return translations?.[currentLanguage]?.[key] || translations?.en?.[key] || key;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Language Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2"
      >
        <Icon name="Globe" size={16} />
        <span className="hidden sm:inline text-sm">
          {getCurrentLanguage()?.code?.toUpperCase()}
        </span>
        <Icon name="ChevronDown" size={14} />
      </Button>
      {/* Language Dropdown */}
      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-elevated z-50">
          <div className="py-1">
            <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b border-border">
              {getTranslation('selectLanguage')}
            </div>
            
            {languages?.map((language) => (
              <button
                key={language?.code}
                onClick={() => handleLanguageChange(language?.code)}
                className={`flex items-center w-full px-3 py-2 text-sm transition-smooth hover:bg-muted ${
                  currentLanguage === language?.code
                    ? 'bg-accent text-accent-foreground'
                    : 'text-popover-foreground'
                }`}
              >
                <span className="mr-3 text-lg">{language?.flag}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium">{language?.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {language?.nativeName}
                  </div>
                </div>
                {currentLanguage === language?.code && (
                  <Icon name="Check" size={16} className="text-accent-foreground" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Overlay */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

// Hook for using translations in components
export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    // Get initial language
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLanguage);

    // Listen for language changes
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
      setTranslations(event?.detail?.translations);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  const t = (key, fallback = key) => {
    return translations?.[key] || fallback;
  };

  return {
    currentLanguage,
    t,
    isRTL: currentLanguage === 'ar' // Add RTL support for future languages
  };
};

// Context for language state management
export const LanguageContext = React.createContext({
  currentLanguage: 'en',
  changeLanguage: () => {},
  t: (key) => key
});

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const translations = {
    en: {
      language: 'Language',
      selectLanguage: 'Select Language',
      home: 'Home',
      certificateManagement: 'Certificate Management',
      myWallet: 'My Wallet',
      verifyCredentials: 'Verify Credentials',
      verificationResults: 'Verification Results',
      settings: 'Settings',
      help: 'Help & Support',
      signIn: 'Sign In',
      signOut: 'Sign Out',
      dashboard: 'Dashboard',
      profile: 'Profile',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
      download: 'Download',
      share: 'Share'
    },
    hi: {
      language: 'भाषा',
      selectLanguage: 'भाषा चुनें',
      home: 'होम',
      certificateManagement: 'प्रमाणपत्र प्रबंधन',
      myWallet: 'मेरा वॉलेट',
      verifyCredentials: 'क्रेडेंशियल सत्यापित करें',
      verificationResults: 'सत्यापन परिणाम',
      settings: 'सेटिंग्स',
      help: 'सहायता और समर्थन',
      signIn: 'साइन इन',
      signOut: 'साइन आउट',
      dashboard: 'डैशबोर्ड',
      profile: 'प्रोफ़ाइल',
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      success: 'सफलता',
      cancel: 'रद्द करें',
      save: 'सेव करें',
      delete: 'हटाएं',
      edit: 'संपादित करें',
      view: 'देखें',
      download: 'डाउनलोड',
      share: 'साझा करें'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const changeLanguage = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('preferredLanguage', languageCode);
    document.documentElement.lang = languageCode;
  };

  const t = (key, fallback = key) => {
    return translations?.[currentLanguage]?.[key] || translations?.en?.[key] || fallback;
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      changeLanguage,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageToggle;