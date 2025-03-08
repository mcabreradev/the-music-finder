"use client";

import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useFollowedArtists } from '@/hooks/use-followed-artists';
import { cn } from '@/lib/utils';

interface LikeButtonProps {
  artistId: string;
  className?: string;
}

export function FollowButton({ artistId, className }: LikeButtonProps) {
  const { isFollowed, toggleFollow, isLoaded } = useFollowedArtists();

  if (!isLoaded) return null;

  const liked = isFollowed(artistId);

  return (
    <Button
      size="sm"
      variant={liked ? "default" : "outline"}
      className={cn("gap-2", className)}
      onClick={() => toggleFollow(artistId)}
    >
      <Heart className={cn(
        "h-4 w-4",
        liked && "fill-current"
      )} />
      {liked ? 'Following' : 'Follow'}
    </Button>
  );
}
