import axios from 'axios';
import { Artist, Album } from '@/types';

// Create an axios instance with rate limiting
const api = axios.create({
  baseURL: 'https://theaudiodb.com/api/v1/json/2',
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
          api.get(`/search.php?s=${encodeURIComponent(query)}`)
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
          api.get(`/artist.php?i=${id}`)
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
          api.get(`/album.php?i=${artistId}`)
        );
        
        resolve(response.data.album || []);
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
    '111239', // Adele
    '111255', // Beyoncé
    '111301', // Coldplay
    '111992', // Ed Sheeran
    '112024', // Taylor Swift
    '111329', // Drake
    '111318', // Daft Punk
    '111247', // Ariana Grande
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