import { createContext, useContext, useState, ReactNode } from 'react';

interface TokenContextType {
  geniusToken: string | null;
  youtubeToken: string | null;
  setGeniusToken: (token: string) => void;
  setYoutubeToken: (token: string) => void;
  clearGeniusToken: () => void;
  clearYoutubeToken: () => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export function TokenProvider({ children }: { children: ReactNode }) {
  const [geniusToken, setGeniusTokenState] = useState<string | null>(() => {
    // Check localStorage for existing token
    return localStorage.getItem('genius_api_token');
  });

  const [youtubeToken, setYoutubeTokenState] = useState<string | null>(() => {
    return localStorage.getItem('youtube_api_token');
  });

  const setGeniusToken = (newToken: string) => {
    localStorage.setItem('genius_api_token', newToken);
    setGeniusTokenState(newToken);
  };

  const setYoutubeToken = (newToken: string) => {
    localStorage.setItem('youtube_api_token', newToken);
    setYoutubeTokenState(newToken);
  };

  const clearGeniusToken = () => {
    localStorage.removeItem('genius_api_token');
    setGeniusTokenState(null);
  };

  const clearYoutubeToken = () => {
    localStorage.removeItem('youtube_api_token');
    setYoutubeTokenState(null);
  };

  return (
    <TokenContext.Provider value={{ 
      geniusToken, 
      youtubeToken, 
      setGeniusToken, 
      setYoutubeToken, 
      clearGeniusToken,
      clearYoutubeToken 
    }}>
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