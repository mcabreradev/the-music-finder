"use client";

import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useLikedTracks } from '@/hooks/use-liked-tracks';
import { cn } from '@/lib/utils';

interface TrackLikeButtonProps {
  trackId: string;
  className?: string;
  variant?: "default" | "ghost" | "outline";
}

export function TrackLikeButton({ trackId, className, variant = "ghost" }: TrackLikeButtonProps) {
  const { isLiked, toggleLike, isLoaded } = useLikedTracks();

  if (!isLoaded) return null;

  const liked = isLiked(trackId);

  return (
    <Button
      size="icon"
      variant={variant}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        toggleLike(trackId);
      }}
    >
      <Heart className={cn(
        "h-4 w-4",
        liked && "fill-current text-primary"
      )} />
      <span className="sr-only">
        {liked ? 'Remove from liked songs' : 'Add to liked songs'}
      </span>
    </Button>
  );
}
