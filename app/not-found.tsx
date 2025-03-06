"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HomeIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="space-y-6 max-w-md">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground">
          We couldn't find the page you were looking for. The artist or album might not exist, or there might be an error with our system.
        </p>
        <Button asChild>
          <Link href="/" className="inline-flex items-center gap-2">
            <HomeIcon size={16} />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}