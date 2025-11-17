import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const StatusIndicator = ({ 
  status = 'idle', 
  message = '', 
  transactionId = null,
  showDetails = false,
  onStatusChange = null,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  const statusConfig = {
    idle: {
      icon: 'Circle',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
      label: 'Ready',
      description: 'System ready for operations'
    },
    pending: {
      icon: 'Loader2',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      label: 'Processing',
      description: 'Transaction in progress on blockchain',
      animate: 'animate-spin'
    },
    confirming: {
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      label: 'Confirming',
      description: 'Waiting for blockchain confirmation',
      animate: 'animate-pulse-subtle'
    },
    confirmed: {
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      label: 'Confirmed',
      description: 'Transaction successfully confirmed'
    },
    failed: {
      icon: 'XCircle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      label: 'Failed',
      description: 'Transaction failed or rejected'
    },
    warning: {
      icon: 'AlertTriangle',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      label: 'Warning',
      description: 'Attention required'
    },
    success: {
      icon: 'CheckCircle2',
      color: 'text-success',
      bgColor: 'bg-success/10',
      label: 'Success',
      description: 'Operation completed successfully'
    },
    error: {
      icon: 'AlertCircle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      label: 'Error',
      description: 'An error occurred'
    }
  };

  const currentStatus = statusConfig?.[status] || statusConfig?.idle;

  useEffect(() => {
    if (status === 'confirmed' || status === 'success') {
      setAnimationClass('animate-fade-in');
      const timer = setTimeout(() => setAnimationClass(''), 300);
      return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    if (onStatusChange) {
      onStatusChange(status, message, transactionId);
    }
  }, [status, message, transactionId, onStatusChange]);

  const formatTransactionId = (id) => {
    if (!id) return null;
    return `${id?.substring(0, 8)}...${id?.substring(id?.length - 8)}`;
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard?.writeText(text);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      {/* Status Icon and Label */}
      <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${currentStatus?.bgColor} ${animationClass}`}>
        <Icon 
          name={currentStatus?.icon} 
          size={16} 
          className={`${currentStatus?.color} ${currentStatus?.animate || ''}`}
        />
        <span className={`text-sm font-medium ${currentStatus?.color}`}>
          {currentStatus?.label}
        </span>
      </div>
      {/* Message */}
      {message && (
        <span className="text-sm text-foreground max-w-xs truncate">
          {message}
        </span>
      )}
      {/* Transaction ID */}
      {transactionId && (
        <button
          onClick={() => copyToClipboard(transactionId)}
          className="inline-flex items-center space-x-1 px-2 py-1 text-xs font-mono text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80 rounded transition-smooth"
          title="Click to copy full transaction ID"
        >
          <Icon name="Hash" size={12} />
          <span>{formatTransactionId(transactionId)}</span>
          <Icon name="Copy" size={12} />
        </button>
      )}
      {/* Details Toggle */}
      {showDetails && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 text-muted-foreground hover:text-foreground transition-smooth"
        >
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={16} 
          />
        </button>
      )}
      {/* Expanded Details */}
      {isExpanded && showDetails && (
        <div className="absolute top-full left-0 mt-2 p-3 bg-popover border border-border rounded-md shadow-elevated z-50 min-w-64">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name={currentStatus?.icon} size={16} className={currentStatus?.color} />
              <span className="font-medium text-sm">{currentStatus?.label}</span>
            </div>
            
            <p className="text-xs text-muted-foreground">
              {currentStatus?.description}
            </p>
            
            {message && (
              <div className="pt-2 border-t border-border">
                <p className="text-xs font-medium text-foreground">Message:</p>
                <p className="text-xs text-muted-foreground mt-1">{message}</p>
              </div>
            )}
            
            {transactionId && (
              <div className="pt-2 border-t border-border">
                <p className="text-xs font-medium text-foreground">Transaction ID:</p>
                <div className="flex items-center space-x-2 mt-1">
                  <code className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded flex-1 truncate">
                    {transactionId}
                  </code>
                  <button
                    onClick={() => copyToClipboard(transactionId)}
                    className="p-1 text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    <Icon name="Copy" size={12} />
                  </button>
                </div>
              </div>
            )}
            
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Last updated: {new Date()?.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Notification variant for global status updates
export const StatusNotification = ({ 
  status, 
  title, 
  message, 
  onClose, 
  autoClose = true,
  duration = 5000 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose && onClose(), 300);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  const statusConfig = {
    success: {
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10 border-success/20'
    },
    error: {
      icon: 'XCircle',
      color: 'text-error',
      bgColor: 'bg-error/10 border-error/20'
    },
    warning: {
      icon: 'AlertTriangle',
      color: 'text-warning',
      bgColor: 'bg-warning/10 border-warning/20'
    },
    info: {
      icon: 'Info',
      color: 'text-primary',
      bgColor: 'bg-primary/10 border-primary/20'
    }
  };

  const currentStatus = statusConfig?.[status] || statusConfig?.info;

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full bg-surface border rounded-lg shadow-elevated ${currentStatus?.bgColor} animate-slide-in`}>
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <Icon 
            name={currentStatus?.icon} 
            size={20} 
            className={`flex-shrink-0 mt-0.5 ${currentStatus?.color}`}
          />
          
          <div className="flex-1 min-w-0">
            {title && (
              <h4 className="text-sm font-medium text-foreground mb-1">
                {title}
              </h4>
            )}
            {message && (
              <p className="text-sm text-muted-foreground">
                {message}
              </p>
            )}
          </div>
          
          {onClose && (
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => onClose(), 300);
              }}
              className="flex-shrink-0 p-1 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Progress indicator for multi-step processes
export const ProgressIndicator = ({ 
  steps = [], 
  currentStep = 0, 
  status = 'pending' 
}) => {
  return (
    <div className="flex items-center space-x-2">
      {steps?.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isFailed = isActive && status === 'failed';
        
        return (
          <React.Fragment key={index}>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-smooth ${
              isFailed 
                ? 'border-error bg-error text-error-foreground'
                : isCompleted
                ? 'border-success bg-success text-success-foreground'
                : isActive
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-muted bg-muted text-muted-foreground'
            }`}>
              {isFailed ? (
                <Icon name="X" size={16} />
              ) : isCompleted ? (
                <Icon name="Check" size={16} />
              ) : isActive && status === 'pending' ? (
                <Icon name="Loader2" size={16} className="animate-spin" />
              ) : (
                <span className="text-xs font-medium">{index + 1}</span>
              )}
            </div>
            {index < steps?.length - 1 && (
              <div className={`h-0.5 w-8 transition-smooth ${
                index < currentStep ? 'bg-success' : 'bg-muted'
              }`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StatusIndicator;