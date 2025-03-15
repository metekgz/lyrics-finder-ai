import { API_CONFIG } from '../constants/api';
import { ApiUrls } from '../constants/urls';

interface ApiResponse {
  hits: Array<{
    result: {
      title: string;
      artist_names: string;
      lyrics_snippet: string;
      url: string;
      header_image_thumbnail_url: string;
    }
  }>;
}

export async function fetchFromGenius(query: string, token: string): Promise<ApiResponse> {
  const response = await fetch(
    `${ApiUrls.GENIUS_SEARCH}?q=${encodeURIComponent(query)}&per_page=${API_CONFIG.GENIUS.PER_PAGE}&page=1`,
    {
      method: "GET",
      headers: {
        'X-RapidAPI-Key': token,
        'X-RapidAPI-Host': API_CONFIG.GENIUS.HOST
      }
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid API token');
    }
    throw new Error('API request failed');
  }

  return response.json();
} 