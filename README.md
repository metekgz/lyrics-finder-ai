# Lyrics Finder AI

A modern web application to search for song lyrics using the Genius API through RapidAPI.

## Technologies Used

- React
- TypeScript
- Vite
- RapidAPI (Genius Lyrics API)

## Features

- Search for songs and lyrics
- View song details and album art
- Direct links to YouTube, Spotify, and Google searches
- Modern and responsive UI
- Secure API key management

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

3. Create a `.env` file in the root directory:
```bash
VITE_RAPID_API_KEY=your_api_key_here
```

4. Get your RapidAPI Key:
- Visit Genius
- Sign up/Login to RapidAPI
- Subscribe to the API (free tier available)
- Copy your API key from the "Endpoints" section

5. Start the development server:
```bash
npm run dev
```