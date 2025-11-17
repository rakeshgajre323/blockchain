import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from "../AppIcon.jsx";
import Button from './Button';

const Header = ({ userRole = null, isAuthenticated = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { 
      label: 'Home', 
      path: '/landing-page', 
      icon: 'Home',
      roles: ['public', 'issuer', 'learner', 'verifier']
    },
    { 
      label: 'Certificate Management', 
      path: '/certificate-management', 
      icon: 'FileText',
      roles: ['issuer']
    },
    { 
      label: 'My Wallet', 
      path: '/learner-wallet', 
      icon: 'Wallet',
      roles: ['learner']
    },
    { 
      label: 'Verify Credentials', 
      path: '/verifier-portal', 
      icon: 'Shield',
      roles: ['verifier', 'public']
    },
    { 
      label: 'Verification Results', 
      path: '/verification-results', 
      icon: 'CheckCircle',
      roles: ['verifier']
    }
  ];

  const moreMenuItems = [
    { 
      label: 'Settings', 
      path: '/settings', 
      icon: 'Settings',
      roles: ['issuer', 'learner', 'verifier']
    },
    { 
      label: 'Help & Support', 
      path: '/help', 
      icon: 'HelpCircle',
      roles: ['public', 'issuer', 'learner', 'verifier']
    },
    { 
      label: 'Admin Panel', 
      path: '/admin', 
      icon: 'Users',
      roles: ['admin']
    }
  ];

  const getVisibleNavItems = () => {
    const currentRole = userRole || 'public';
    return navigationItems?.filter(item => 
      item?.roles?.includes(currentRole) || item?.roles?.includes('public')
    )?.slice(0, 4);
  };

  const getMoreMenuItems = () => {
    const currentRole = userRole || 'public';
    return moreMenuItems?.filter(item => 
      item?.roles?.includes(currentRole) || item?.roles?.includes('public')
    );
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsMoreMenuOpen(false);
  };

  const handleAuthentication = () => {
    if (isAuthenticated) {
      // Handle logout
      navigate('/landing-page');
    } else {
      navigate('/issuer-authentication');
    }
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-surface border-b border-border shadow-subtle">
      <div className="flex h-16 items-center px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Shield" size={20} color="white" />
          </div>
          <span className="font-semibold text-lg text-foreground">
            SkillChain Credentials
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 ml-8">
          {getVisibleNavItems()?.map((item) => (
            <Button
              key={item?.path}
              variant={isActivePath(item?.path) ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
              className="h-9"
            >
              {item?.label}
            </Button>
          ))}
          
          {/* More Menu */}
          {getMoreMenuItems()?.length > 0 && (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                iconName="MoreHorizontal"
                iconSize={16}
                className="h-9"
              >
                More
              </Button>
              
              {isMoreMenuOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-elevated z-50">
                  {getMoreMenuItems()?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                    >
                      <Icon name={item?.icon} size={16} className="mr-2" />
                      {item?.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Right Side Actions */}
        <div className="ml-auto flex items-center space-x-2">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Globe"
            iconSize={16}
            className="hidden sm:flex"
          >
            EN
          </Button>

          {/* Authentication Button */}
          <Button
            variant={isAuthenticated ? "outline" : "default"}
            size="sm"
            onClick={handleAuthentication}
            iconName={isAuthenticated ? "LogOut" : "LogIn"}
            iconPosition="left"
            iconSize={16}
            className="hidden sm:flex"
          >
            {isAuthenticated ? "Sign Out" : "Sign In"}
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            iconName="Menu"
            iconSize={20}
            className="md:hidden"
          />
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-surface">
          <div className="px-4 py-2 space-y-1">
            {getVisibleNavItems()?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} className="mr-3" />
                {item?.label}
              </button>
            ))}
            
            {getMoreMenuItems()?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-smooth"
              >
                <Icon name={item?.icon} size={16} className="mr-3" />
                {item?.label}
              </button>
            ))}
            
            <div className="border-t border-border pt-2 mt-2">
              <button
                onClick={handleAuthentication}
                className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-smooth"
              >
                <Icon name={isAuthenticated ? "LogOut" : "LogIn"} size={16} className="mr-3" />
                {isAuthenticated ? "Sign Out" : "Sign In"}
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-smooth"
              >
                <Icon name="Globe" size={16} className="mr-3" />
                Language: EN
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Overlay for dropdowns */}
      {(isMobileMenuOpen || isMoreMenuOpen) && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-20"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsMoreMenuOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;