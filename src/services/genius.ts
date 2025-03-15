import { GeniusSearchResult } from '../types/genius';
import { fetchFromGenius } from './api';
import { generateSearchUrl } from '../utils/urlGenerators';
import { DEFAULT_IMAGE } from '../constants/images';

export async function searchSongs(query: string, token: string): Promise<GeniusSearchResult[]> {
  try {
    const data = await fetchFromGenius(query, token);
    
    return data.hits.map(({ result }) => {
      const thumbnail = result.header_image_thumbnail_url || DEFAULT_IMAGE;
      
      return {
        title: result.title,
        artist_names: result.artist_names,
        song_art_image_url: thumbnail,
        url: result.url,
        thumbnail,
        youtubeSearchUrl: generateSearchUrl('youtube', result.title, result.artist_names),
        spotifySearchUrl: generateSearchUrl('spotify', result.title, result.artist_names)
      };
    });
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
} 