'use client';
import { useEffect, useRef, useState } from 'react';

export default function AmbientSoundtrack() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const userMutedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;
    audio.muted = false;

    // Direct playback attempt
    const attemptPlay = () => {
      if (userMutedRef.current) return;
      audio.muted = false;
      audio.volume = 0.35;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // If browser restricts un-clicked autoplay, keep audio ready and unlock on gesture
          setIsPlaying(false);
        });
    };

    attemptPlay();

    // Auto-unlock on first pointer / mouse / scroll interaction
    const unlockGesture = () => {
      if (userMutedRef.current || !audio) return;
      if (audio.paused || audio.muted) {
        audio.muted = false;
        audio.volume = 0.35;
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    };

    const events = ['pointerdown', 'mousemove', 'touchstart', 'scroll', 'keydown'];
    events.forEach((evt) => window.addEventListener(evt, unlockGesture, { passive: true }));

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, unlockGesture));
    };
  }, []);

  const toggleSound = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused && !audio.muted) {
      // User requested mute
      userMutedRef.current = true;
      audio.pause();
      audio.muted = true;
      setIsPlaying(false);
    } else {
      // User requested unmute / play
      userMutedRef.current = false;
      audio.muted = false;
      audio.volume = 0.35;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
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
        autoPlay
        loop
        preload="auto"
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => {
          if (userMutedRef.current) setIsPlaying(false);
        }}
      />
    </div>
  );
}
