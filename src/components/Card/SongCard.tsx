import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { GeniusSearchResult } from '../../types/genius';
import { YouTubeIcon } from '../icons/YouTubeIcon';
import { SpotifyIcon } from '../icons/SpotifyIcon';
import { GoogleIcon } from '../icons/GoogleIcon';
import { generateSearchUrl } from '../../utils/urlGenerators';
import './SongCard.css';

interface SongCardProps {
  song: GeniusSearchResult & { youtubeVideoId?: string };
}

export const SongCard = ({ song }: SongCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { t } = useTranslation();
  const googleSearchUrl = generateSearchUrl('google', song.title, song.artist_names);

  const togglePlay = () => {
    if (!song.youtubeVideoId) return;
    
    if (!isPlaying) {
      // Start playing
      if (iframeRef.current) {
        iframeRef.current.src = `https://www.youtube.com/embed/${song.youtubeVideoId}?autoplay=1&controls=0`;
      }
    } else {
      // Stop playing
      if (iframeRef.current) {
        iframeRef.current.src = '';
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="song-card">
      <div className="song-image">
        <img src={song.song_art_image_url || song.thumbnail} alt={song.title} />
        {song.youtubeVideoId && (
          <button 
            className="audio-control"
            onClick={togglePlay}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
        )}
      </div>
      <div className="song-info">
        <h3 className="song-title">{song.title}</h3>
        <p className="song-artist">{t('song.by')} {song.artist_names}</p>
        <div className="music-buttons">
          <a 
            href={song.youtubeVideoId 
              ? `https://www.youtube.com/watch?v=${song.youtubeVideoId}`
              : song.youtubeSearchUrl
            } 
            target="_blank" 
            rel="noopener noreferrer" 
            className="icon-button youtube"
            title={song.youtubeVideoId ? t('song.play') : "Search on YouTube"}
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
      {song.youtubeVideoId && (
        <iframe
          ref={iframeRef}
          style={{ display: 'none' }}
          allow="autoplay"
          title="YouTube audio player"
        />
      )}
    </div>
  );
}; 