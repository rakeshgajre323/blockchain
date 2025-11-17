import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const CertificateCard = ({ 
  certificate, 
  currentLanguage = 'en',
  onShare,
  onDownload,
  onViewDetails,
  onGenerateQR 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const translations = {
    en: {
      completedOn: 'Completed on',
      issuedBy: 'Issued by',
      verified: 'Verified',
      pending: 'Pending',
      expired: 'Expired',
      share: 'Share',
      download: 'Download',
      viewDetails: 'View Details',
      generateQR: 'QR Code',
      blockchainProof: 'Blockchain Proof',
      ipfsStorage: 'IPFS Storage',
      transactionHash: 'Transaction Hash',
      credentialId: 'Credential ID',
      skills: 'Skills Covered',
      duration: 'Duration',
      grade: 'Grade'
    },
    hi: {
      completedOn: 'पूर्ण किया गया',
      issuedBy: 'द्वारा जारी',
      verified: 'सत्यापित',
      pending: 'लंबित',
      expired: 'समाप्त',
      share: 'साझा करें',
      download: 'डाउनलोड',
      viewDetails: 'विवरण देखें',
      generateQR: 'QR कोड',
      blockchainProof: 'ब्लॉकचेन प्रमाण',
      ipfsStorage: 'IPFS भंडारण',
      transactionHash: 'लेनदेन हैश',
      credentialId: 'प्रमाण पत्र ID',
      skills: 'कवर किए गए कौशल',
      duration: 'अवधि',
      grade: 'ग्रेड'
    }
  };

  const t = translations?.[currentLanguage];

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
      case 'expired':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'expired':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return currentLanguage === 'hi' ? date?.toLocaleDateString('hi-IN')
      : date?.toLocaleDateString('en-IN');
  };

  const handleShare = () => {
    onShare(certificate);
  };

  const handleDownload = () => {
    onDownload(certificate);
  };

  const handleQRGenerate = () => {
    setShowQR(!showQR);
    onGenerateQR(certificate);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Certificate Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4 flex-1">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Award" size={24} className="text-white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate">
                {certificate?.courseName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {t?.issuedBy} {certificate?.institution}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {t?.completedOn} {formatDate(certificate?.completionDate)}
              </p>
            </div>
          </div>

          <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(certificate?.status)}`}>
            <Icon name={getStatusIcon(certificate?.status)} size={12} />
            <span>{t?.[certificate?.status]}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            iconName="Share2"
            iconPosition="left"
            iconSize={14}
          >
            {t?.share}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            iconName="Download"
            iconPosition="left"
            iconSize={14}
          >
            {t?.download}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleQRGenerate}
            iconName="QrCode"
            iconPosition="left"
            iconSize={14}
          >
            {t?.generateQR}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="left"
            iconSize={14}
          >
            {t?.viewDetails}
          </Button>
        </div>

        {/* QR Code Display */}
        {showQR && (
          <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
            <div className="w-32 h-32 bg-white mx-auto mb-2 rounded-lg flex items-center justify-center">
              <Icon name="QrCode" size={64} className="text-gray-400" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Scan to verify certificate
            </p>
          </div>
        )}

        {/* Expanded Details */}
        {isExpanded && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {t?.credentialId}
                </h4>
                <p className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  {certificate?.credentialId}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {t?.duration}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {certificate?.duration} • {t?.grade}: {certificate?.grade}
                </p>
              </div>
            </div>

            {certificate?.skills && certificate?.skills?.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {t?.skills}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {certificate?.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Blockchain Proof */}
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                  <Icon name="Shield" size={16} className="mr-2 text-green-600" />
                  {t?.blockchainProof}
                </h4>
                <div className="flex items-center space-x-2">
                  <code className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-2 rounded flex-1 truncate">
                    {certificate?.transactionHash}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ExternalLink"
                    iconSize={14}
                  />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                  <Icon name="Database" size={16} className="mr-2 text-blue-600" />
                  {t?.ipfsStorage}
                </h4>
                <div className="flex items-center space-x-2">
                  <code className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-2 rounded flex-1 truncate">
                    {certificate?.ipfsHash}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ExternalLink"
                    iconSize={14}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateCard;