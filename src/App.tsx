import { useState } from 'react'
import './App.css'
import { searchSongs, GeniusSearchResult } from './services/genius'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<GeniusSearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setIsLoading(true)
    setError(null)
    try {
      const searchResults = await searchSongs(searchQuery)
      setResults(searchResults)
    } catch (error) {
      setError('Search failed. Please try again.')
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="container">
      <h1>Lyrics Search</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter lyrics or song title..."
          className="search-input"
        />
        <button 
          onClick={handleSearch}
          disabled={isLoading}
          className="search-button"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="results-container">
          <h2>Search Results</h2>
          <div className="results-grid">
            {results.map((result, index) => (
              <div key={index} className="result-card">
                <img src={result.thumbnail} alt={result.title} className="song-thumbnail" />
                <div className="song-info">
                  <h3>{result.title}</h3>
                  <p className="artist">{result.artist}</p>
                  <p className="lyrics-snippet">{result.lyrics_snippet}</p>
                  <a href={result.url} target="_blank" rel="noopener noreferrer" className="view-button">
                    View Lyrics
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
