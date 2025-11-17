import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegistrationForm = ({ onRegistrationSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organizationName: '',
    registrationNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactPerson: '',
    phoneNumber: '',
    address: '',
    organizationType: '',
    verificationDocument: null,
    agreeToTerms: false,
    agreeToPrivacy: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const organizationTypes = [
    { value: 'ncvet-affiliated', label: 'NCVET Affiliated Institute' },
    { value: 'skill-india-partner', label: 'Skill India Partner' },
    { value: 'nsdc-member', label: 'NSDC Member Organization' },
    { value: 'sector-council', label: 'Sector Skill Council' },
    { value: 'private-institute', label: 'Private Training Institute' },
    { value: 'government-iti', label: 'Government ITI' },
    { value: 'university', label: 'University/Educational Institution' },
    { value: 'corporate-training', label: 'Corporate Training Center' },
    { value: 'ngo', label: 'NGO/Non-Profit Organization' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes?.includes(file?.type)) {
        setErrors(prev => ({
          ...prev,
          verificationDocument: 'Please upload a PDF, JPEG, or PNG file'
        }));
        return;
      }

      if (file?.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          verificationDocument: 'File size must be less than 5MB'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        verificationDocument: file
      }));
      
      // Clear error
      if (errors?.verificationDocument) {
        setErrors(prev => ({
          ...prev,
          verificationDocument: ''
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.organizationName?.trim()) {
      newErrors.organizationName = 'Organization name is required';
    }

    if (!formData?.registrationNumber?.trim()) {
      newErrors.registrationNumber = 'Registration number is required';
    }

    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/?.test(formData?.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, number, and special character';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.contactPerson?.trim()) {
      newErrors.contactPerson = 'Contact person name is required';
    }

    if (!formData?.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/?.test(formData?.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (!formData?.organizationType) {
      newErrors.organizationType = 'Please select organization type';
    }

    if (!formData?.verificationDocument) {
      newErrors.verificationDocument = 'Verification document is required';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    if (!formData?.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call for registration
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate successful registration
      const registrationData = {
        organizationId: 'ORG-' + Date.now(),
        organizationName: formData?.organizationName,
        email: formData?.email,
        registrationNumber: formData?.registrationNumber,
        status: 'pending_verification'
      };

      // Call success callback
      if (onRegistrationSuccess) {
        onRegistrationSuccess(registrationData);
      }

      // Show success message
      alert(`Registration successful! Your organization ID is ${registrationData?.organizationId}. Please check your email for verification instructions.`);

      // Navigate back to login
      navigate('/issuer-authentication');
    } catch (error) {
      setErrors({
        submit: 'Registration failed. Please try again or contact support.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Organization Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Organization Details</h3>
        
        <Input
          label="Organization Name"
          type="text"
          placeholder="Enter your organization name"
          value={formData?.organizationName}
          onChange={(e) => handleInputChange('organizationName', e?.target?.value)}
          error={errors?.organizationName}
          required
          disabled={isLoading}
        />

        <Input
          label="Registration Number"
          type="text"
          placeholder="Enter registration/license number"
          value={formData?.registrationNumber}
          onChange={(e) => handleInputChange('registrationNumber', e?.target?.value)}
          error={errors?.registrationNumber}
          required
          disabled={isLoading}
          description="Government registration number or license ID"
        />

        <Select
          label="Organization Type"
          placeholder="Select your organization type"
          options={organizationTypes}
          value={formData?.organizationType}
          onChange={(value) => handleInputChange('organizationType', value)}
          error={errors?.organizationType}
          required
          disabled={isLoading}
          searchable
        />
      </div>
      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
        
        <Input
          label="Contact Person"
          type="text"
          placeholder="Enter authorized person name"
          value={formData?.contactPerson}
          onChange={(e) => handleInputChange('contactPerson', e?.target?.value)}
          error={errors?.contactPerson}
          required
          disabled={isLoading}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter official email address"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
          disabled={isLoading}
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="Enter 10-digit mobile number"
          value={formData?.phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e?.target?.value)}
          error={errors?.phoneNumber}
          required
          disabled={isLoading}
        />

        <Input
          label="Address"
          type="text"
          placeholder="Enter complete address"
          value={formData?.address}
          onChange={(e) => handleInputChange('address', e?.target?.value)}
          disabled={isLoading}
        />
      </div>
      {/* Account Security */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Account Security</h3>
        
        <Input
          label="Password"
          type="password"
          placeholder="Create a strong password"
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          error={errors?.password}
          required
          disabled={isLoading}
          description="Must contain uppercase, lowercase, number, and special character"
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
          disabled={isLoading}
        />
      </div>
      {/* Verification Document */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Verification</h3>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Verification Document *
          </label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
              id="verification-document"
              disabled={isLoading}
            />
            <label
              htmlFor="verification-document"
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <Icon name="Upload" size={32} className="text-muted-foreground" />
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-primary">Click to upload</span> or drag and drop
              </div>
              <div className="text-xs text-muted-foreground">
                PDF, JPEG, PNG up to 5MB
              </div>
            </label>
            {formData?.verificationDocument && (
              <div className="mt-2 text-sm text-success">
                ✓ {formData?.verificationDocument?.name}
              </div>
            )}
          </div>
          {errors?.verificationDocument && (
            <p className="text-sm text-error">{errors?.verificationDocument}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Upload registration certificate, license, or official authorization document
          </p>
        </div>
      </div>
      {/* Terms and Conditions */}
      <div className="space-y-3">
        <Checkbox
          label="I agree to the Terms and Conditions"
          checked={formData?.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
          error={errors?.agreeToTerms}
          required
          disabled={isLoading}
        />

        <Checkbox
          label="I agree to the Privacy Policy"
          checked={formData?.agreeToPrivacy}
          onChange={(e) => handleInputChange('agreeToPrivacy', e?.target?.checked)}
          error={errors?.agreeToPrivacy}
          required
          disabled={isLoading}
        />
      </div>
      {/* Submit Error */}
      {errors?.submit && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
            <p className="text-sm text-error">{errors?.submit}</p>
          </div>
        </div>
      )}
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        iconName="UserPlus"
        iconPosition="left"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegistrationForm;