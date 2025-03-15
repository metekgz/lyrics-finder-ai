const RAPID_API_URL = "https://genius-song-lyrics1.p.rapidapi.com/search";

export interface GeniusSearchResult {
  title: string;
  artist: string;
  lyrics_snippet: string;
  url: string;
  thumbnail: string;
  youtubeSearchUrl: string;
}

function generateYoutubeSearchUrl(title: string, artist: string): string {
  const searchQuery = `${title} ${artist}`.replace(/[^\w\s]/gi, '');
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
}

export async function searchSongs(query: string): Promise<GeniusSearchResult[]> {
  try {
    const response = await fetch(`${RAPID_API_URL}?q=${encodeURIComponent(query)}&per_page=10&page=1`, {
      method: "GET",
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    
    return data.hits.map((hit: any) => ({
      title: hit.result.title,
      artist: hit.result.artist_names,
      lyrics_snippet: hit.result.lyrics_snippet || "No lyrics preview available",
      url: hit.result.url,
      thumbnail: hit.result.header_image_thumbnail_url || 'https://place-hold.it/300x300',
      youtubeSearchUrl: generateYoutubeSearchUrl(hit.result.title, hit.result.artist_names)
    }));
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
} 