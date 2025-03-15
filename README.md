# Lyrics Finder AI

A modern React application that uses artificial intelligence to help users find songs by searching through lyrics or song titles. Powered by RapidAPI's Genius API and built with React + TypeScript.

## Features

- AI-powered lyrics search
- Real-time search results
- Lyrics previews with smart matching
- Song cover art display
- Modern and user-friendly interface

## Technologies

- React 18
- TypeScript
- Vite
- RapidAPI (Genius API)
- AI-powered search algorithms

## Installation

1. Clone the repository:
```bash
git clone https://github.com/[your-username]/lyrics-finder-ai.git
cd lyrics-finder-ai
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment file:
```bash
cp .env.example .env
```

4. Get your RapidAPI key:
   - Sign up at [RapidAPI](https://rapidapi.com/auth/sign-up) (free)
   - Go to [Genius API page](https://rapidapi.com/Glavier/api/genius-song-lyrics1/)
   - Click "Subscribe to Test"
   - Select the "Basic" (free) plan
   - Replace the `VITE_RAPID_API_KEY` value in your `.env` file with your API key

5. Start the development server:
```bash
npm run dev
```