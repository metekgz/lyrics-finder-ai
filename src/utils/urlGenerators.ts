import { ApiUrls } from '../constants/urls';

export function generateMusicServiceUrl(
  service: 'youtube' | 'spotify',
  title: string,
  artist: string
): string {
  const searchQuery = `${title} ${artist}`;
  
  switch (service) {
    case 'youtube':
      return `${ApiUrls.YOUTUBE_SEARCH}?search_query=${encodeURIComponent(searchQuery)}`;
    case 'spotify':
      return `${ApiUrls.SPOTIFY_SEARCH}/${encodeURIComponent(searchQuery)}`;
    default:
      throw new Error('Unsupported music service');
  }
} 