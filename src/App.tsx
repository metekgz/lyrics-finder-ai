import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'
import { searchSongs } from './services/genius'
import { searchYouTubeVideo } from './services/youtube'
import { GeniusSearchResult } from './types/genius'
import { SearchBar } from './components/Search/SearchBar'
import { SongCard } from './components/Card/SongCard'
import { TokenInput } from './components/TokenInput'
import { useToken } from './context/TokenContext'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import './styles/layout.css'
import './styles/components.css'

interface SongResult extends GeniusSearchResult {
  youtubeVideoId?: string;
}

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<SongResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const { geniusToken, youtubeToken, clearGeniusToken, clearYoutubeToken } = useToken()
  const { t } = useTranslation()

  const handleSearch = async () => {
    if (!searchQuery.trim() || !geniusToken) return;
    
    setIsLoading(true)
    setError(null)
    setHasSearched(true)
    try {
      const searchResults = await searchSongs(searchQuery, geniusToken)
      
      // If YouTube token is available, fetch video IDs for each song
      if (youtubeToken) {
        const resultsWithYoutube = await Promise.all(
          searchResults.map(async (song) => {
            try {
              const videoInfo = await searchYouTubeVideo(`${song.title} ${song.artist_names}`, youtubeToken)
              return {
                ...song,
                youtubeVideoId: videoInfo?.videoId
              }
            } catch (error) {
              console.error('YouTube search error:', error)
              return song
            }
          })
        )
        setResults(resultsWithYoutube)
      } else {
        setResults(searchResults)
      }
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

  if (!geniusToken || !youtubeToken) {
    return <TokenInput />;
  }

  return (
    <div className="container">
      <div className="buttons-container">
        <LanguageSwitcher />
        <div className="api-buttons">
          <button 
            onClick={clearGeniusToken}
            className="api-button"
            title={t('token.genius.title')}
          >
            Change Genius API
          </button>
          <button 
            onClick={clearYoutubeToken}
            className="api-button"
            title={t('token.youtube.title')}
          >
            Change YouTube API
          </button>
        </div>
      </div>
      
      <header className="app-header">
        <h1>{t('app.title')}</h1>
      </header>

      <main>
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
          <section className="results-section">
            <div className="results-header">
              <h2>{t('search.results')}</h2>
              <span className="results-count">
                {t('search.resultCount', { count: results.length })}
              </span>
            </div>
            <div className="results-grid">
              {results.map((song, index) => (
                <SongCard key={song.url || index} song={song} />
              ))}
            </div>
          </section>
        )}

        {!isLoading && hasSearched && results.length === 0 && !error && (
          <div className="no-results">
            <p>{t('search.noResults')}</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
