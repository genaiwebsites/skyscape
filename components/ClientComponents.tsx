'use client';
import dynamic from 'next/dynamic';

export const SkyscapeEngine = dynamic(() => import('./SkyscapeEngine'), {
  ssr: false,
});
