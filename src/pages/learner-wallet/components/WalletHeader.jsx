import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WalletHeader = ({ 
  totalCredentials = 0, 
  recentAdditions = 0, 
  verificationRate = 0,
  onLanguageToggle,
  onDarkModeToggle,
  currentLanguage = 'en',
  isDarkMode = false 
}) => {
  const translations = {
    en: {
      myWallet: 'My Digital Wallet',
      subtitle: 'Manage your blockchain-verified skill certificates',
      totalCredentials: 'Total Credentials',
      recentAdditions: 'Recent Additions',
      verificationRate: 'Verification Rate',
      thisMonth: 'This Month',
      verified: 'Verified'
    },
    hi: {
      myWallet: 'मेरा डिजिटल वॉलेट',
      subtitle: 'अपने ब्लॉकचेन-सत्यापित कौशल प्रमाणपत्रों का प्रबंधन करें',
      totalCredentials: 'कुल प्रमाणपत्र',
      recentAdditions: 'हाल की वृद्धि',
      verificationRate: 'सत्यापन दर',
      thisMonth: 'इस महीने',
      verified: 'सत्यापित'
    }
  };

  const t = translations?.[currentLanguage];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">{t?.myWallet}</h1>
          <p className="text-blue-100 text-sm lg:text-base">{t?.subtitle}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLanguageToggle}
            iconName="Globe"
            iconPosition="left"
            iconSize={16}
            className="text-white hover:bg-white/10"
          >
            {currentLanguage === 'en' ? 'हिंदी' : 'English'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onDarkModeToggle}
            iconName={isDarkMode ? "Sun" : "Moon"}
            iconSize={16}
            className="text-white hover:bg-white/10"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Award" size={24} className="text-blue-200" />
            <span className="text-2xl font-bold">{totalCredentials}</span>
          </div>
          <p className="text-blue-100 text-sm">{t?.totalCredentials}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="TrendingUp" size={24} className="text-green-300" />
            <span className="text-2xl font-bold">+{recentAdditions}</span>
          </div>
          <p className="text-blue-100 text-sm">{t?.recentAdditions} ({t?.thisMonth})</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Shield" size={24} className="text-emerald-300" />
            <span className="text-2xl font-bold">{verificationRate}%</span>
          </div>
          <p className="text-blue-100 text-sm">{t?.verificationRate} ({t?.verified})</p>
        </div>
      </div>
    </div>
  );
};

export default WalletHeader;