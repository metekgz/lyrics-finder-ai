import { useState } from 'react';
import { useToken } from '../context/TokenContext';

export function TokenInput() {
  const [inputToken, setInputToken] = useState('');
  const { setToken } = useToken();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputToken.trim()) {
      setToken(inputToken.trim());
    }
  };

  return (
    <div className="token-container">
      <h2>Enter Your RapidAPI Key</h2>
      <div className="token-instructions">
        <h3>How to get your RapidAPI Key:</h3>
        <ol>
          <li>
            Visit{' '}
            <a 
              href="https://rapidapi.com/Glavier/api/genius-song-lyrics1" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Genius Lyrics API on RapidAPI
            </a>
          </li>
          <li>Sign in or create a RapidAPI account if you don't have one</li>
          <li>Subscribe to the API (there's a free tier available)</li>
          <li>Once subscribed:
            <ul>
              <li>Click on "Endpoints" tab</li>
              <li>Look for the "X-RapidAPI-Key" in the code examples</li>
              <li>Copy your unique API key</li>
            </ul>
          </li>
          <li>Paste your <strong>RapidAPI Key</strong> in the input field below</li>
        </ol>
        <p className="token-note">
          Note: The free tier includes 100 requests per day which is sufficient for testing and personal use.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="token-form">
        <input
          type="text"
          value={inputToken}
          onChange={(e) => setInputToken(e.target.value)}
          placeholder="Paste your RapidAPI Key here"
          className="token-input"
          required
        />
        <button type="submit" className="token-submit">
          Save API Key
        </button>
      </form>
    </div>
  );
} 