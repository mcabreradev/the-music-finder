"use client";

import { useQuery } from '@tanstack/react-query';
import { Music2, Heart, Disc } from 'lucide-react';
import { getArtistById } from '@/lib/api';
import { useLikedArtists } from '@/hooks/use-liked-artists';
import { useLikedTracks } from '@/hooks/use-liked-tracks';
import { ArtistCard } from '@/components/artist-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function LibraryPage() {
  const { likedArtistIds, isLoaded: artistsLoaded } = useLikedArtists();
  const { likedTrackIds, isLoaded: tracksLoaded } = useLikedTracks();

  const { data: likedArtists, isLoading: artistsLoading } = useQuery({
    queryKey: ['likedArtists', likedArtistIds],
    queryFn: async () => {
      if (!likedArtistIds.length) return [];
      return Promise.all(likedArtistIds.map(id => getArtistById(id)));
    },
    enabled: artistsLoaded && likedArtistIds.length > 0,
  });

  const showArtistsLoading = !artistsLoaded || artistsLoading;
  const showArtistsEmpty = artistsLoaded && !showArtistsLoading && (!likedArtists || likedArtists.length === 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Your Library</h1>
          <p className="text-muted-foreground">
            Keep track of your favorite artists and songs
          </p>
        </div>

        <Tabs defaultValue="artists">
          <TabsList>
            <TabsTrigger value="artists">Artists</TabsTrigger>
            <TabsTrigger value="songs">Liked Songs</TabsTrigger>
          </TabsList>

          <TabsContent value="artists" className="space-y-6">
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

            {showArtistsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array(4).fill(0).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-square rounded-md" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : showArtistsEmpty ? (
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
          </TabsContent>

          <TabsContent value="songs" className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-full p-3">
                <Disc className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Liked Songs</h2>
                <p className="text-sm text-muted-foreground">
                  {likedTrackIds.length} songs you love
                </p>
              </div>
            </div>

            {!tracksLoaded ? (
              <div className="space-y-4">
                {Array(4).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                ))}
              </div>
            ) : likedTrackIds.length === 0 ? (
              <div className="text-center py-12">
                <Disc className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-lg font-medium">No liked songs yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Like songs to see them here
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <Disc className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-lg font-medium">Coming Soon</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Liked songs feature is under development
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
