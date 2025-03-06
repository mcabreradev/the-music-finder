"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  Home,
  Search,
  Library,
  Music2,
  Heart,
  ListMusic,
  PlusCircle
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();

  const routes = [
    {
      label: 'Home',
      icon: Home,
      href: '/',
      active: pathname === '/',
    },
    {
      label: 'Search',
      icon: Search,
      href: '/search',
      active: pathname === '/search' || pathname.startsWith('/search?'),
    },
    {
      label: 'Your Library',
      icon: Library,
      href: '/library',
      active: pathname === '/library',
    },
  ];

  const playlists = [
    { name: 'Liked Songs', icon: Heart },
    { name: 'Your Episodes', icon: Music2 },
    { name: 'Rock Classics', icon: ListMusic },
    { name: 'Pop Mix', icon: ListMusic },
    { name: 'Discover Weekly', icon: ListMusic },
  ];

  return (
    <div className="hidden md:flex flex-col h-screen w-64 bg-card border-r">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <Music2 className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">MusicFinder</span>
        </Link>

        <nav className="space-y-1 mb-8">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={route.active ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                route.active && "bg-accent/50"
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="py-4">
          <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground uppercase font-semibold">
            <span>Your Playlists</span>
            <PlusCircle className="h-4 w-4" />
          </div>

          <div className="space-y-1">
            {playlists.map((playlist, i) => (
              <Button
                key={i}
                variant="ghost"
                className="w-full justify-start"
                asChild
              >
                <Link href="#">
                  <playlist.icon className="mr-2 h-4 w-4" />
                  {playlist.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto p-6">
        <ThemeToggle />
      </div>
    </div>
  );
}
