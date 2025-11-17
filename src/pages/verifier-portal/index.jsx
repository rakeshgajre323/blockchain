import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import VerificationInput from "./components/VerificationInput.jsx";
import QRScanner from './components/QRScanner';
import BulkVerification from './components/BulkVerification';
import VerificationHistory from './components/VerificationHistory';
import TrustIndicators from './components/TrustIndicators';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const VerifierPortal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [activeTab, setActiveTab] = useState('single');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();

  // Language translations
  const translations = {
    en: {
      title: 'Certificate Verification Portal',
      subtitle: 'Instantly verify the authenticity of digital skill certificates',
      singleVerification: 'Single Verification',
      bulkVerification: 'Bulk Verification',
      verificationHistory: 'Verification History',
      trustIndicators: 'Trust & Security',
      getStarted: 'Get Started',
      learnMore: 'Learn More'
    },
    hi: {
      title: 'प्रमाणपत्र सत्यापन पोर्टल',
      subtitle: 'डिजिटल कौशल प्रमाणपत्रों की प्रामाणिकता तुरंत सत्यापित करें',
      singleVerification: 'एकल सत्यापन',
      bulkVerification: 'बल्क सत्यापन',
      verificationHistory: 'सत्यापन इतिहास',
      trustIndicators: 'विश्वास और सुरक्षा',
      getStarted: 'शुरू करें',
      learnMore: 'और जानें'
    }
  };

  useEffect(() => {
    // Load language preference
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLanguage);

    // Listen for language changes
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const t = (key) => translations?.[currentLanguage]?.[key] || translations?.en?.[key] || key;

  const handleVerification = async (certificateId) => {
    setIsLoading(true);
    
    try {
      // Simulate API call for verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add to verification history
      const verificationResult = {
        id: `VER-${Date.now()}`,
        certificateId,
        verificationTime: new Date(),
        status: Math.random() > 0.3 ? 'valid' : 'invalid', // 70% chance of valid
        verifiedBy: 'current-user@company.com'
      };
      
      // Save to localStorage
      const existingHistory = JSON.parse(localStorage.getItem('verificationHistory') || '[]');
      existingHistory?.unshift(verificationResult);
      localStorage.setItem('verificationHistory', JSON.stringify(existingHistory?.slice(0, 50))); // Keep last 50
      
      // Navigate to results page with verification data
      navigate('/verification-results', { 
        state: { 
          certificateId,
          verificationResult 
        } 
      });
      
    } catch (error) {
      console.error('Verification failed:', error);
      // Handle error - could show toast notification
    } finally {
      setIsLoading(false);
    }
  };

  const handleQRScan = (scannedId) => {
    handleVerification(scannedId);
  };

  const handleBulkVerification = async (certificateIds, fileName) => {
    setIsLoading(true);
    
    try {
      // Simulate bulk verification process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Navigate to results page with bulk data
      navigate('/verification-results', { 
        state: { 
          bulkVerification: true,
          certificateIds,
          fileName,
          totalCount: certificateIds?.length
        } 
      });
      
    } catch (error) {
      console.error('Bulk verification failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewHistoryDetails = (historyItem) => {
    navigate('/verification-results', { 
      state: { 
        certificateId: historyItem?.certificateId,
        verificationResult: historyItem,
        fromHistory: true
      } 
    });
  };

  const toggleScanner = () => {
    setIsScannerActive(!isScannerActive);
  };

  const tabs = [
    { id: 'single', label: t('singleVerification'), icon: 'Search' },
    { id: 'bulk', label: t('bulkVerification'), icon: 'Upload' },
    { id: 'history', label: t('verificationHistory'), icon: 'History' },
    { id: 'trust', label: t('trustIndicators'), icon: 'Shield' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="verifier" isAuthenticated={false} />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mx-auto mb-4">
            <Icon name="ShieldCheck" size={32} className="text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            {t('subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              onClick={() => setActiveTab('single')}
              iconName="Play"
              iconPosition="left"
            >
              {t('getStarted')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setActiveTab('trust')}
              iconName="Info"
              iconPosition="left"
            >
              {t('learnMore')}
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-smooth ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'single' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <VerificationInput 
                  onVerify={handleVerification}
                  isLoading={isLoading}
                />
                
                <QRScanner
                  onScan={handleQRScan}
                  isActive={isScannerActive}
                  onToggle={toggleScanner}
                />
              </div>
              
              <div className="lg:pl-6">
                <VerificationHistory onViewDetails={handleViewHistoryDetails} />
              </div>
            </div>
          )}

          {activeTab === 'bulk' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BulkVerification 
                onBulkVerify={handleBulkVerification}
                isLoading={isLoading}
              />
              
              <div className="lg:pl-6">
                <VerificationHistory onViewDetails={handleViewHistoryDetails} />
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="max-w-4xl mx-auto">
              <VerificationHistory onViewDetails={handleViewHistoryDetails} />
            </div>
          )}

          {activeTab === 'trust' && (
            <div className="max-w-4xl mx-auto">
              <TrustIndicators />
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="fixed bottom-6 right-6 z-40">
          <div className="flex flex-col space-y-2">
            {/* QR Scanner Toggle (Mobile) */}
            <Button
              variant="default"
              size="icon"
              onClick={toggleScanner}
              className="lg:hidden w-12 h-12 rounded-full shadow-elevated"
            >
              <Icon name={isScannerActive ? "X" : "QrCode"} size={20} />
            </Button>
            
            {/* Help Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/help')}
              className="w-12 h-12 rounded-full shadow-elevated bg-surface"
            >
              <Icon name="HelpCircle" size={20} />
            </Button>
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-surface rounded-lg p-6 shadow-elevated max-w-sm w-full mx-4">
              <div className="flex items-center space-x-3">
                <Icon name="Loader2" size={24} className="text-primary animate-spin" />
                <div>
                  <h3 className="font-medium text-foreground">Verifying Certificate</h3>
                  <p className="text-sm text-muted-foreground">
                    Checking blockchain records...
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VerifierPortal;