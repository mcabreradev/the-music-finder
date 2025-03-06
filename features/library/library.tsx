import { Music2, Heart } from 'lucide-react';

export function LibraryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Your Library</h1>
          <p className="text-muted-foreground">
            Keep track of your favorite artists and albums
          </p>
        </div>

        <div className="grid gap-6">
          {/* Liked Artists Section */}
          <div className="bg-card rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 rounded-full p-3">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Liked Artists</h2>
                <p className="text-sm text-muted-foreground">Artists you've followed</p>
              </div>
            </div>
            <div className="text-center py-8">
              <Music2 className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-lg font-medium">No liked artists yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Follow artists to see them here
              </p>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-card rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 rounded-full p-3">
                <Music2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Recent Activity</h2>
                <p className="text-sm text-muted-foreground">Your recently viewed artists and albums</p>
              </div>
            </div>
            <div className="text-center py-8">
              <Music2 className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-lg font-medium">No recent activity</p>
              <p className="text-sm text-muted-foreground mt-1">
                Browse artists to see your activity here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
