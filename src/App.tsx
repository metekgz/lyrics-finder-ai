import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'
import { searchSongs } from './services/genius'
import { GeniusSearchResult } from './types/genius'
import { SearchBar } from './components/Search/SearchBar'
import { SongCard } from './components/Card/SongCard'
import { TokenInput } from './components/TokenInput'
import { useToken } from './context/TokenContext'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import './styles/layout.css'
import './styles/components.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<GeniusSearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { token, clearToken } = useToken()
  const { t } = useTranslation()

  const handleSearch = async () => {
    if (!searchQuery.trim() || !token) return;
    
    setIsLoading(true)
    setError(null)
    try {
      const searchResults = await searchSongs(searchQuery, token)
      setResults(searchResults)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError(t('search.error'))
      }
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return <TokenInput />;
  }

  return (
    <div className="container">
      <div className="buttons-container">
        <LanguageSwitcher />
        <button 
          onClick={clearToken}
          className="logout-button"
          title={t('app.changeApiKey')}
        >
          {t('app.changeApiKey')}
        </button>
      </div>
      <header className="app-header">
        <h1>{t('app.title')}</h1>
      </header>
      
      <SearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isLoading={isLoading}
      />

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="results-container">
          <h2>{t('search.results')}</h2>
          <div className="results-grid">
            {results.map((song, index) => (
              <SongCard key={index} song={song} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
