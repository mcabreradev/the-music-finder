import { useState, useEffect } from 'react';
import { Artist } from '@/types';

const STORAGE_KEY = 'liked_artists';

export function useLikedArtists() {
  const [likedArtistIds, setLikedArtistIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setLikedArtistIds(stored ? JSON.parse(stored) : []);
    setIsLoaded(true);
  }, []);

  const toggleLike = (artistId: string) => {
    setLikedArtistIds(prev => {
      const newIds = prev.includes(artistId)
        ? prev.filter(id => id !== artistId)
        : [...prev, artistId];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
      return newIds;
    });
  };

  const isLiked = (artistId: string) => likedArtistIds.includes(artistId);

  return {
    likedArtistIds,
    toggleLike,
    isLiked,
    isLoaded
  };
}
