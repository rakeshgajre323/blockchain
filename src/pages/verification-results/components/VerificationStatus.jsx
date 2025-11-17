import React from 'react';
import Icon from '../../../components/AppIcon';

const VerificationStatus = ({ status, score, verificationId, verificationDate }) => {
  const statusConfig = {
    valid: {
      icon: 'CheckCircle',
      title: 'Certificate Verified',
      subtitle: 'This credential is authentic and valid',
      bgColor: 'bg-success/10',
      borderColor: 'border-success',
      textColor: 'text-success',
      iconBg: 'bg-success'
    },
    invalid: {
      icon: 'XCircle',
      title: 'Verification Failed',
      subtitle: 'This credential could not be verified',
      bgColor: 'bg-error/10',
      borderColor: 'border-error',
      textColor: 'text-error',
      iconBg: 'bg-error'
    },
    pending: {
      icon: 'Clock',
      title: 'Verification in Progress',
      subtitle: 'Please wait while we verify this credential',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning',
      textColor: 'text-warning',
      iconBg: 'bg-warning'
    }
  };

  const config = statusConfig?.[status] || statusConfig?.pending;

  return (
    <div className={`p-6 rounded-lg border-2 ${config?.bgColor} ${config?.borderColor}`}>
      <div className="flex items-center justify-center mb-4">
        <div className={`w-16 h-16 rounded-full ${config?.iconBg} flex items-center justify-center`}>
          <Icon name={config?.icon} size={32} color="white" />
        </div>
      </div>
      <div className="text-center space-y-2">
        <h2 className={`text-2xl font-bold ${config?.textColor}`}>
          {config?.title}
        </h2>
        <p className="text-muted-foreground">
          {config?.subtitle}
        </p>
        
        {status === 'valid' && score && (
          <div className="mt-4 p-3 bg-surface rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Authenticity Score</span>
              <span className={`font-semibold ${config?.textColor}`}>{score}%</span>
            </div>
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Verification ID:</span>
              <p className="font-mono text-xs mt-1 break-all">{verificationId}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Verified On:</span>
              <p className="font-medium mt-1">{verificationDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationStatus;