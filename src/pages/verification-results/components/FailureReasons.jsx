import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FailureReasons = ({ reasons, certificateId, onRetryVerification, onReportIssue }) => {
  const reasonConfig = {
    'certificate_not_found': {
      icon: 'FileX',
      title: 'Certificate Not Found',
      description: 'The certificate ID does not exist in our database.',
      severity: 'error',
      action: 'Verify the certificate ID and try again.'
    },
    'blockchain_mismatch': {
      icon: 'AlertTriangle',
      title: 'Blockchain Hash Mismatch',
      description: 'The certificate data does not match the blockchain record.',
      severity: 'error',
      action: 'This certificate may have been tampered with.'
    },
    'expired_certificate': {
      icon: 'Clock',
      title: 'Certificate Expired',
      description: 'This certificate has passed its validity period.',
      severity: 'warning',
      action: 'Contact the issuing institution for renewal.'
    },
    'revoked_certificate': {
      icon: 'Ban',
      title: 'Certificate Revoked',
      description: 'This certificate has been revoked by the issuing authority.',
      severity: 'error',
      action: 'Contact the institution for more information.'
    },
    'invalid_signature': {
      icon: 'ShieldX',
      title: 'Invalid Digital Signature',
      description: 'The certificate signature could not be verified.',
      severity: 'error',
      action: 'This certificate may be fraudulent.'
    },
    'network_error': {
      icon: 'Wifi',
      title: 'Network Connection Error',
      description: 'Unable to connect to the blockchain network.',
      severity: 'warning',
      action: 'Check your internet connection and try again.'
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'error':
        return 'text-error bg-error/10 border-error/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="AlertCircle" size={24} className="text-error" />
        <h3 className="text-xl font-semibold text-foreground">Verification Issues</h3>
      </div>
      <div className="space-y-4">
        {reasons?.map((reasonKey, index) => {
          const reason = reasonConfig?.[reasonKey] || {
            icon: 'AlertCircle',
            title: 'Unknown Error',
            description: 'An unknown verification error occurred.',
            severity: 'error',
            action: 'Please try again or contact support.'
          };

          return (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getSeverityColor(reason?.severity)}`}
            >
              <div className="flex items-start space-x-3">
                <Icon name={reason?.icon} size={20} className="flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">
                    {reason?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {reason?.description}
                  </p>
                  <p className="text-sm font-medium">
                    Recommended Action: {reason?.action}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Certificate ID Display */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-muted-foreground">Failed Certificate ID:</span>
            <p className="font-mono text-sm mt-1 break-all">{certificateId}</p>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            onClick={onRetryVerification}
            iconName="RefreshCw"
            iconPosition="left"
            className="flex-1"
          >
            Retry Verification
          </Button>
          
          <Button
            variant="outline"
            onClick={onReportIssue}
            iconName="Flag"
            iconPosition="left"
            className="flex-1"
          >
            Report Issue
          </Button>
        </div>
      </div>
      {/* Help Section */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="font-medium text-foreground mb-2 flex items-center">
          <Icon name="HelpCircle" size={16} className="mr-2 text-primary" />
          Need Help?
        </h4>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>• Double-check the certificate ID for any typos</p>
          <p>• Ensure you have a stable internet connection</p>
          <p>• Contact the issuing institution if the certificate should be valid</p>
          <p>• Report suspicious certificates to help prevent fraud</p>
        </div>
      </div>
    </div>
  );
};

export default FailureReasons;