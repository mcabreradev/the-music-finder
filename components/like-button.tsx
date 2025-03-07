"use client";

import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useLikedArtists } from '@/hooks/use-liked-artists';
import { cn } from '@/lib/utils';

interface LikeButtonProps {
  artistId: string;
  className?: string;
}

export function LikeButton({ artistId, className }: LikeButtonProps) {
  const { isLiked, toggleLike, isLoaded } = useLikedArtists();

  if (!isLoaded) return null;

  const liked = isLiked(artistId);

  return (
    <Button
      size="sm"
      variant={liked ? "default" : "outline"}
      className={cn("gap-2", className)}
      onClick={() => toggleLike(artistId)}
    >
      <Heart className={cn(
        "h-4 w-4",
        liked && "fill-current"
      )} />
      {liked ? 'Following' : 'Follow'}
    </Button>
  );
}
