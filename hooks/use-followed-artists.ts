import { useState, useEffect } from 'react';

const STORAGE_KEY = 'followed_artists';

export function useFollowedArtists() {
  const [followedArtistIds, setFollowedArtistIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setFollowedArtistIds(stored ? JSON.parse(stored) : []);
    setIsLoaded(true);
  }, []);

  const toggleFollow = (artistId: string) => {
    setFollowedArtistIds(prev => {
      const newIds = prev.includes(artistId)
        ? prev.filter(id => id !== artistId)
        : [...prev, artistId];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
      return newIds;
    });
  };

  const isFollowed = (artistId: string) => followedArtistIds.includes(artistId);

  return {
    followedArtistIds,
    toggleFollow,
    isFollowed,
    isLoaded
  };
}
