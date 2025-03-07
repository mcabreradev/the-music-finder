"use client";

import { useQuery } from '@tanstack/react-query';
import { Music2, Heart } from 'lucide-react';
import { getArtistById } from '@/lib/api';
import { useLikedArtists } from '@/hooks/use-liked-artists';
import { ArtistCard } from '@/components/artist-card';
import { Skeleton } from '@/components/ui/skeleton';

export function LibraryPage() {
  const { likedArtistIds, isLoaded } = useLikedArtists();

  const { data: likedArtists, isLoading } = useQuery({
    queryKey: ['likedArtists', likedArtistIds],
    queryFn: async () => {
      if (!likedArtistIds.length) return [];
      return Promise.all(likedArtistIds.map(id => getArtistById(id)));
    },
    enabled: isLoaded && likedArtistIds.length > 0,
  });

  const showLoading = !isLoaded || isLoading;
  const showEmpty = isLoaded && !showLoading && (!likedArtists || likedArtists.length === 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Your Library</h1>
          <p className="text-muted-foreground">
            Keep track of your favorite artists and albums
          </p>
        </div>

        <div className="space-y-6">
          {/* Liked Artists Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-full p-3">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Liked Artists</h2>
                <p className="text-sm text-muted-foreground">
                  {likedArtists?.length || 0} artists you follow
                </p>
              </div>
            </div>

            {showLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array(4).fill(0).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-square rounded-md" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : showEmpty ? (
              <div className="text-center py-12">
                <Music2 className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-lg font-medium">No liked artists yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Follow artists to see them here
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {likedArtists?.map((artist) => (
                  <ArtistCard key={artist.idArtist} artist={artist} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
