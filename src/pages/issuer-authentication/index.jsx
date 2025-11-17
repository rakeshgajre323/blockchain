import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from "../../components/AppIcon.jsx";
import Header from '../../components/ui/Header';
import LanguageToggle from '../../components/ui/LanguageToggle';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import TrustSignals from './components/TrustSignals';
import AuthTabs from './components/AuthTabs';

const IssuerAuthentication = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is already authenticated
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (token && userRole === 'issuer') {
      // Redirect to certificate management if already authenticated
      navigate('/certificate-management', { replace: true });
    }
  }, [navigate]);

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLanguage);

    // Listen for language changes
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const handleAuthSuccess = (userData) => {
    console.log('Authentication successful:', userData);
    
    // Store user data
    localStorage.setItem('userEmail', userData?.email);
    localStorage.setItem('userAffiliation', userData?.affiliation);
    
    // Navigate to certificate management
    const redirectPath = location?.state?.from || '/certificate-management';
    navigate(redirectPath, { replace: true });
  };

  const handleRegistrationSuccess = (registrationData) => {
    console.log('Registration successful:', registrationData);
    
    // Switch to login tab after successful registration
    setActiveTab('login');
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const translations = {
    en: {
      title: "Issuer Authentication",
      subtitle: "Secure access to your credential management dashboard",
      backToHome: "Back to Home",
      poweredBy: "Powered by Blockchain Technology"
    },
    hi: {
      title: "जारीकर्ता प्रमाणीकरण",
      subtitle: "आपके क्रेडेंशियल प्रबंधन डैशबोर्ड तक सुरक्षित पहुंच",
      backToHome: "होम पर वापस जाएं",
      poweredBy: "ब्लॉकचेन तकनीक द्वारा संचालित"
    }
  };

  const t = (key) => translations?.[currentLanguage]?.[key] || translations?.en?.[key];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header userRole="public" isAuthenticated={false} />
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Side - Authentication Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-md space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-4">
              {/* Logo */}
              <div className="flex items-center justify-center space-x-3">
                <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
                  <Icon name="Shield" size={24} color="white" />
                </div>
                <div className="text-left">
                  <h1 className="text-xl font-bold text-foreground">SkillChain</h1>
                  <p className="text-sm text-muted-foreground">Credentials</p>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">{t('title')}</h2>
                <p className="text-muted-foreground">{t('subtitle')}</p>
              </div>

              {/* Back to Home Link */}
              <button
                onClick={() => navigate('/landing-page')}
                className="inline-flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-smooth"
              >
                <Icon name="ArrowLeft" size={16} />
                <span>{t('backToHome')}</span>
              </button>
            </div>

            {/* Authentication Tabs */}
            <AuthTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
              isLoading={isLoading}
            />

            {/* Authentication Forms */}
            <div className="space-y-6">
              {activeTab === 'login' ? (
                <LoginForm onAuthSuccess={handleAuthSuccess} />
              ) : (
                <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
              )}
            </div>

            {/* Language Toggle */}
            <div className="flex justify-center">
              <LanguageToggle />
            </div>

            {/* Powered By */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground flex items-center justify-center space-x-2">
                <Icon name="Zap" size={12} className="text-primary" />
                <span>{t('poweredBy')}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Trust Signals */}
        <div className="hidden lg:flex lg:w-96 bg-muted/30 border-l border-border">
          <div className="flex-1 p-8 overflow-y-auto">
            <TrustSignals />
          </div>
        </div>
      </div>
      {/* Mobile Trust Signals */}
      <div className="lg:hidden border-t border-border bg-muted/30">
        <div className="p-6">
          <TrustSignals />
        </div>
      </div>
      {/* Footer */}
      <footer className="border-t border-border bg-surface">
        <div className="px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="text-xs text-muted-foreground">
              © {new Date()?.getFullYear()} SkillChain Credentials. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <button className="hover:text-foreground transition-smooth">Privacy Policy</button>
              <button className="hover:text-foreground transition-smooth">Terms of Service</button>
              <button className="hover:text-foreground transition-smooth">Support</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IssuerAuthentication;