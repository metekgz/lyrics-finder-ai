import { createContext, useContext, useState, ReactNode } from 'react';

interface TokenContextType {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export function TokenProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() => {
    // Check localStorage for existing token
    return localStorage.getItem('genius_api_token');
  });

  const setToken = (newToken: string) => {
    localStorage.setItem('genius_api_token', newToken);
    setTokenState(newToken);
  };

  const clearToken = () => {
    localStorage.removeItem('genius_api_token');
    setTokenState(null);
  };

  return (
    <TokenContext.Provider value={{ token, setToken, clearToken }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
} 