import { GeniusSearchResult } from '../../types/genius';
import { YouTubeIcon } from '../icons/YouTubeIcon';
import { SpotifyIcon } from '../icons/SpotifyIcon';

interface SongCardProps {
  song: GeniusSearchResult;
}

export const SongCard = ({ song }: SongCardProps) => {
  return (
    <div className="result-card">
      <img src={song.thumbnail} alt={song.title} className="song-thumbnail" />
      <div className="song-info">
        <h3>{song.title}</h3>
        <p className="artist">{song.artist}</p>
        <p className="lyrics-snippet">{song.lyrics_snippet}</p>
        <div className="music-buttons">
          <a 
            href={song.youtubeSearchUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="youtube-button"
            title="Search on YouTube"
          >
            <YouTubeIcon />
          </a>
          <a 
            href={song.spotifySearchUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="spotify-button"
            title="Search on Spotify"
          >
            <SpotifyIcon />
          </a>
        </div>
      </div>
    </div>
  );
}; 