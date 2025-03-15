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
- Secure token management through UI
- Multi-language support (English and Turkish)

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

## Getting Your RapidAPI Key

1. Visit [Genius Song Lyrics API on RapidAPI](https://rapidapi.com/Glavier/api/genius-song-lyrics1)
2. Sign up/Login to RapidAPI
3. Subscribe to the API (free tier available)
4. Go to the "Endpoints" tab
5. Copy your RapidAPI Key from the code snippets

After starting the application, you can enter your RapidAPI key in the token input screen. The application will securely manage your token during your session.

## Security

- This application manages API tokens through the user interface
- No API keys are stored in the source code
- Tokens are validated before being saved
- Tokens are stored locally in the user's browser
- Never commit your personal API keys to version control

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.