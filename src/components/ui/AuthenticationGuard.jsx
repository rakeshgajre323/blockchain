import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthenticationGuard = ({ 
  children, 
  requiredRole = null, 
  fallbackPath = '/landing-page',
  loadingComponent = null 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Protected routes configuration
  const protectedRoutes = {
    '/issuer-authentication': ['issuer'],
    '/certificate-management': ['issuer', 'admin'],
    '/learner-wallet': ['learner'],
    '/verifier-portal': ['verifier', 'public'], // Public access allowed
    '/verification-results': ['verifier'],
    '/settings': ['issuer', 'learner', 'verifier', 'admin'],
    '/admin': ['admin']
  };

  // Public routes that don't require authentication
  const publicRoutes = [
    '/landing-page',
    '/verifier-portal', // Public verification access
    '/help',
    '/about'
  ];

  useEffect(() => {
    checkAuthentication();
  }, [location?.pathname]);

  const checkAuthentication = async () => {
    try {
      // Simulate authentication check
      const token = localStorage.getItem('authToken');
      const storedRole = localStorage.getItem('userRole');
      
      if (token && storedRole) {
        // Validate token (in real app, make API call)
        const isValidToken = await validateToken(token);
        
        if (isValidToken) {
          setIsAuthenticated(true);
          setUserRole(storedRole);
        } else {
          // Token expired or invalid
          clearAuthData();
        }
      }
      
      // Check if current route requires authentication
      const currentPath = location?.pathname;
      const isPublicRoute = publicRoutes?.some(route => 
        currentPath === route || currentPath?.startsWith(route + '/')
      );
      
      if (!isPublicRoute) {
        const requiredRoles = protectedRoutes?.[currentPath];
        
        if (requiredRoles && !isAuthenticated) {
          // Redirect to authentication based on route
          if (currentPath?.startsWith('/issuer')) {
            navigate('/issuer-authentication', { 
              state: { from: currentPath },
              replace: true 
            });
          } else {
            navigate(fallbackPath, { replace: true });
          }
          return;
        }
        
        if (requiredRoles && isAuthenticated && !requiredRoles?.includes(storedRole)) {
          // User doesn't have required role
          navigate('/unauthorized', { replace: true });
          return;
        }
      }
      
    } catch (error) {
      console.error('Authentication check failed:', error);
      clearAuthData();
    } finally {
      setIsLoading(false);
    }
  };

  const validateToken = async (token) => {
    // Simulate token validation
    return new Promise((resolve) => {
      setTimeout(() => {
        // In real app, make API call to validate token
        resolve(token && token.length > 0);
      }, 100);
    });
  };

  const clearAuthData = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  // Show loading component while checking authentication
  if (isLoading) {
    if (loadingComponent) {
      return loadingComponent;
    }
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin">
            <Icon name="Loader2" size={32} className="text-primary" />
          </div>
          <div className="text-sm text-muted-foreground">
            Verifying credentials...
          </div>
        </div>
      </div>
    );
  }

  // Check role-based access for protected routes
  const currentPath = location?.pathname;
  const requiredRoles = protectedRoutes?.[currentPath];
  
  if (requiredRoles && requiredRole && !requiredRoles?.includes(requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 p-8">
          <Icon name="ShieldX" size={48} className="text-destructive mx-auto" />
          <h2 className="text-2xl font-semibold text-foreground">Access Denied</h2>
          <p className="text-muted-foreground max-w-md">
            You don't have permission to access this area. Please contact your administrator if you believe this is an error.
          </p>
          <button
            onClick={() => navigate(fallbackPath)}
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-smooth"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Render children if authentication passes
  return children;
};

// Higher-order component for protecting routes
export const withAuthGuard = (Component, requiredRole = null) => {
  return function AuthGuardedComponent(props) {
    return (
      <AuthenticationGuard requiredRole={requiredRole}>
        <Component {...props} />
      </AuthenticationGuard>
    );
  };
};

// Hook for accessing authentication state
export const useAuth = () => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userRole: null,
    isLoading: true
  });

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const role = localStorage.getItem('userRole');
      
      setAuthState({
        isAuthenticated: !!token,
        userRole: role,
        isLoading: false
      });
    };

    checkAuth();
    
    // Listen for storage changes (logout from another tab)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const login = (token, role) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', role);
    setAuthState({
      isAuthenticated: true,
      userRole: role,
      isLoading: false
    });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    setAuthState({
      isAuthenticated: false,
      userRole: null,
      isLoading: false
    });
  };

  return {
    ...authState,
    login,
    logout
  };
};

export default AuthenticationGuard;