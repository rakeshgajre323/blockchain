import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionPanel = ({ 
  verificationData, 
  onShare, 
  onPrint, 
  onExportPDF, 
  onVerifyAnother, 
  onReportSuspicious 
}) => {
  const [shareUrl, setShareUrl] = useState('');
  const [isGeneratingShare, setIsGeneratingShare] = useState(false);
  const [shareExpiry, setShareExpiry] = useState('24h');

  const generateShareUrl = async () => {
    setIsGeneratingShare(true);
    try {
      // Simulate API call to generate secure share URL
      const mockShareId = `share_${Date.now()}_${Math.random()?.toString(36)?.substr(2, 9)}`;
      const baseUrl = window.location?.origin;
      const generatedUrl = `${baseUrl}/verification-results/shared/${mockShareId}?expires=${shareExpiry}`;
      
      setShareUrl(generatedUrl);
      
      if (onShare) {
        onShare(generatedUrl, shareExpiry);
      }
    } catch (error) {
      console.error('Failed to generate share URL:', error);
    } finally {
      setIsGeneratingShare(false);
    }
  };

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard?.writeText(shareUrl);
      // Could add toast notification here
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const expiryOptions = [
    { value: '1h', label: '1 Hour' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Settings" size={24} className="text-primary" />
        <h3 className="text-xl font-semibold text-foreground">Actions</h3>
      </div>
      {/* Primary Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Button
          variant="default"
          onClick={onVerifyAnother}
          iconName="Search"
          iconPosition="left"
          fullWidth
        >
          Verify Another Certificate
        </Button>
        
        <Button
          variant="outline"
          onClick={onPrint}
          iconName="Printer"
          iconPosition="left"
          fullWidth
        >
          Print Results
        </Button>
      </div>
      {/* Export Options */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3 flex items-center">
          <Icon name="Download" size={16} className="mr-2 text-primary" />
          Export Options
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={onExportPDF}
            iconName="FileText"
            iconPosition="left"
            size="sm"
            fullWidth
          >
            Export as PDF
          </Button>
          
          <Button
            variant="outline"
            onClick={() => {
              const data = JSON.stringify(verificationData, null, 2);
              const blob = new Blob([data], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `verification-${verificationData?.verificationId}.json`;
              a?.click();
              URL.revokeObjectURL(url);
            }}
            iconName="Code"
            iconPosition="left"
            size="sm"
            fullWidth
          >
            Export as JSON
          </Button>
        </div>
      </div>
      {/* Share Section */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3 flex items-center">
          <Icon name="Share2" size={16} className="mr-2 text-primary" />
          Share Verification Results
        </h4>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <select
              value={shareExpiry}
              onChange={(e) => setShareExpiry(e?.target?.value)}
              className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-surface text-foreground"
            >
              {expiryOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  Expires in {option?.label}
                </option>
              ))}
            </select>
            
            <Button
              variant="default"
              onClick={generateShareUrl}
              loading={isGeneratingShare}
              iconName="Link"
              iconPosition="left"
              size="sm"
            >
              Generate Link
            </Button>
          </div>
          
          {shareUrl && (
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Shareable Link:</span>
                <Button
                  variant="ghost"
                  onClick={copyShareUrl}
                  iconName="Copy"
                  size="sm"
                >
                  Copy
                </Button>
              </div>
              <p className="text-xs font-mono text-muted-foreground break-all">
                {shareUrl}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                This link will expire in {expiryOptions?.find(opt => opt?.value === shareExpiry)?.label?.toLowerCase()}
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Report Section */}
      <div className="pt-6 border-t border-border">
        <h4 className="font-medium text-foreground mb-3 flex items-center">
          <Icon name="Shield" size={16} className="mr-2 text-primary" />
          Security Actions
        </h4>
        
        <Button
          variant="outline"
          onClick={onReportSuspicious}
          iconName="Flag"
          iconPosition="left"
          size="sm"
          className="w-full text-warning border-warning/20 hover:bg-warning/10"
        >
          Report Suspicious Certificate
        </Button>
        
        <p className="text-xs text-muted-foreground mt-2">
          Help us maintain the integrity of the credential system by reporting any suspicious or fraudulent certificates.
        </p>
      </div>
      {/* Verification Summary */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Verification ID:</span>
            <p className="font-mono text-xs mt-1 break-all">{verificationData?.verificationId}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Verified At:</span>
            <p className="font-medium mt-1">{verificationData?.verificationDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPanel;