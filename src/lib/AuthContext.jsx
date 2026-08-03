import React, { createContext, useContext } from 'react';

// Simplified replacement for base44's AuthContext.
//
// The original version called base44's private hosted backend to check
// login state (base44.auth.me(), appParams.appId/token, etc.), which only
// works inside the base44 platform. Since Viitalon is a public storefront
// with no login wall, this version simply reports "nothing is loading,
// no errors, not logged in" immediately, so the app renders right away
// with no dependency on base44's servers.
//
// If you ever add real user accounts later, this is the file to expand.

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const value = {
    user: null,
    isAuthenticated: false,
    isLoadingAuth: false,
    isLoadingPublicSettings: false,
    authError: null,
    appPublicSettings: null,
    authChecked: true,
    logout: () => {},
    navigateToLogin: () => {},
    checkUserAuth: () => {},
    checkAppState: () => {},
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
