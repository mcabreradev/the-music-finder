'use client'

import { Suspense, use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { ArtistHeader } from '@/components/artist-header';
import { AlbumList } from '@/components/album-list';
import { Skeleton } from '@/components/ui/skeleton';

import { getArtistById } from '@/lib/api';

type Params = Promise<{ id: string }>

export function ArtistPage({ params }: { params: Params }) {

  const artistId = use(params).id

  const { data: artist, isLoading, error } = useQuery({
    queryKey: ['artist', artistId],
    queryFn: () => getArtistById(artistId),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading artist...</p>
        </div>
      </div>
    );
  }

  if (error || !artist) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-8">
      <ArtistHeader artist={artist} />

      <div className="container mx-auto px-4 mt-8">
        <h2 className="text-2xl font-bold mb-6">Albums</h2>

        <Suspense fallback={<AlbumListSkeleton />}>
          <AlbumList artistId={artistId} />
        </Suspense>
      </div>
    </div>
  );
}

function AlbumListSkeleton() {
  return (
    <div className="album-grid">
      {Array(8).fill(0).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-square rounded-md" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
