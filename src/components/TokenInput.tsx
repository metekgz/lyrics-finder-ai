import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToken } from '../context/TokenContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { validateYouTubeToken } from '../services/youtube';

interface TokenFormProps {
  title: string;
  placeholder: string;
  onSubmit: (token: string) => Promise<boolean>;
  onSuccess: (token: string) => void;
  instructions: {
    title: string;
    steps: string[];
    note: string;
    link?: {
      text: string;
      url: string;
    };
  };
}

const TokenForm = ({ title, placeholder, onSubmit, onSuccess, instructions }: TokenFormProps) => {
  const [inputToken, setInputToken] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!inputToken.trim()) {
      setError(t('token.error'));
      return;
    }

    setIsValidating(true);
    try {
      const isValid = await onSubmit(inputToken.trim());
      if (!isValid) {
        setError(t('token.invalid'));
        return;
      }
      onSuccess(inputToken.trim());
      setInputToken('');
    } catch (err) {
      setError(t('token.invalid'));
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="token-form-container">
      <h2>{title}</h2>
      <div className="token-instructions">
        <h3>{instructions.title}</h3>
        <ol>
          {instructions.steps.map((step, index) => (
            <li key={index}>
              {instructions.link && index === 0 ? (
                <a 
                  href={instructions.link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {instructions.link.text}
                </a>
              ) : step}
            </li>
          ))}
        </ol>
        <p className="token-note">{instructions.note}</p>
      </div>
      <form onSubmit={handleSubmit} className="token-form">
        <input
          type="text"
          value={inputToken}
          onChange={(e) => setInputToken(e.target.value)}
          placeholder={placeholder}
          className="token-input"
          required
        />
        <button 
          type="submit" 
          className="token-submit"
          disabled={isValidating}
        >
          {isValidating ? t('token.validating') : t('token.submit')}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export const TokenInput = () => {
  const { t } = useTranslation();
  const { geniusToken, youtubeToken, setGeniusToken, setYoutubeToken } = useToken();

  const validateGeniusToken = async (token: string) => {
    try {
      const response = await fetch('https://genius-song-lyrics1.p.rapidapi.com/search?q=test&per_page=1', {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': token,
          'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error('Invalid token');
      }

      const data = await response.json();
      return data.hits !== undefined;
    } catch (err) {
      return false;
    }
  };

  if (!geniusToken) {
    return (
      <div className="token-container">
        <div className="buttons-container">
          <LanguageSwitcher />
        </div>
        <TokenForm
          title={t('token.genius.title')}
          placeholder={t('token.genius.placeholder')}
          onSubmit={validateGeniusToken}
          onSuccess={setGeniusToken}
          instructions={{
            title: t('token.genius.instructions.title'),
            steps: Array.from({ length: 7 }, (_, i) => t(`token.genius.instructions.steps.${i}`)),
            note: t('token.genius.instructions.note'),
            link: {
              text: t('token.genius.instructions.steps.0'),
              url: 'https://rapidapi.com/Glavier/api/genius-song-lyrics1'
            }
          }}
        />
      </div>
    );
  }

  if (!youtubeToken) {
    return (
      <div className="token-container">
        <div className="buttons-container">
          <LanguageSwitcher />
        </div>
        <TokenForm
          title={t('token.youtube.title')}
          placeholder={t('token.youtube.placeholder')}
          onSubmit={validateYouTubeToken}
          onSuccess={setYoutubeToken}
          instructions={{
            title: t('token.youtube.instructions.title'),
            steps: Array.from({ length: 5 }, (_, i) => t(`token.youtube.instructions.steps.${i}`)),
            note: t('token.youtube.instructions.note'),
            link: {
              text: t('token.youtube.instructions.steps.0'),
              url: 'https://console.cloud.google.com/apis/credentials'
            }
          }}
        />
      </div>
    );
  }

  return null;
}; 