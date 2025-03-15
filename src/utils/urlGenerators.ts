import { ApiUrls } from '../constants/urls';

export function generateMusicServiceUrl(
  service: 'youtube' | 'spotify' | 'google',
  title: string,
  artist: string
): string {
  const searchQuery = `${title} ${artist}`;
  
  switch (service) {
    case 'youtube':
      return `${ApiUrls.YOUTUBE_SEARCH}?search_query=${encodeURIComponent(searchQuery)}`;
    case 'spotify':
      return `${ApiUrls.SPOTIFY_SEARCH}/${encodeURIComponent(searchQuery)}`;
    case 'google':
      return `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    default:
      return '';
  }
} 