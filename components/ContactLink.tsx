'use client';

import { trackEvent } from '@/lib/analytics';

export function ContactEmailLink() {
  return (
    <a
      className="mail"
      data-magnet
      data-anim="soft"
      href="mailto:kshitiz@skyscapephotography.in"
      onClick={() =>
        trackEvent('contact_initiated', {
          channel: 'email',
          placement: 'contact_section',
        })
      }
    >
      <span>kshitiz@skyscapephotography.in</span>
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" aria-hidden="true">
        <path d="M7 17L17 7M17 7H8M17 7v9" />
      </svg>
    </a>
  );
}

export function ContactInstagramLink() {
  return (
    <a
      href="https://www.instagram.com/skyscape_photography/"
      target="_blank"
      rel="noopener noreferrer"
      className="c-insta-link"
      onClick={() =>
        trackEvent('contact_initiated', {
          channel: 'instagram',
          placement: 'contact_section',
        })
      }
    >
      @skyscape_photography ↗
    </a>
  );
}
