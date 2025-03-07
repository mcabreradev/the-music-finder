import './globals.css';

import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { QueryProvider } from '@/lib/query-provider';
import { Sidebar } from '@/components/sidebar';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  // variable: '--font-be-vietnam',
});

export const metadata: Metadata = {
  title: 'MusicFinder - Search for your favorite artists',
  description: 'Find artists and explore their albums with MusicFinder',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${beVietnamPro.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 overflow-auto">
                {children}
              </main>
            </div>
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
