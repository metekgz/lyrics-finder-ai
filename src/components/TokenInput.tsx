import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToken } from '../context/TokenContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export const TokenInput = () => {
  const [inputToken, setInputToken] = useState('');
  const [error, setError] = useState('');
  const { setToken } = useToken();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputToken.trim()) {
      setError(t('token.error'));
      return;
    }
    setToken(inputToken.trim());
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
        <button type="submit" className="token-submit">
          {t('token.submit')}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}; 