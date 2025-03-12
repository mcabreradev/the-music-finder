import { Suspense, use } from 'react';
import { SearchResults } from '@/components/search-results';
import { SearchForm } from '@/components/search-form';
import { Skeleton } from '@/components/ui/skeleton';

type SearchParams = Promise<{ q: string | undefined }>

export function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = use(searchParams).q || '';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Search Results</h1>
          <p className="text-muted-foreground">
            Showing results for &quot;{query}&quot;
          </p>
        </div>

        <SearchForm initialQuery={query} />

        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults query={query} />
        </Suspense>
      </div>
    </div>
  );
}

function SearchResultsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="flex space-x-4">
            <Skeleton className="h-16 w-16 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
