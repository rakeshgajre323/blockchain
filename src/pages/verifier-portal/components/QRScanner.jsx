import React, { useState, useRef, useEffect } from 'react';
import Icon from "../../../components/AppIcon.jsx";
import Button from '../../../components/ui/Button';

const QRScanner = ({ onScan, isActive, onToggle }) => {
  const [hasCamera, setHasCamera] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const [permissionStatus, setPermissionStatus] = useState('prompt');
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    checkCameraAvailability();
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (isActive && hasCamera) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [isActive, hasCamera]);

  const checkCameraAvailability = async () => {
    try {
      const devices = await navigator.mediaDevices?.enumerateDevices();
      const videoDevices = devices?.filter(device => device?.kind === 'videoinput');
      setHasCamera(videoDevices?.length > 0);
      
      // Check permission status
      if (navigator.permissions) {
        const permission = await navigator.permissions?.query({ name: 'camera' });
        setPermissionStatus(permission?.state);
      }
    } catch (err) {
      console.error('Error checking camera availability:', err);
      setHasCamera(false);
    }
  };

  const startCamera = async () => {
    try {
      setError('');
      setIsScanning(true);
      
      const stream = await navigator.mediaDevices?.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });
      
      streamRef.current = stream;
      
      if (videoRef?.current) {
        videoRef.current.srcObject = stream;
        videoRef?.current?.play();
      }
      
      setPermissionStatus('granted');
    } catch (err) {
      console.error('Error starting camera:', err);
      setError(getErrorMessage(err));
      setPermissionStatus('denied');
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (streamRef?.current) {
      streamRef?.current?.getTracks()?.forEach(track => track?.stop());
      streamRef.current = null;
    }
    
    if (videoRef?.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsScanning(false);
  };

  const getErrorMessage = (err) => {
    if (err?.name === 'NotAllowedError') {
      return 'Camera permission denied. Please allow camera access to scan QR codes.';
    } else if (err?.name === 'NotFoundError') {
      return 'No camera found on this device.';
    } else if (err?.name === 'NotSupportedError') {
      return 'Camera not supported in this browser.';
    }
    return 'Unable to access camera. Please try again.';
  };

  const handleToggleScanner = () => {
    if (isActive) {
      stopCamera();
    }
    onToggle();
  };

  const simulateQRScan = (sampleId) => {
    // Simulate QR code detection for demo purposes
    onScan(sampleId);
    stopCamera();
    onToggle();
  };

  const sampleQRCodes = [
    'CERT-2024-QR001',
    'SKL-QR789-2024',
    'NCVET-QR456-24'
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="QrCode" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground">QR Code Scanner</h3>
            <p className="text-sm text-muted-foreground">Scan certificate QR code with camera</p>
          </div>
        </div>
        
        <Button
          variant={isActive ? "destructive" : "outline"}
          size="sm"
          onClick={handleToggleScanner}
          iconName={isActive ? "X" : "Camera"}
          iconPosition="left"
        >
          {isActive ? 'Stop Scanner' : 'Start Scanner'}
        </Button>
      </div>
      {!hasCamera && (
        <div className="flex items-center space-x-2 p-4 bg-warning/10 border border-warning/20 rounded-md mb-4">
          <Icon name="AlertTriangle" size={16} className="text-warning" />
          <p className="text-sm text-warning">
            No camera detected on this device. Use manual certificate ID input instead.
          </p>
        </div>
      )}
      {error && (
        <div className="flex items-center space-x-2 p-4 bg-error/10 border border-error/20 rounded-md mb-4">
          <Icon name="AlertCircle" size={16} className="text-error" />
          <p className="text-sm text-error">{error}</p>
        </div>
      )}
      {isActive && hasCamera && (
        <div className="space-y-4">
          <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
            {isScanning ? (
              <>
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  playsInline
                  muted
                />
                
                {/* QR Code targeting overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    {/* Corner brackets */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg"></div>
                    
                    {/* Scanning line animation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-0.5 bg-white animate-pulse"></div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                    Position QR code within the frame
                  </p>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-white">
                  <Icon name="Loader2" size={32} className="animate-spin mx-auto mb-2" />
                  <p className="text-sm">Starting camera...</p>
                </div>
              </div>
            )}
          </div>

          {/* Demo QR codes for testing */}
          <div className="p-4 bg-muted/50 rounded-md">
            <h4 className="text-sm font-medium text-foreground mb-2">Demo QR Codes (Click to simulate scan):</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {sampleQRCodes?.map((code, index) => (
                <button
                  key={index}
                  onClick={() => simulateQRScan(code)}
                  className="flex items-center justify-center p-3 bg-surface border border-border rounded-md hover:bg-muted transition-smooth"
                >
                  <div className="text-center">
                    <Icon name="QrCode" size={24} className="text-muted-foreground mx-auto mb-1" />
                    <code className="text-xs font-mono text-muted-foreground">{code}</code>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {!isActive && hasCamera && (
        <div className="text-center py-8">
          <Icon name="Camera" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">
            Click "Start Scanner" to begin scanning QR codes
          </p>
          
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-success" />
              <span>Instant verification</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-success" />
              <span>Blockchain secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-success" />
              <span>Works offline</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-success" />
              <span>Mobile optimized</span>
            </div>
          </div>
        </div>
      )}
      {permissionStatus === 'denied' && (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground mb-2">
            Camera access is required for QR scanning
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={checkCameraAvailability}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Check Permissions
          </Button>
        </div>
      )}
    </div>
  );
};

export default QRScanner;