import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkVerification = ({ onBulkVerify, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    const files = e?.dataTransfer?.files;
    if (files && files?.[0]) {
      handleFile(files?.[0]);
    }
  };

  const handleFileInput = (e) => {
    const files = e?.target?.files;
    if (files && files?.[0]) {
      handleFile(files?.[0]);
    }
  };

  const handleFile = (file) => {
    setUploadError('');
    
    // Validate file type
    if (!file?.name?.toLowerCase()?.endsWith('.csv')) {
      setUploadError('Please upload a CSV file only.');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file?.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB.');
      return;
    }
    
    setUploadedFile(file);
  };

  const handleBulkVerify = () => {
    if (!uploadedFile) {
      setUploadError('Please select a CSV file first.');
      return;
    }
    
    // Read and parse CSV file
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e?.target?.result;
        const lines = csv?.split('\n')?.filter(line => line?.trim());
        
        if (lines?.length < 2) {
          setUploadError('CSV file must contain at least a header and one data row.');
          return;
        }
        
        // Parse CSV (expecting certificate_id column)
        const headers = lines?.[0]?.split(',')?.map(h => h?.trim()?.toLowerCase());
        const certIdIndex = headers?.findIndex(h => 
          h?.includes('certificate') && h?.includes('id') || 
          h === 'cert_id' || 
          h === 'id'
        );
        
        if (certIdIndex === -1) {
          setUploadError('CSV must contain a "certificate_id" or "cert_id" column.');
          return;
        }
        
        const certificateIds = lines?.slice(1)?.map(line => {
          const values = line?.split(',');
          return values?.[certIdIndex]?.trim();
        })?.filter(id => id && id?.length > 0);
        
        if (certificateIds?.length === 0) {
          setUploadError('No valid certificate IDs found in the CSV file.');
          return;
        }
        
        onBulkVerify(certificateIds, uploadedFile?.name);
        
      } catch (error) {
        setUploadError('Error parsing CSV file. Please check the format.');
      }
    };
    
    reader?.readAsText(uploadedFile);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadError('');
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadTemplate = () => {
    const csvContent = `certificate_id,candidate_name,position\nCERT-2024-ABC123,John Doe,Software Developer\nSKL-DEF456-2024,Jane Smith,Data Analyst\nNCVET-789XYZ-24,Mike Johnson,Web Designer`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk_verification_template.csv';
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    window.URL?.revokeObjectURL(url);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
          <Icon name="Upload" size={20} className="text-secondary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-foreground">Bulk Verification</h3>
          <p className="text-sm text-muted-foreground">Upload CSV file to verify multiple certificates</p>
        </div>
      </div>
      <div className="space-y-4">
        {/* File Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-smooth ${
            dragActive 
              ? 'border-primary bg-primary/5' 
              : uploadedFile 
              ? 'border-success bg-success/5' :'border-muted-foreground/30 hover:border-muted-foreground/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isLoading}
          />
          
          {uploadedFile ? (
            <div className="space-y-2">
              <Icon name="FileText" size={32} className="text-success mx-auto" />
              <div>
                <p className="font-medium text-foreground">{uploadedFile?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(uploadedFile?.size / 1024)?.toFixed(1)} KB
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeFile}
                iconName="X"
                iconPosition="left"
                disabled={isLoading}
              >
                Remove File
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Icon name="Upload" size={32} className="text-muted-foreground mx-auto" />
              <div>
                <p className="font-medium text-foreground">Drop CSV file here or click to browse</p>
                <p className="text-sm text-muted-foreground">Maximum file size: 5MB</p>
              </div>
            </div>
          )}
        </div>

        {uploadError && (
          <div className="flex items-center space-x-2 p-3 bg-error/10 border border-error/20 rounded-md">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <p className="text-sm text-error">{uploadError}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            size="lg"
            onClick={handleBulkVerify}
            loading={isLoading}
            disabled={!uploadedFile || isLoading}
            iconName="Shield"
            iconPosition="left"
            className="flex-1"
          >
            {isLoading ? 'Processing Certificates...' : 'Verify All Certificates'}
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={downloadTemplate}
            iconName="Download"
            iconPosition="left"
            disabled={isLoading}
          >
            Download Template
          </Button>
        </div>

        {/* Instructions */}
        <div className="space-y-3 pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground">CSV Format Requirements:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start space-x-2">
              <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">Include "certificate_id" column header</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">One certificate ID per row</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">Maximum 1000 certificates per file</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">UTF-8 encoding recommended</span>
            </div>
          </div>
        </div>

        {/* Sample Format */}
        <div className="p-3 bg-muted/50 rounded-md">
          <h4 className="text-sm font-medium text-foreground mb-2">Sample CSV Format:</h4>
          <code className="text-xs font-mono text-muted-foreground block whitespace-pre">
{`certificate_id,candidate_name,position
CERT-2024-ABC123,John Doe,Software Developer
SKL-DEF456-2024,Jane Smith,Data Analyst`}
          </code>
        </div>
      </div>
    </div>
  );
};

export default BulkVerification;