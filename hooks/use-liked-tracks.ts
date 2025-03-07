"use client";

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'liked_tracks';

export function useLikedTracks() {
  const [likedTrackIds, setLikedTrackIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setLikedTrackIds(stored ? JSON.parse(stored) : []);
    setIsLoaded(true);
  }, []);

  const toggleLike = (trackId: string) => {
    setLikedTrackIds(prev => {
      const newIds = prev.includes(trackId)
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
      return newIds;
    });
  };

  const isLiked = (trackId: string) => likedTrackIds.includes(trackId);

  return {
    likedTrackIds,
    toggleLike,
    isLiked,
    isLoaded
  };
}
