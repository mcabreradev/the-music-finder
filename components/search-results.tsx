"use client";

import { useQuery } from '@tanstack/react-query';
import { searchArtists } from '@/lib/api';
import { ArtistCard } from '@/components/artist-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Music } from 'lucide-react';

interface SearchResultsProps {
  query: string;
}

export function SearchResults({ query }: SearchResultsProps) {

  const { data: artists, isLoading, error } = useQuery({
    queryKey: ['artists', query],
    queryFn: () => searchArtists(query)
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Searching...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : 'An error occurred while searching. Please try again.'}
        </AlertDescription>
      </Alert>
    );
  }

  if (!artists || artists.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-muted rounded-full p-4 mb-4">
          <Music className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No artists found</h3>
        <p className="text-muted-foreground mt-1">
          We couldn&apos;t find any artists matching &quot;{query}&quot;
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Artists</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artists.map((artist) => (
          <ArtistCard key={artist.idArtist} artist={artist} />
        ))}
      </div>
    </div>
  );
}
