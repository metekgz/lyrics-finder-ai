import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToken } from '../context/TokenContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export const TokenInput = () => {
  const [inputToken, setInputToken] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const { setToken } = useToken();
  const { t } = useTranslation();

  const validateToken = async (token: string) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!inputToken.trim()) {
      setError(t('token.error'));
      return;
    }

    setIsValidating(true);
    try {
      const isValid = await validateToken(inputToken.trim());
      if (!isValid) {
        setError(t('token.invalid'));
        setIsValidating(false);
        return;
      }
      setToken(inputToken.trim());
    } catch (err) {
      setError(t('token.invalid'));
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="token-container">
      <div className="buttons-container">
        <LanguageSwitcher />
      </div>
      <h2>{t('token.title')}</h2>
      <div className="token-instructions">
        <h3>{t('token.instructions.title')}</h3>
        <ol>
          {Array.from({ length: 7 }, (_, index) => (
            <li key={index}>
              {index === 0 ? (
                <span>
                  <a 
                    href="https://rapidapi.com/Glavier/api/genius-song-lyrics1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {t(`token.instructions.steps.${index}`)}
                  </a>
                </span>
              ) : (
                t(`token.instructions.steps.${index}`)
              )}
            </li>
          ))}
        </ol>
        <p className="token-note">
          {t('token.instructions.note')}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="token-form">
        <input
          type="text"
          value={inputToken}
          onChange={(e) => setInputToken(e.target.value)}
          placeholder={t('token.placeholder')}
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