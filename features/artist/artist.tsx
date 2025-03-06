import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ArtistHeader } from '@/components/artist-header';
import { AlbumList } from '@/components/album-list';
import { Skeleton } from '@/components/ui/skeleton';
import { getArtistById } from '@/lib/api';

export async function ArtistPage({
  params,
}: {
  params: { id: string };
}) {
  const artistId = params.id;

  try {
    const artist = await getArtistById(artistId);

    if (!artist) {
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
  } catch (error) {
    notFound();
  }
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
