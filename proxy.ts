import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Legitimate search engines & social link preview bots that need access for SEO & rich previews
const ALLOWED_BOT_PATTERN =
  /(googlebot|bingbot|yandex|duckduckbot|slurp|baiduspider|applebot|twitterbot|facebookexternalhit|linkedinbot|whatsapp|slackbot|telegrambot|discordbot|pinterest)/i;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect portfolio image assets in /images/
  if (pathname.startsWith('/images/')) {
    const userAgent = request.headers.get('user-agent') || '';

    // 1. Allow verified search engine & social media crawlers for 100% SEO preservation
    if (ALLOWED_BOT_PATTERN.test(userAgent)) {
      return NextResponse.next();
    }

    const referer = request.headers.get('referer');
    const host = request.headers.get('host') || '';
    const secFetchDest = request.headers.get('sec-fetch-dest');
    const secFetchSite = request.headers.get('sec-fetch-site');

    // 2. Direct Address Bar Navigation / "Open in New Tab"
    // When a user pastes the direct image URL in the browser address bar or opens it as a standalone document
    if (secFetchDest === 'document' || request.headers.get('sec-fetch-mode') === 'navigate') {
      // Redirect direct URL visits to the official portfolio homepage instead of serving raw file
      return NextResponse.redirect(new URL('/', request.url));
    }

    // 3. Legitimate on-site image loading
    // Same-origin request: referer matches the current host or sec-fetch-site is same-origin
    const isSameOrigin =
      secFetchSite === 'same-origin' ||
      secFetchSite === 'same-site' ||
      (referer && referer.includes(host));

    if (isSameOrigin) {
      return NextResponse.next();
    }

    // 4. External Hotlinking Prevention
    // An external website is trying to embed your images directly
    if (referer && !referer.includes(host)) {
      return new NextResponse('Access to photo assets is protected. Hotlinking is prohibited.', {
        status: 403,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }

    // 5. Requests with no referer and not from a browser image tag (e.g. automated scrapers / curl)
    if (!referer && secFetchDest !== 'image') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/images/:path*'],
};
