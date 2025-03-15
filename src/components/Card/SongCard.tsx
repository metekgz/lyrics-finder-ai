import { GeniusSearchResult } from '../../types/genius';
import { YouTubeIcon } from '../icons/YouTubeIcon';
import { SpotifyIcon } from '../icons/SpotifyIcon';
import { GoogleIcon } from '../icons/GoogleIcon';

interface SongCardProps {
  song: GeniusSearchResult;
}

export const SongCard = ({ song }: SongCardProps) => {
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(`${song.title} ${song.artist_names}`)}`;

  return (
    <div className="result-card">
      <img src={song.song_art_image_url} alt={song.title} className="song-thumbnail" />
      <div className="song-info">
        <h3>{song.title}</h3>
        <p className="artist">{song.artist_names}</p>
        {song.lyrics_snippet && (
          <p className="lyrics-snippet">{song.lyrics_snippet}</p>
        )}
        <div className="music-buttons">
          <a 
            href={song.youtubeSearchUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="icon-button youtube"
            title="Search on YouTube"
          >
            <YouTubeIcon />
          </a>
          <a 
            href={song.spotifySearchUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="icon-button spotify"
            title="Search on Spotify"
          >
            <SpotifyIcon />
          </a>
          <a
            href={googleSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-button google"
            title="Search on Google"
          >
            <GoogleIcon />
          </a>
        </div>
      </div>
    </div>
  );
}; 