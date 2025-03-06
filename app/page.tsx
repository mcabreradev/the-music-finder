import { SearchForm } from '@/components/search-form';
import { FeaturedArtists } from '@/components/featured-artists';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Find Your Favorite Artists</h1>
          <p className="text-muted-foreground">
            Search for artists and explore their discography
          </p>
        </div>

        <SearchForm />

        <FeaturedArtists />
      </div>
    </div>
  );
}
