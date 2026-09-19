'use client';
import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function AmbientSoundtrack() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const userManuallyMuted = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;

    // Keep UI state synchronized with real browser audio engine state
    const handlePlay = () => {
      if (!audio.muted) {
        setIsPlaying(true);
      }
    };
    const handlePause = () => {
      setIsPlaying(false);
    };
    const handleVolumeChange = () => {
      setIsPlaying(!audio.paused && !audio.muted);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('volumechange', handleVolumeChange);

    // Global gesture listener to unlock/play audio by default across all browsers
    const handleFirstGesture = (e: Event) => {
      // Don't intercept clicks that happen directly on the audio button itself
      const target = e.target as HTMLElement | null;
      if (target && target.closest('#audioBtn')) {
        return;
      }

      if (userManuallyMuted.current || !audioRef.current) return;
      const a = audioRef.current;
      a.muted = false;
      a.volume = 0.35;
      if (a.paused) {
        a.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        setIsPlaying(true);
      }
      cleanupGestureListeners();
    };

    const events = ['click', 'touchstart', 'touchend', 'pointerdown', 'mousedown', 'keydown', 'wheel', 'scroll'];
    const cleanupGestureListeners = () => {
      events.forEach((ev) => {
        window.removeEventListener(ev, handleFirstGesture);
        document.removeEventListener(ev, handleFirstGesture);
      });
    };

    // 1. Attempt immediate unmuted playback
    audio.muted = false;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        // 2. If browser requires initial interaction, prepare background play and listen for first gesture
        audio.muted = true;
        audio
          .play()
          .then(() => {
            // Audio engine running, will unmute on first gesture
            setIsPlaying(true);
          })
          .catch(() => {});

        events.forEach((ev) => {
          window.addEventListener(ev, handleFirstGesture, { passive: true });
          document.addEventListener(ev, handleFirstGesture, { passive: true });
        });
      });

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('volumechange', handleVolumeChange);
      cleanupGestureListeners();
    };
  }, []);

  const toggleSound = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    // Directly inspect actual audio hardware state: is it playing sound?
    const isCurrentlyAudible = !audio.paused && !audio.muted;

    if (isCurrentlyAudible) {
      // User explicitly wants to mute
      userManuallyMuted.current = true;
      audio.pause();
      audio.muted = true;
      setIsPlaying(false);
      trackEvent('audio_toggled', { action: 'mute' });
    } else {
      // User explicitly wants to unmute and play
      userManuallyMuted.current = false;
      audio.muted = false;
      audio.volume = 0.35;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          trackEvent('audio_toggled', { action: 'play' });
        })
        .catch((err) => {
          console.warn('[skyscape] audio playback failed:', err);
          setIsPlaying(false);
        });
    }
  };

  return (
    <div className="audio-ctrl">
      <button
        className={`audio-btn ${isPlaying ? 'playing' : 'muted'}`}
        id="audioBtn"
        type="button"
        onClick={toggleSound}
        aria-label="Toggle ambient soundtrack"
        title="Skyscape Aerial Photography Ambient Soundtrack"
      >
        <span className="audio-eq" aria-hidden="true">
          <i className="eq-bar b1" />
          <i className="eq-bar b2" />
          <i className="eq-bar b3" />
          <i className="eq-bar b4" />
        </span>
        <svg
          className="audio-icon-muted"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
        <span className="audio-label">{isPlaying ? 'AUDIO' : 'MUTED'}</span>
      </button>

      <audio
        ref={audioRef}
        id="bgAudio"
        src="/audio/skyscape-aerial-photography-ambient-soundtrack.mp3"
        loop
        autoPlay
        preload="auto"
        playsInline
      />
    </div>
  );
}
