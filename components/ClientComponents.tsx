'use client';
import dynamic from 'next/dynamic';

export const SkyscapeEngine = dynamic(() => import('./SkyscapeEngine'), {
  ssr: false,
});

export const AmbientSoundtrack = dynamic(() => import('./AmbientSoundtrack'), {
  ssr: false,
});

export const HeaderNav = dynamic(() => import('./HeaderNav'), {
  ssr: false,
});
