import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const RoleNavigation = ({ userRole, isCollapsed = false, onToggleCollapse }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationConfig = {
    issuer: [
      {
        label: 'Dashboard',
        path: '/issuer-dashboard',
        icon: 'LayoutDashboard',
        description: 'Overview and analytics'
      },
      {
        label: 'Authentication',
        path: '/issuer-authentication',
        icon: 'Shield',
        description: 'Secure login portal'
      },
      {
        label: 'Certificate Management',
        path: '/certificate-management',
        icon: 'FileText',
        description: 'Create and manage certificates',
        submenu: [
          { label: 'Create Certificate', path: '/certificate-management/create', icon: 'Plus' },
          { label: 'Manage Templates', path: '/certificate-management/templates', icon: 'Layout' },
          { label: 'Batch Operations', path: '/certificate-management/batch', icon: 'Package' }
        ]
      },
      {
        label: 'Verification Logs',
        path: '/verification-logs',
        icon: 'Activity',
        description: 'Track verification activities'
      }
    ],
    learner: [
      {
        label: 'My Wallet',
        path: '/learner-wallet',
        icon: 'Wallet',
        description: 'Your digital credentials',
        submenu: [
          { label: 'All Certificates', path: '/learner-wallet/certificates', icon: 'Award' },
          { label: 'Shared Credentials', path: '/learner-wallet/shared', icon: 'Share' },
          { label: 'Download Center', path: '/learner-wallet/downloads', icon: 'Download' }
        ]
      },
      {
        label: 'Profile',
        path: '/learner-profile',
        icon: 'User',
        description: 'Manage your profile'
      },
      {
        label: 'Sharing Hub',
        path: '/sharing-hub',
        icon: 'Share2',
        description: 'Share your credentials'
      }
    ],
    verifier: [
      {
        label: 'Verification Portal',
        path: '/verifier-portal',
        icon: 'Search',
        description: 'Verify credentials quickly'
      },
      {
        label: 'Verification Results',
        path: '/verification-results',
        icon: 'CheckCircle',
        description: 'View verification outcomes',
        submenu: [
          { label: 'Recent Verifications', path: '/verification-results/recent', icon: 'Clock' },
          { label: 'Bulk Verification', path: '/verification-results/bulk', icon: 'List' },
          { label: 'Audit Trail', path: '/verification-results/audit', icon: 'FileSearch' }
        ]
      },
      {
        label: 'Reports',
        path: '/verification-reports',
        icon: 'BarChart3',
        description: 'Verification analytics'
      }
    ]
  };

  const currentNavItems = navigationConfig?.[userRole] || [];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  const isActivePath = (path) => {
    return location?.pathname === path || location?.pathname?.startsWith(path + '/');
  };

  const isActiveSubmenu = (submenu) => {
    return submenu?.some(item => isActivePath(item?.path));
  };

  if (!userRole || currentNavItems?.length === 0) {
    return null;
  }

  return (
    <nav className={`lg:fixed left-0 top-16 h-[calc(100vh-4rem)] bg-surface border-r border-border transition-all duration-300 z-40 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Navigation Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              {userRole} Portal
            </h2>
          )}
          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
              iconSize={16}
            />
          )}
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-2">
            {currentNavItems?.map((item, index) => (
              <div key={item?.path}>
                {/* Main Navigation Item */}
                <div
                  className={`group relative flex items-center rounded-lg transition-smooth ${
                    isActivePath(item?.path) || (item?.submenu && isActiveSubmenu(item?.submenu))
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <button
                    onClick={() => item?.submenu ? toggleSubmenu(index) : handleNavigation(item?.path)}
                    className="flex items-center w-full p-3 text-left"
                  >
                    <Icon 
                      name={item?.icon} 
                      size={20} 
                      className={`flex-shrink-0 ${isCollapsed ? 'mx-auto' : 'mr-3'}`}
                    />
                    {!isCollapsed && (
                      <>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{item?.label}</div>
                          {item?.description && (
                            <div className="text-xs opacity-75 truncate">{item?.description}</div>
                          )}
                        </div>
                        {item?.submenu && (
                          <Icon 
                            name={activeSubmenu === index ? "ChevronDown" : "ChevronRight"} 
                            size={16}
                            className="flex-shrink-0 ml-2"
                          />
                        )}
                      </>
                    )}
                  </button>

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-elevated opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      {item?.label}
                    </div>
                  )}
                </div>

                {/* Submenu Items */}
                {item?.submenu && !isCollapsed && activeSubmenu === index && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item?.submenu?.map((subItem) => (
                      <button
                        key={subItem?.path}
                        onClick={() => handleNavigation(subItem?.path)}
                        className={`flex items-center w-full p-2 text-sm rounded-md transition-smooth ${
                          isActivePath(subItem?.path)
                            ? 'bg-accent text-accent-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon name={subItem?.icon} size={16} className="mr-2 flex-shrink-0" />
                        <span className="truncate">{subItem?.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-border p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation('/settings')}
            iconName="Settings"
            iconPosition={isCollapsed ? undefined : "left"}
            iconSize={20}
            className={`w-full ${isCollapsed ? 'px-0 justify-center' : 'justify-start'}`}
          >
            {!isCollapsed && 'Settings'}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default RoleNavigation;