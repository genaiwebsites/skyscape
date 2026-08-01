import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Newsreader, Plus_Jakarta_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500'],
  variable: '--font-newsreader',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Skyscape | Kshitiz Bathwal · Aerial Landscape Photography',
  description:
    'Aerial landscape photography across India, flown between 30 and 299 metres above ground level by drone pilot Kshitiz Bathwal.',
  icons: {
    icon: [
      { url: '/skyscape-aerial-photography-favicon.png', type: 'image/png' },
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/skyscape-aerial-photography-favicon.png',
    apple: [{ url: '/apple-icon.png', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${ibmPlexMono.variable} ${newsreader.variable} ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Font preconnects */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        {/* Zodiak + Satoshi fallback */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=zodiak@400,401&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
