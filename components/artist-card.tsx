"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Artist } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';

interface ArtistCardProps {
  artist: Artist;
}

export function ArtistCard({ artist }: ArtistCardProps) {
  const placeholderImage = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop";
  
  return (
    <Link href={`/artist/${artist.idArtist}`}>
      <Card className="overflow-hidden hover-card">
        <div className="aspect-square relative">
          {artist.strArtistThumb ? (
            <Image
              src={artist.strArtistThumb}
              alt={artist.strArtist}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <Image
                src={placeholderImage}
                alt={artist.strArtist}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover opacity-70"
              />
              <User className="h-12 w-12 absolute text-foreground/70" />
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg truncate">{artist.strArtist}</h3>
          <p className="text-sm text-muted-foreground">
            {artist.strGenre || 'Artist'}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
