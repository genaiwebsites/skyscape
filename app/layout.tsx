import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Newsreader, Plus_Jakarta_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.skyscapephoto.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Skyscape Photography | Kshitiz Bathwal · Aerial Landscape Photography',
    template: '%s | Skyscape Photography',
  },
  description:
    'Aerial landscape photography across India, flown between 30 and 299 metres above ground level by drone pilot Kshitiz Bathwal.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Skyscape Photography',
    title: 'Skyscape Photography | Kshitiz Bathwal · Aerial Landscape Photography',
    description:
      'Aerial landscape photography across India, flown between 30 and 299 metres above ground level by drone pilot Kshitiz Bathwal.',
    images: [
      {
        url: `${siteUrl}/og/og_homepage.jpg`,
        secureUrl: `${siteUrl}/og/og_homepage.jpg`,
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Skyscape Photography | Aerial Landscape Photography by Kshitiz Bathwal',
      },
      {
        url: `${siteUrl}/og/square/sq_homepage.jpg`,
        secureUrl: `${siteUrl}/og/square/sq_homepage.jpg`,
        width: 800,
        height: 800,
        type: 'image/jpeg',
        alt: 'Skyscape Photography Monogram Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skyscape Photography | Kshitiz Bathwal · Aerial Landscape Photography',
    description:
      'Aerial landscape photography across India by drone pilot Kshitiz Bathwal.',
    images: [
      {
        url: `${siteUrl}/og/og_homepage.jpg`,
        secureUrl: `${siteUrl}/og/og_homepage.jpg`,
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Skyscape Photography | Aerial Landscape Photography by Kshitiz Bathwal',
      },
      {
        url: `${siteUrl}/og/square/sq_homepage.jpg`,
        secureUrl: `${siteUrl}/og/square/sq_homepage.jpg`,
        width: 800,
        height: 800,
        type: 'image/jpeg',
        alt: 'Skyscape Photography Monogram Logo',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        <SpeedInsights />
      </body>
    </html>
  );
}
