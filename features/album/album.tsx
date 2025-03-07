'use client'

import { Suspense, use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAlbumById } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, Disc, Music2 } from 'lucide-react';

  type Params = Promise<{ id: string }>

  export function AlbumPage({ params }: { params: Params }) {

  const albumId = use(params).id

  const { data: album, isLoading, error } = useQuery({
    queryKey: ['album', albumId],
    queryFn: () => getAlbumById(albumId),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading album...</p>
        </div>
      </div>
    );
  }

  if (!album || error) {
    notFound();
  }

  // Format track duration from seconds to mm:ss
  function formatDuration(milliseconds: string | undefined) {
    const totalSeconds = Math.floor((milliseconds ? parseInt(milliseconds) : 0) / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return formattedHours ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}` : `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <Suspense fallback={<AlbumSkeleton />}>
      <div className="min-h-screen pb-8">
        {/* Album Header */}
        <div className="relative">
          <div className="relative h-64 md:h-80 w-full overflow-hidden">
            <Image
              src={album.strAlbumThumb || 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1200&auto=format&fit=crop'}
              alt={album.strAlbum}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </div>

          <div className="container mx-auto px-4 relative -mt-24">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
              <div className="relative h-36 w-36 md:h-48 md:w-48 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={album.strAlbumThumb || 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=300&auto=format&fit=crop'}
                  alt={album.strAlbum}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-2">
                <p className="text-sm font-medium">Album</p>
                <h1 className="text-3xl md:text-5xl font-bold">{album.strAlbum}</h1>

                <div className="flex items-center gap-2 text-sm">
                  <Link href={`/artist/${album.idArtist}`} className="font-medium hover:underline">
                    {album.strArtist}
                  </Link>
                  {album.intYearReleased && (
                    <>
                      <span>•</span>
                      <span>{album.intYearReleased}</span>
                    </>
                  )}
                  {album.tracks && (
                    <>
                      <span>•</span>
                      <span>{album.tracks.length} songs</span>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {album.strGenre && (
                    <Badge variant="secondary">{album.strGenre}</Badge>
                  )}
                  {album.strStyle && (
                    <Badge variant="secondary">{album.strStyle}</Badge>
                  )}
                  {album.strLabel && (
                    <Badge variant="secondary">{album.strLabel}</Badge>
                  )}
                </div>
              </div>
            </div>

            {album.strDescriptionEN && (
              <div className="mt-8 max-w-3xl">
                <p className="text-muted-foreground">
                  {album.strDescriptionEN}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Track List */}
        <div className="container mx-auto px-4 mt-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Tracks</h2>

            {album.tracks && album.tracks.length > 0 ? (
              <div className="space-y-2">
                {album.tracks.map((track, index) => (
                  <div
                    key={track.idTrack}
                    className="flex items-center gap-4 p-3 rounded-md hover:bg-card group"
                  >
                    <div className="w-6 text-center text-sm text-muted-foreground group-hover:hidden">
                      {track.intTrackNumber || index + 1}
                    </div>
                    <Music2 className="w-6 h-6 hidden group-hover:block text-primary" />

                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{track.strTrack}</p>
                      {track.strDescriptionEN && (
                        <p className="text-sm text-muted-foreground truncate">
                          {track.strDescriptionEN}
                        </p>
                      )}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      {formatDuration(track.intDuration)}
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-muted rounded-full p-4 mb-4">
                  <Disc className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No tracks available</h3>
                <p className="text-muted-foreground mt-1">
                  Track information is not available for this album
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
}

function AlbumSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="space-y-2">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-3">
            <Skeleton className="h-6 w-6" />
            <div className="flex-1">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-32 mt-1" />
            </div>
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
      </div>
    </div>
  );
}
