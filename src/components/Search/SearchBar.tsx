interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => Promise<void>;
  isLoading: boolean;
}

export const SearchBar = ({ searchQuery, setSearchQuery, handleSearch, isLoading }: SearchBarProps) => {
  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await handleSearch();
    }
  };

  return (
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
  );
}; 