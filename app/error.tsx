"use client";

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { toast } = useToast();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    
    toast({
      variant: "destructive",
      title: "Something went wrong",
      description: error.message || "An unexpected error occurred",
    });
  }, [error, toast]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="space-y-6 max-w-md">
        <div className="mx-auto w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <p className="text-muted-foreground">
          {error.message || "An unexpected error occurred while processing your request. Please try again."}
        </p>
        <Button onClick={reset} className="inline-flex items-center gap-2">
          <RefreshCw size={16} />
          Try again
        </Button>
      </div>
    </div>
  );
}
