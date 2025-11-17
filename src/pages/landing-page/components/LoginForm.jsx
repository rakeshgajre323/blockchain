import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = ({ onAuthSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    affiliation: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const affiliationOptions = [
    { value: 'ncvet', label: 'NCVET (National Council for Vocational Education and Training)' },
    { value: 'skill-india', label: 'Skill India Initiative' },
    { value: 'nsdc', label: 'NSDC (National Skill Development Corporation)' },
    { value: 'sector-council', label: 'Sector Skill Council' },
    { value: 'training-institute', label: 'Private Training Institute' },
    { value: 'government-iti', label: 'Government ITI' },
    { value: 'university', label: 'University/College' },
    { value: 'corporate', label: 'Corporate Training Center' }
  ];

  // Mock credentials for demonstration
  const mockCredentials = {
    email: "admin@skillchain.edu.in",
    password: "SkillChain@2024"
  };

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData?.affiliation) {
      newErrors.affiliation = 'Please select your institutional affiliation';
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
        // Store authentication data
        localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
        localStorage.setItem('userRole', 'issuer');
        localStorage.setItem('userEmail', formData?.email);
        localStorage.setItem('userAffiliation', formData?.affiliation);
        
        if (formData?.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        // Call success callback
        if (onAuthSuccess) {
          onAuthSuccess({
            email: formData?.email,
            affiliation: formData?.affiliation,
            role: 'issuer'
          });
        }

        // Navigate to certificate management
        navigate('/certificate-management');
      } else {
        setErrors({
          submit: `Invalid credentials. Use: ${mockCredentials?.email} / ${mockCredentials?.password}`
        });
      }
    } catch (error) {
      setErrors({
        submit: 'Authentication failed. Please check your network connection and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // In a real app, this would trigger password reset flow
    alert('Password reset link would be sent to your registered email address.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your institutional email"
        value={formData?.email}
        onChange={(e) => handleInputChange('email', e?.target?.value)}
        error={errors?.email}
        required
        disabled={isLoading}
      />
      {/* Password Field */}
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={formData?.password}
        onChange={(e) => handleInputChange('password', e?.target?.value)}
        error={errors?.password}
        required
        disabled={isLoading}
      />
      {/* Institutional Affiliation */}
      <Select
        label="Institutional Affiliation"
        placeholder="Select your organization type"
        options={affiliationOptions}
        value={formData?.affiliation}
        onChange={(value) => handleInputChange('affiliation', value)}
        error={errors?.affiliation}
        required
        disabled={isLoading}
        searchable
      />
      {/* Remember Me */}
      <Checkbox
        label="Remember me on this device"
        description="Keep me signed in for faster access"
        checked={formData?.rememberMe}
        onChange={(e) => handleInputChange('rememberMe', e?.target?.checked)}
        disabled={isLoading}
      />
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
        iconName="LogIn"
        iconPosition="left"
      >
        {isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
      </Button>
      {/* Forgot Password */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:text-primary/80 transition-smooth"
          disabled={isLoading}
        >
          Forgot your password?
        </button>
      </div>
      {/* Demo Credentials Info */}
      <div className="p-3 bg-muted rounded-md">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium mb-1">Demo Credentials:</p>
            <p>Email: {mockCredentials?.email}</p>
            <p>Password: {mockCredentials?.password}</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;