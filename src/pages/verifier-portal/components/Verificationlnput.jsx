import React, { useState } from 'react';
// --- CORRECTED IMPORTS ---
// Component is at src/pages/verifier-portal/components/VerificationInput.jsx
// It needs to go up 3 levels (../../../) to reach src/components/
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
// --- END CORRECTED IMPORTS ---

const VerificationInput = ({ onVerify, isLoading }) => {
    const [certificateId, setCertificateId] = useState('');
    const [inputError, setInputError] = useState('');

    const validateCertificateId = (id) => {
        if (!id?.trim()) {
            return 'Certificate ID is required';
        }

        // Check for valid format (alphanumeric with hyphens, 8-32 characters)
        // NOTE: Optional chaining on regex is unnecessary and slightly unconventional but harmless
        const validFormat = /^[A-Za-z0-9-]{8,32}$/.test(id?.trim()); 
        if (!validFormat) {
            return 'Invalid certificate ID format. Use 8-32 alphanumeric characters and hyphens only.';
        }

        return '';
    };

    const handleInputChange = (e) => {
        const value = e?.target?.value;
        setCertificateId(value);

        if (inputError) {
            setInputError('');
        }
    };

    const handleVerify = () => {
        const error = validateCertificateId(certificateId);
        if (error) {
            setInputError(error);
            return;
        }

        onVerify(certificateId?.trim());
    };

    const handleKeyPress = (e) => {
        if (e?.key === 'Enter' && !isLoading) {
            handleVerify();
        }
    };

    const exampleIds = [
        'CERT-2024-ABC123',
        'SKL-DEF456-2024',
        'NCVET-789XYZ-24'
    ];

    return (
        <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
            <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                    <Icon name="Search" size={20} className="text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold text-lg text-foreground">Certificate ID Verification</h3>
                    <p className="text-sm text-muted-foreground">Enter the certificate ID to verify authenticity</p>
                </div>
            </div>
            <div className="space-y-4">
                <Input
                    label="Certificate ID"
                    type="text"
                    placeholder="Enter certificate ID (e.g., CERT-2024-ABC123)"
                    value={certificateId}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    error={inputError}
                    description="Certificate ID is case-sensitive and typically 8-32 characters long"
                    disabled={isLoading}
                    className="mb-4"
                />

                <Button
                    variant="default"
                    size="lg"
                    onClick={handleVerify}
                    loading={isLoading}
                    disabled={!certificateId?.trim() || isLoading}
                    iconName="Shield"
                    iconPosition="left"
                    fullWidth
                >
                    {isLoading ? 'Verifying Certificate...' : 'Verify Certificate'}
                </Button>

                <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-medium text-foreground mb-2">Example Certificate IDs:</h4>
                    <div className="space-y-2">
                        {exampleIds?.map((id, index) => (
                            <button
                                key={index}
                                onClick={() => setCertificateId(id)}
                                disabled={isLoading}
                                className="flex items-center justify-between w-full p-2 text-sm bg-muted hover:bg-muted/80 rounded-md transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <code className="font-mono text-muted-foreground">{id}</code>
                                <Icon name="Copy" size={14} className="text-muted-foreground" />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-start space-x-2 p-3 bg-primary/5 border border-primary/20 rounded-md">
                    <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                        <p className="text-primary font-medium mb-1">Verification Process</p>
                        <p className="text-muted-foreground">
                            We verify certificates against blockchain records and IPFS storage to ensure authenticity and prevent fraud.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationInput;