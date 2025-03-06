import Image from 'next/image';
import { Artist } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Heart, Share2 } from 'lucide-react';

interface ArtistHeaderProps {
  artist: Artist;
}

export function ArtistHeader({ artist }: ArtistHeaderProps) {
  const bannerUrl = artist.strArtistBanner || artist.strArtistThumb || 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1200&auto=format&fit=crop';
  
  return (
    <div className="relative">
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <Image
          src={bannerUrl}
          alt={artist.strArtist}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 relative -mt-24">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
          <div className="relative h-36 w-36 md:h-48 md:w-48 rounded-full overflow-hidden border-4 border-background shadow-lg">
            <Image
              src={artist.strArtistThumb || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop'}
              alt={artist.strArtist}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-5xl font-bold">{artist.strArtist}</h1>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {artist.strGenre && (
                  <Badge variant="secondary">{artist.strGenre}</Badge>
                )}
                {artist.strStyle && (
                  <Badge variant="secondary">{artist.strStyle}</Badge>
                )}
                {artist.strCountry && (
                  <Badge variant="secondary">{artist.strCountry}</Badge>
                )}
                {artist.intFormedYear && (
                  <Badge variant="secondary">Since {artist.intFormedYear}</Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button size="sm" variant="default">
              <Heart className="h-4 w-4 mr-2" />
              Follow
            </Button>
            <Button size="sm" variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            {artist.strWebsite && (
              <Button size="sm" variant="outline" asChild>
                <a href={`https://${artist.strWebsite.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
        
        {artist.strBiographyEN && (
          <div className="mt-8 max-w-3xl">
            <h2 className="text-xl font-semibold mb-2">Biography</h2>
            <p className="text-muted-foreground line-clamp-4">
              {artist.strBiographyEN}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
