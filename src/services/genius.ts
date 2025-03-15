import { GeniusSearchResult } from '../types/genius';
import { fetchFromGenius } from './api';
import { generateMusicServiceUrl } from '../utils/urlGenerators';

export async function searchSongs(query: string): Promise<GeniusSearchResult[]> {
  try {
    const data = await fetchFromGenius(query);
    
    return data.hits.map(({ result }) => ({
      title: result.title,
      artist: result.artist_names,
      lyrics_snippet: result.lyrics_snippet || "No lyrics preview available",
      url: result.url,
      thumbnail: result.header_image_thumbnail_url || 'https://place-hold.it/300x300',
      youtubeSearchUrl: generateMusicServiceUrl('youtube', result.title, result.artist_names),
      spotifySearchUrl: generateMusicServiceUrl('spotify', result.title, result.artist_names)
    }));
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
} 