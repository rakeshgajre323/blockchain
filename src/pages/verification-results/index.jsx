import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import VerificationStatus from './components/VerificationStatus';
import CertificateDetails from './components/CertificateDetails';
import BlockchainProof from './components/BlockchainProof';
import FailureReasons from './components/FailureReasons';
import ActionPanel from './components/ActionPanel';

const VerificationResults = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [verificationData, setVerificationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Get certificate ID from URL params or location state
  const certificateId = searchParams?.get('id') || location?.state?.certificateId || 'CERT_2024_SC_001234';

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

  useEffect(() => {
    performVerification();
  }, [certificateId]);

  const performVerification = async () => {
    setIsLoading(true);

    try {
      // Simulate verification process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock verification data - in real app, this would come from API
      const mockVerificationData = {
        status: 'valid', // 'valid', 'invalid', 'pending'
        score: 98,
        verificationId: `VER_${Date.now()}_${Math.random()?.toString(36)?.substr(2, 9)}`,
        verificationDate: new Date()?.toLocaleString('en-IN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        certificate: {
          certificateId: certificateId,
          learnerName: "Priya Sharma",
          learnerEmail: "priya.sharma@email.com",
          learnerPhone: "+91 98765 43210",
          dateOfBirth: "15/08/1995",
          studentId: "STU_2024_001234",
          learnerPhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_1b13c24a7-1762249012963.png",
          learnerPhotoAlt: "Professional headshot of young Indian woman with long black hair wearing white blouse",
          courseName: "Full Stack Web Development",
          courseCode: "FSWD_2024_ADV",
          courseDuration: "6 Months",
          courseLevel: "Advanced",
          grade: "A+",
          completionDate: "15/10/2024",
          institutionName: "TechSkills Institute of Excellence",
          institutionCode: "TSI_MUM_001",
          institutionLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e907340a-1762845920150.png",
          institutionLogoAlt: "Modern blue and white logo of TechSkills Institute with graduation cap symbol",
          ncvetId: "NCVET_TSI_2024_567",
          accreditation: "NCVET Approved",
          issueDate: "20/10/2024",
          skills: [
          "React.js", "Node.js", "MongoDB", "Express.js",
          "JavaScript ES6+", "HTML5/CSS3", "Git/GitHub", "REST APIs"]

        },
        blockchainData: {
          transactionHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890",
          blockNumber: "4567890",
          ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
          contractAddress: "0x742d35Cc6634C0532925a3b8D4C2C4e5C8F4D2A1",
          gasUsed: 45678,
          gasPrice: "20.5",
          issueTimestamp: "20/10/2024, 14:30:25",
          anchorTimestamp: "20/10/2024, 14:32:10",
          verificationTimestamp: new Date()?.toLocaleString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })
        },
        failureReasons: [] // Empty for valid certificates
      };

      // Simulate different verification outcomes based on certificate ID
      if (certificateId?.includes('INVALID')) {
        mockVerificationData.status = 'invalid';
        mockVerificationData.score = 0;
        mockVerificationData.failureReasons = ['certificate_not_found', 'blockchain_mismatch'];
        mockVerificationData.certificate = null;
      } else if (certificateId?.includes('EXPIRED')) {
        mockVerificationData.status = 'invalid';
        mockVerificationData.score = 0;
        mockVerificationData.failureReasons = ['expired_certificate'];
      }

      setVerificationData(mockVerificationData);
    } catch (error) {
      console.error('Verification failed:', error);
      setVerificationData({
        status: 'invalid',
        score: 0,
        verificationId: `VER_ERROR_${Date.now()}`,
        verificationDate: new Date()?.toLocaleString('en-IN'),
        certificate: null,
        blockchainData: null,
        failureReasons: ['network_error']
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = (shareUrl, expiry) => {
    console.log('Sharing verification results:', { shareUrl, expiry });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    // In real app, generate PDF using libraries like jsPDF or react-pdf
    console.log('Exporting verification results as PDF');
  };

  const handleVerifyAnother = () => {
    navigate('/verifier-portal');
  };

  const handleReportSuspicious = () => {
    console.log('Reporting suspicious certificate:', certificateId);
    // In real app, open modal or navigate to report form
  };

  const handleRetryVerification = () => {
    performVerification();
  };

  const handleReportIssue = () => {
    console.log('Reporting verification issue for:', certificateId);
    // In real app, open support form or modal
  };

  const getPageTitle = () => {
    return currentLanguage === 'hi' ? 'सत्यापन परिणाम' : 'Verification Results';
  };

  const getLoadingText = () => {
    return currentLanguage === 'hi' ? 'प्रमाणपत्र सत्यापित किया जा रहा है...' : 'Verifying certificate...';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole="verifier" isAuthenticated={true} />
        
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin">
              <Icon name="Loader2" size={48} className="text-primary mx-auto" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              {getLoadingText()}
            </h2>
            <p className="text-muted-foreground max-w-md">
              {currentLanguage === 'hi' ? 'कृपया प्रतीक्षा करें जबकि हम ब्लॉकचेन पर आपके प्रमाणपत्र को सत्यापित करते हैं।' : 'Please wait while we verify your certificate on the blockchain.'
              }
            </p>
            <div className="mt-6">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-muted rounded-lg">
                <Icon name="Hash" size={16} className="text-muted-foreground" />
                <span className="font-mono text-sm text-muted-foreground">
                  {certificateId}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>);

  }

  if (!verificationData) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole="verifier" isAuthenticated={true} />
        
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center space-y-4">
            <Icon name="AlertCircle" size={48} className="text-error mx-auto" />
            <h2 className="text-xl font-semibold text-foreground">
              {currentLanguage === 'hi' ? 'सत्यापन त्रुटि' : 'Verification Error'}
            </h2>
            <p className="text-muted-foreground max-w-md">
              {currentLanguage === 'hi' ? 'प्रमाणपत्र सत्यापन में त्रुटि हुई। कृपया पुनः प्रयास करें।' : 'An error occurred during certificate verification. Please try again.'
              }
            </p>
            <Button
              variant="default"
              onClick={() => navigate('/verifier-portal')}
              iconName="ArrowLeft"
              iconPosition="left">

              {currentLanguage === 'hi' ? 'वापस जाएं' : 'Go Back'}
            </Button>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="verifier" isAuthenticated={true} />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {getPageTitle()}
              </h1>
              <p className="text-muted-foreground">
                {currentLanguage === 'hi' ? 'प्रमाणपत्र प्रामाणिकता सत्यापन परिणाम' : 'Certificate authenticity verification results'
                }
              </p>
            </div>
            
            <Button
              variant="outline"
              onClick={() => navigate('/verifier-portal')}
              iconName="ArrowLeft"
              iconPosition="left">

              {currentLanguage === 'hi' ? 'नया सत्यापन' : 'New Verification'}
            </Button>
          </div>
        </div>

        {/* Verification Status */}
        <div className="mb-8">
          <VerificationStatus
            status={verificationData?.status}
            score={verificationData?.score}
            verificationId={verificationData?.verificationId}
            verificationDate={verificationData?.verificationDate} />

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-8">
            {/* Certificate Details */}
            {verificationData?.certificate &&
            <CertificateDetails
              certificate={verificationData?.certificate}
              isValid={verificationData?.status === 'valid'} />

            }

            {/* Blockchain Proof */}
            {verificationData?.blockchainData &&
            <BlockchainProof
              blockchainData={verificationData?.blockchainData}
              isValid={verificationData?.status === 'valid'} />

            }

            {/* Failure Reasons */}
            {verificationData?.status === 'invalid' && verificationData?.failureReasons?.length > 0 &&
            <FailureReasons
              reasons={verificationData?.failureReasons}
              certificateId={certificateId}
              onRetryVerification={handleRetryVerification}
              onReportIssue={handleReportIssue} />

            }
          </div>

          {/* Action Panel */}
          <div className="xl:col-span-1">
            <ActionPanel
              verificationData={verificationData}
              onShare={handleShare}
              onPrint={handlePrint}
              onExportPDF={handleExportPDF}
              onVerifyAnother={handleVerifyAnother}
              onReportSuspicious={handleReportSuspicious} />

          </div>
        </div>

        {/* Footer Information */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">
                {currentLanguage === 'hi' ? 'सुरक्षा जानकारी' : 'Security Information'}
              </h4>
              <p>
                {currentLanguage === 'hi' ? 'सभी सत्यापन एथेरियम ब्लॉकचेन पर एंकर किए गए हैं।' : 'All verifications are anchored on the Ethereum blockchain.'
                }
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">
                {currentLanguage === 'hi' ? 'सहायता' : 'Support'}
              </h4>
              <p>
                {currentLanguage === 'hi' ? 'सत्यापन संबंधी सहायता के लिए संपर्क करें।' : 'Contact support for verification assistance.'
                }
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">
                {currentLanguage === 'hi' ? 'गोपनीयता' : 'Privacy'}
              </h4>
              <p>
                {currentLanguage === 'hi' ? 'आपकी गोपनीयता हमारी प्राथमिकता है।' : 'Your privacy is our priority.'
                }
              </p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date()?.getFullYear()} SkillChain Credentials. 
              {currentLanguage === 'hi' ? ' NCVET द्वारा अनुमोदित। सभी अधिकार सुरक्षित।' : ' NCVET Approved. All rights reserved.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>);

};

export default VerificationResults;