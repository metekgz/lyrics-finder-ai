import { useState } from 'react'
import './App.css'
import { searchSongs } from './services/genius'
import { GeniusSearchResult } from './types/genius'
import { SearchBar } from './components/Search/SearchBar'
import { SongCard } from './components/Card/SongCard'
import { TokenInput } from './components/TokenInput'
import { useToken } from './context/TokenContext'
import './styles/layout.css'
import './styles/components.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<GeniusSearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { token } = useToken();

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
        setError('Search failed. Please try again.')
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
      <h1>Lyrics Search</h1>
      
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
          <h2>Search Results</h2>
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
