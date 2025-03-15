# Lyrics Finder AI

A modern web application to search for songs, view lyrics, and listen to song previews using the Genius API and YouTube Data API.

## Technologies Used

- React
- TypeScript
- Vite
- RapidAPI (Genius Lyrics API)
- YouTube Data API v3
- TailwindCSS

## Features

- Search for songs and lyrics
- View song details and album art
- Listen to song previews directly in the app
- Direct links to YouTube, Spotify, and Google searches
- Modern and responsive UI with beautiful animations
- Secure token management through UI
- Multi-language support (English and Turkish)
- Play/pause audio controls
- Modular and maintainable code structure

## Setup

1. Clone the repository:
```bash
git clone [your-repo-url]
cd lyrics-finder-ai
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Required API Keys

### RapidAPI Key (for Genius Lyrics)
1. Visit [Genius Song Lyrics API on RapidAPI](https://rapidapi.com/Glavier/api/genius-song-lyrics1)
2. Sign up/Login to RapidAPI
3. Subscribe to the API (free tier available)
4. Go to the "Endpoints" tab
5. Copy your RapidAPI Key from the code snippets

### YouTube Data API Key
1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the YouTube Data API v3
4. Go to Credentials and create an API key
5. Copy your YouTube API key

After starting the application, you can enter both your RapidAPI key and YouTube API key in the token input screen. The application will securely manage your tokens during your session.

## Features in Detail

### Song Search
- Search for songs using the Genius API
- Get detailed song information including artist, title, and album art
- Results are displayed in a beautiful card layout

### Audio Preview
- Listen to song previews directly in the application
- Play/pause controls integrated into each song card
- Audio playback using YouTube's embedded player
- Seamless audio control with visual feedback

### External Links
- Quick access to full songs on YouTube
- Search links for Spotify
- Google search integration for more information