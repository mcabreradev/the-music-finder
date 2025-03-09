import axios from 'axios';
import { Artist, Album, Track } from '@/types';

// Create an axios instance with rate limiting
const api = axios.create({
  baseURL: '/api',
});

// Simple rate limiting - max 2 requests per second
const queue: (() => void)[] = [];
let processing = false;

const processQueue = () => {
  if (queue.length === 0) {
    processing = false;
    return;
  }

  processing = true;
  const request = queue.shift();
  request?.();

  setTimeout(() => {
    processQueue();
  }, 500); // 500ms delay between requests (2 per second)
};

const enqueueRequest = (request: () => void) => {
  queue.push(request);

  if (!processing) {
    processQueue();
  }
};

// Error handling wrapper
const handleApiRequest = async <T>(request: Promise<T>): Promise<T> => {
  try {
    return await request;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('The requested resource was not found');
      }

      if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }

      throw new Error(error.response?.data?.message || 'An error occurred with the API');
    }

    throw error;
  }
};

// Search for artists by name
export const searchArtists = async (query: string): Promise<Artist[]> => {
  return new Promise((resolve, reject) => {
    enqueueRequest(async () => {
      try {
        const response = await handleApiRequest(
          // api.get(`/search?s=${encodeURIComponent(query)}`)
          // the endpoint only work with this hardcoded coldplay query
          api.get(`/search?s=coldplay`)
        );

        resolve(response.data.artists || []);
      } catch (error) {
        reject(error);
      }
    });
  });
};

// Get artist by ID
export const getArtistById = async (id: string): Promise<Artist> => {
  return new Promise((resolve, reject) => {
    enqueueRequest(async () => {
      try {
        const response = await handleApiRequest(
          api.get(`/artist?i=${id}`)
        );

        if (!response.data.artists || response.data.artists.length === 0) {
          reject(new Error('Artist not found'));
          return;
        }

        resolve(response.data.artists[0]);
      } catch (error) {
        reject(error);
      }
    });
  });
};

// Get albums by artist ID
export const getAlbumsByArtistId = async (artistId: string): Promise<Album[]> => {
  return new Promise((resolve, reject) => {
    enqueueRequest(async () => {
      try {
        const response = await handleApiRequest(
          api.get(`/albums?i=${artistId}`)
        );

        // sort albums by year intYearReleased
        const albums = response.data.album.sort((a: Album, b: Album) => {
          return parseInt(b.intYearReleased) - parseInt(a.intYearReleased);
        });
        resolve(albums || []);
      } catch (error) {
        reject(error);
      }
    });
  });
};

// Get album by ID with tracks
export const getAlbumById = async (albumId: string): Promise<Album> => {
  return new Promise((resolve, reject) => {
    enqueueRequest(async () => {
      try {
        const [albumResponse, tracksResponse] = await Promise.all([
          handleApiRequest(api.get(`/album?m=${albumId}`)),
          handleApiRequest(api.get(`/tracks?m=${albumId}`)),
        ]);

        if (!albumResponse.data.album || albumResponse.data.album.length === 0) {
          reject(new Error('Album not found'));
          return;
        }

        const album = albumResponse.data.album[0];
        album.tracks = tracksResponse.data.track || [];

        resolve(album);
      } catch (error) {
        reject(error);
      }
    });
  });
};

// Get track by ID
export const getTrackById = async (trackId: string): Promise<Track> => {
  return new Promise((resolve, reject) => {
    enqueueRequest(async () => {
      try {
        const response = await handleApiRequest(
          api.get(`/track?h=${trackId}`)
        );

        if (!response.data.track || response.data.track.length === 0) {
          reject(new Error('Track not found'));
          return;
        }

        resolve(response.data.track[0]);
      } catch (error) {
        reject(error);
      }
    });
  });
};

// Get featured artists (random selection from a predefined list)
export const getFeaturedArtists = async (): Promise<Artist[]> => {
  // List of popular artist IDs
  const popularArtistIds = [
   '111233', // Foo Fighters
   '111239', // Coldplay
   '111236', // Lady Gaga
   '111238', // Queen
   '111247', // The Beatles
   '111248', // Elvis Presley
   '111259', // Pink Floyd
   '111273', // BackStreet Boys
   '111255', // Madonna
   '111268', // Aerosmith
   '111279', // Metallica
   '111283', // Guns N' Roses
  ];

  // Randomly select 4 artists
  const selectedIds = [...popularArtistIds]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  const artists = await Promise.all(
    selectedIds.map(id => getArtistById(id))
  );

  return artists;
};
