import { useQuery } from '@tanstack/react-query';
import { getAlbumsByArtistId } from '@/lib/api';
import { AlbumCard } from '@/components/album-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Disc } from 'lucide-react';

interface AlbumListProps {
  artistId: string;
}

export function AlbumList({ artistId }: AlbumListProps) {

  const { data: albums, isLoading, error } = useQuery({
    queryKey: ['albums', artistId],
    queryFn: () => getAlbumsByArtistId(artistId),
  });

  if ( isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading albums...</p>
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
          {error instanceof Error ? error.message : 'An error occurred while loading albums. Please try again.'}
        </AlertDescription>
      </Alert>
    );
  }

  if (!albums || albums.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-muted rounded-full p-4 mb-4">
          <Disc className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No albums found</h3>
        <p className="text-muted-foreground mt-1">
          We couldn't find any albums for this artist
        </p>
      </div>
    );
  }

  return (
    <div className="album-grid">
      {albums.map((album) => (
        <AlbumCard key={album.idAlbum} album={album} />
      ))}
    </div>
  );
}
