import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const AuthTabs = ({ activeTab, onTabChange, isLoading = false }) => {
  const tabs = [
    {
      id: 'login',
      label: 'Sign In',
      icon: 'LogIn',
      description: 'Access your existing account'
    },
    {
      id: 'register',
      label: 'Register',
      icon: 'UserPlus',
      description: 'Create new institutional account'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex bg-muted rounded-lg p-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => !isLoading && onTabChange(tab?.id)}
            disabled={isLoading}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-smooth ${
              activeTab === tab?.id
                ? 'bg-surface text-foreground shadow-subtle'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon 
              name={tab?.icon} 
              size={16} 
              className={activeTab === tab?.id ? 'text-primary' : 'text-muted-foreground'} 
            />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Description */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {tabs?.find(tab => tab?.id === activeTab)?.description}
        </p>
      </div>
      {/* Additional Information */}
      {activeTab === 'register' && (
        <div className="p-3 bg-primary/5 border border-primary/20 rounded-md">
          <div className="flex items-start space-x-2">
            <Icon name="AlertCircle" size={16} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="text-xs text-primary">
              <p className="font-medium mb-1">Registration Requirements</p>
              <ul className="space-y-1 text-xs">
                <li>• Valid institutional registration/license</li>
                <li>• Official email address</li>
                <li>• Verification documents (PDF/Image)</li>
                <li>• Authorized person details</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'login' && (
        <div className="p-3 bg-success/5 border border-success/20 rounded-md">
          <div className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0 mt-0.5" />
            <div className="text-xs text-success">
              <p className="font-medium mb-1">Secure Access</p>
              <p>Your credentials are protected with enterprise-grade security and blockchain verification.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthTabs;