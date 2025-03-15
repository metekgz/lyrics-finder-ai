type ServiceType = 'youtube' | 'spotify' | 'google';

export function generateSearchUrl(service: ServiceType, title: string, artist: string): string {
  const query = encodeURIComponent(`${title} ${artist}`);
  
  switch (service) {
    case 'youtube':
      return `https://www.youtube.com/results?search_query=${query}`;
    case 'spotify':
      return `https://open.spotify.com/search/${query}`;
    case 'google':
      return `https://www.google.com/search?q=${query}`;
    default:
      throw new Error(`Unsupported service: ${service}`);
  }
} 