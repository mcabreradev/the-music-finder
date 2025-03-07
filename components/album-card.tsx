"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Album } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Disc } from 'lucide-react';

interface AlbumCardProps {
  album: Album;
}

export function AlbumCard({ album }: AlbumCardProps) {
  const placeholderImage = "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=300&auto=format&fit=crop";

  return (
    <Link href={`/album/${album.idAlbum}`}>
      <Card className="overflow-hidden hover-card">
        <div className="aspect-square relative">
          {album.strAlbumThumb ? (
            <Image
              src={album.strAlbumThumb}
              alt={album.strAlbum}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <Image
                src={placeholderImage}
                alt={album.strAlbum}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover opacity-70"
              />
              <Disc className="h-12 w-12 absolute text-foreground/70" />
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg truncate">{album.strAlbum}</h3>
          <p className="text-sm text-muted-foreground">
            {album.intYearReleased || 'Unknown year'}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
