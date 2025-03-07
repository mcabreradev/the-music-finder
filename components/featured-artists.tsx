"use client";

import { useQuery } from '@tanstack/react-query';
import { getFeaturedArtists } from '@/lib/api';
import { ArtistCard } from '@/components/artist-card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function FeaturedArtists() {
  const { data: artists, isLoading, error } = useQuery({
    queryKey: ['featuredArtists'],
    queryFn: getFeaturedArtists,
  });


  if (isLoading) {
    return <FeaturedArtistsSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load featured artists. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Featured Artists</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {artists?.map((artist) => (
          <ArtistCard key={artist.idArtist} artist={artist} />
        ))}
      </div>
    </div>
  );
}

function FeaturedArtistsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square rounded-md" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
