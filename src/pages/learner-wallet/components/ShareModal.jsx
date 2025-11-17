import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ShareModal = ({ 
  isOpen, 
  onClose, 
  certificate, 
  currentLanguage = 'en' 
}) => {
  const [shareUrl, setShareUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const translations = {
    en: {
      shareCredential: 'Share Credential',
      shareWith: 'Share with employers, colleagues, or on social media',
      publicUrl: 'Public Verification URL',
      copyLink: 'Copy Link',
      copied: 'Copied!',
      shareOn: 'Share on',
      linkedin: 'LinkedIn',
      twitter: 'Twitter',
      whatsapp: 'WhatsApp',
      email: 'Email',
      qrCode: 'QR Code',
      downloadQR: 'Download QR',
      close: 'Close',
      generateUrl: 'Generate URL'
    },
    hi: {
      shareCredential: 'प्रमाणपत्र साझा करें',
      shareWith: 'नियोक्ताओं, सहयोगियों या सोशल मीडिया पर साझा करें',
      publicUrl: 'सार्वजनिक सत्यापन URL',
      copyLink: 'लिंक कॉपी करें',
      copied: 'कॉपी हो गया!',
      shareOn: 'पर साझा करें',
      linkedin: 'LinkedIn',
      twitter: 'Twitter',
      whatsapp: 'WhatsApp',
      email: 'ईमेल',
      qrCode: 'QR कोड',
      downloadQR: 'QR डाउनलोड करें',
      close: 'बंद करें',
      generateUrl: 'URL जेनरेट करें'
    }
  };

  const t = translations?.[currentLanguage];

  React.useEffect(() => {
    if (isOpen && certificate) {
      // Generate shareable URL
      const url = `${window.location?.origin}/verify/${certificate?.credentialId}`;
      setShareUrl(url);
    }
  }, [isOpen, certificate]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard?.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareOnPlatform = (platform) => {
    const text = `Check out my verified ${certificate?.courseName} certificate from ${certificate?.institution}`;
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(shareUrl);

    const urls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      email: `mailto:?subject=${encodedText}&body=${encodedText}%0A%0A${shareUrl}`
    };

    if (urls?.[platform]) {
      window.open(urls?.[platform], '_blank');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t?.shareCredential}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Certificate Info */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">
              {certificate?.courseName}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {certificate?.institution}
            </p>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t?.shareWith}
          </p>

          {/* Public URL */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              {t?.publicUrl}
            </label>
            <div className="flex space-x-2">
              <Input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={copyToClipboard}
                iconName={copySuccess ? "Check" : "Copy"}
                iconSize={16}
              >
                {copySuccess ? t?.copied : t?.copyLink}
              </Button>
            </div>
          </div>

          {/* Social Media Sharing */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              {t?.shareOn}
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => shareOnPlatform('linkedin')}
                iconName="Linkedin"
                iconPosition="left"
                iconSize={16}
                className="justify-start"
              >
                {t?.linkedin}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => shareOnPlatform('twitter')}
                iconName="Twitter"
                iconPosition="left"
                iconSize={16}
                className="justify-start"
              >
                {t?.twitter}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => shareOnPlatform('whatsapp')}
                iconName="MessageCircle"
                iconPosition="left"
                iconSize={16}
                className="justify-start"
              >
                {t?.whatsapp}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => shareOnPlatform('email')}
                iconName="Mail"
                iconPosition="left"
                iconSize={16}
                className="justify-start"
              >
                {t?.email}
              </Button>
            </div>
          </div>

          {/* QR Code */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              {t?.qrCode}
            </h4>
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <div className="w-32 h-32 bg-gray-100 mx-auto mb-3 rounded-lg flex items-center justify-center">
                <Icon name="QrCode" size={64} className="text-gray-400" />
              </div>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                iconSize={14}
              >
                {t?.downloadQR}
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            onClick={onClose}
          >
            {t?.close}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;