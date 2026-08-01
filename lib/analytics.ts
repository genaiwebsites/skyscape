import { track } from '@vercel/analytics';

/**
 * Strongly-typed Skyscape Photography Analytics Events
 */
export type AnalyticsEventMap = {
  // Gallery / Lightbox interactions
  image_viewed: {
    title: string;
    location: string;
    altitude: number;
    index: number;
  };
  gallery_scrolled: {
    index: number;
    title: string;
  };

  // Audio / Ambience controller
  audio_toggled: {
    action: 'play' | 'mute';
  };

  // Navigation
  navigation_clicked: {
    section: string;
    placement: 'desktop_nav' | 'mobile_nav' | 'footer' | 'hero_cue';
  };

  // Conversions & Outbound Contacts
  contact_initiated: {
    channel: 'email' | 'instagram';
    placement: 'hero' | 'about' | 'contact_section' | 'footer' | 'mobile_menu' | 'desktop_nav' | 'mobile_nav';
  };

  // Flight Descent scrollytelling
  descent_step_viewed: {
    altitude: number;
    band: string;
    headline: string;
  };

  // Preloader / Telemetry
  preloader_completed: {
    duration_ms?: number;
  };
};

/**
 * Safe Vercel Analytics event dispatcher with dev logging & error boundary.
 */
export function trackEvent<K extends keyof AnalyticsEventMap>(
  eventName: K,
  properties?: AnalyticsEventMap[K]
): void {
  if (typeof window === 'undefined') return;

  try {
    // Dispatch event to Vercel Analytics
    track(eventName, properties as Record<string, string | number | boolean | null>);

    // In development mode, log formatted event for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `%c[Vercel Analytics]%c ${String(eventName)}`,
        'color: #0070f3; font-weight: bold;',
        'color: #10b981; font-weight: 600;',
        properties || {}
      );
    }
  } catch (error) {
    // Prevent tracking errors from breaking user UI
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Vercel Analytics Error]', error);
    }
  }
}
