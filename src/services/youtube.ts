interface YouTubeSearchResponse {
  items: Array<{
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      thumbnails: {
        default: {
          url: string;
        };
      };
    };
  }>;
}

export async function searchYouTubeVideo(query: string, token: string): Promise<{ videoId: string; title: string; thumbnail: string } | null> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${token}&maxResults=1`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error('YouTube API request failed');
    }

    const data: YouTubeSearchResponse = await response.json();
    
    if (data.items && data.items.length > 0) {
      const video = data.items[0];
      return {
        videoId: video.id.videoId,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.default.url
      };
    }
    
    return null;
  } catch (error) {
    console.error('YouTube API Error:', error);
    throw error;
  }
}

export function validateYouTubeToken(token: string): Promise<boolean> {
  return searchYouTubeVideo('test', token)
    .then(() => true)
    .catch(() => false);
} 