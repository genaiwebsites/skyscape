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
        {/* Preload critical LCP Hero Photograph */}
        <link
          rel="preload"
          as="image"
          href="/images/hero/mauritius-coastal-drone-photography-skyscape.jpg"
          fetchPriority="high"
        />
        {/* Font preconnects */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        {/* Zodiak + Satoshi fallback */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=zodiak@400,401&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Structured Data Schema for Knowledge Graph, AI Citations & Licensable Badges */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  '@id': 'https://www.skyscapephoto.com/#website',
                  url: 'https://www.skyscapephoto.com',
                  name: 'Skyscape Photography',
                  description:
                    'Fine art aerial landscape photography across India, flown between 30 and 299 metres above ground level by drone pilot Kshitiz Bathwal.',
                  publisher: {
                    '@id': 'https://www.skyscapephoto.com/#person',
                  },
                },
                {
                  '@type': 'Person',
                  '@id': 'https://www.skyscapephoto.com/#person',
                  name: 'Kshitiz Bathwal',
                  jobTitle: ['Aerial Landscape Photographer', 'Licensed Drone Pilot', 'Software Engineer'],
                  url: 'https://www.skyscapephoto.com',
                  image: 'https://www.skyscapephoto.com/images/skyscape-drone-pilot-profile.jpg',
                  sameAs: ['https://www.instagram.com/skyscape_photography/'],
                  description:
                    'Aerial landscape photographer and licensed UAS pilot capturing unseen natural topographies across 14+ Indian states and global coastal frontiers.',
                },
                {
                  '@type': 'ProfessionalService',
                  '@id': 'https://www.skyscapephoto.com/#service',
                  name: 'Skyscape Photography',
                  url: 'https://www.skyscapephoto.com',
                  logo: 'https://www.skyscapephoto.com/skyscape-aerial-photography-logo-white.png',
                  image: 'https://www.skyscapephoto.com/og/og_homepage.jpg',
                  priceRange: '$$',
                  founder: {
                    '@id': 'https://www.skyscapephoto.com/#person',
                  },
                  areaServed: {
                    '@type': 'Country',
                    name: 'India',
                  },
                  serviceType: [
                    'Aerial Landscape Photography',
                    'Fine Art Drone Prints',
                    'Commercial Drone Cinematography',
                    'Visual Land & Topography Surveys',
                  ],
                },
                {
                  '@type': 'ImageGallery',
                  name: 'Skyscape Photography Portfolio — Descent from 299m AGL',
                  description:
                    'Telemetric aerial landscape portfolio curated by elevation above ground level (AGL).',
                  author: {
                    '@id': 'https://www.skyscapephoto.com/#person',
                  },
                  hasPart: [
                    {
                      '@type': 'Photograph',
                      name: 'Where Volcanic Ridge Meets Sapphire Lagoon (Macondé Peak)',
                      caption: 'Macondé Peak hairpin ridge and turquoise lagoon in Mauritius from 168m AGL',
                      contentUrl: 'https://www.skyscapephoto.com/images/hero/mauritius-coastal-drone-photography-skyscape.jpg',
                      creator: { '@id': 'https://www.skyscapephoto.com/#person' },
                      copyrightHolder: { '@id': 'https://www.skyscapephoto.com/#person' },
                      copyrightNotice: '© 2026 Kshitiz Bathwal · All rights reserved',
                      license: 'https://www.skyscapephoto.com/#contact',
                      acquireLicensePage: 'https://www.skyscapephoto.com/#contact',
                    },
                    {
                      '@type': 'Photograph',
                      name: 'Volcanic Sea Stacks & Azure Surf of Nusa Penida',
                      caption: 'Volcanic sea stacks and azure ocean surf in Nusa Penida, Bali from 198m AGL',
                      contentUrl: 'https://www.skyscapephoto.com/images/nusa-penida-featured.jpeg',
                      creator: { '@id': 'https://www.skyscapephoto.com/#person' },
                      copyrightHolder: { '@id': 'https://www.skyscapephoto.com/#person' },
                      copyrightNotice: '© 2026 Kshitiz Bathwal · All rights reserved',
                      license: 'https://www.skyscapephoto.com/#contact',
                      acquireLicensePage: 'https://www.skyscapephoto.com/#contact',
                    },
                  ],
                },
                {
                  '@type': 'FAQPage',
                  mainEntity: [
                    {
                      '@type': 'Question',
                      name: 'What altitude range does Skyscape Photography operate at?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Skyscape Photography captures aerial landscapes between 30 and 299 metres above ground level (AGL), adhering strictly to aviation regulations and DGCA airspace laws.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Are fine art prints available for purchase?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Yes, museum-grade fine art archival prints are available in custom dimensions on premium cotton rag paper. Inquiries can be placed via the contact section.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Are commercial and editorial licensing available?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Yes, high-resolution imagery and 4K D-Log aerial video assets are available for commercial advertising, editorial features, tourism campaigns, and architectural showcases.',
                      },
                    },
                  ],
                },
              ],
            }),
          }}
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
