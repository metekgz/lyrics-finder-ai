import { useTranslation } from 'react-i18next';
import { SearchIcon } from '../icons/SearchIcon';
import { LoadingSpinner } from '../icons/LoadingSpinner';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  isLoading: boolean;
}

export const SearchBar = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  isLoading
}: SearchBarProps) => {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="search-section">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <SearchIcon />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="search-input"
            disabled={isLoading}
          />
        </div>
        <button 
          type="submit" 
          className="search-button" 
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner /> : t('search.button')}
        </button>
      </form>
    </div>
  );
}; 