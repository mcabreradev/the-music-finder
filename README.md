# MusicFinder

A modern web application for discovering and exploring music artists and their albums. Built with Next.js 15, TypeScript, and Tailwind CSS.

![MusicFinder Screenshot](https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop)

## Features

- 🎵 Search for artists and explore their discography
- 💿 Detailed album views with track listings
- 🎨 Beautiful, responsive UI inspired by modern music platforms
- 🌗 Light/Dark mode support
- 🚀 Fast and optimized performance
- ♿ Accessible design
- 📱 Mobile-friendly interface
- ❤️ Follow artists and like songs with local storage persistence
- 📚 Personal library with followed artists and liked songs
- 🎼 Track details including duration and music video links

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query)
- **API**: [TheAudioDB](https://www.theaudiodb.com/)
- **Testing**: Jest & React Testing Library
- **Documentation**: Storybook

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mcabreradev/music-finder.git
   cd music-finder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                   # Next.js 15 app directory
│   ├── album/             # Album-related pages
│   ├── artist/            # Artist-related pages
│   ├── search/            # Search functionality
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   └── ...                # Feature-specific components
├── features/              # List of Features
│   ├── album/             # Album-related pages
│   ├── artist/            # Artist-related pages
│   ├── search/            # Search functionality
│   └── layout.tsx         # Root layout
├── lib/                  # Utility functions and API
├── types/                # TypeScript type definitions
├── hooks/                # Custom React hooks
├── stories/              # Storybook stories
└── __tests__/           # Test files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook

## API Integration

The application uses TheAudioDB API to fetch music data. Key features include:

### Artist Endpoints

```typescript
// Search for artists
const artists = await searchArtists("query");

// Get artist details
const artist = await getArtistById("artistId");

// Get artist albums
const albums = await getAlbumsByArtistId("artistId");
```

### Album Endpoints

```typescript
// Get album with tracks
const album = await getAlbumById("albumId");

// Get track details
const track = await getTrackById("trackId");
```

Rate limiting is implemented to ensure API stability:
- Maximum 2 requests per second
- Queue system for managing requests
- Error handling for rate limits and failed requests

## Components

### Core Components

- `SearchForm`: Artist search functionality
- `ArtistCard`: Display artist information
- `AlbumCard`: Display album information
- `AlbumList`: Grid of albums
- `ArtistHeader`: Artist page header
- `Sidebar`: Navigation sidebar

### UI Components

Built using shadcn/ui, including:
- Buttons
- Cards
- Input fields
- Badges
- Skeletons for loading states
- Toast notifications

## Local Storage

The application uses local storage to persist user preferences:

```typescript
// Follow/Unfollow artists
const { followedArtistIds, toggleFollow } = useFollowedArtists();

// Like/Unlike songs
const { likedTrackIds, toggleLike } = useLikedTracks();
```

## Testing

Tests are written using Jest and React Testing Library. Key test files:

- `__tests__/components/search-form.test.tsx`
- `__tests__/components/album-list.test.tsx`
- `__tests__/lib/api.test.ts`

Run tests with:
```bash
npm test
```

## Storybook

Component documentation and development environment available through Storybook:

```bash
npm run storybook
```

Key stories:
- `stories/album-card.stories.tsx`
- `stories/artist-card.stories.tsx`
- `stories/search-form.stories.tsx`

## Performance Optimization

- Image optimization with Next.js Image component
- Client-side data caching with TanStack Query
- Lazy loading of components
- Optimized fonts with next/font
- Responsive images with appropriate sizes

## Accessibility

- ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly
- Focus management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write tests for new features
- Update documentation as needed
- Ensure accessibility standards are maintained
- Test across different browsers and devices

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [TheAudioDB](https://www.theaudiodb.com/) for providing the API
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Unsplash](https://unsplash.com/) for placeholder images
- [Lucide Icons](https://lucide.dev/) for the icon set
