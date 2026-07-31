'use client';
import { useEffect, useRef, useState } from 'react';

export default function AmbientSoundtrack() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;

    // Optional autoplay attempt on page load
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        // Autoplay blocked by browser policy; stay in clean MUTED state
        setIsPlaying(false);
      });
  }, []);

  const toggleSound = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Clean Mute
      audio.pause();
      audio.muted = true;
      setIsPlaying(false);
    } else {
      // Clean Play / Unmute
      audio.muted = false;
      audio.volume = 0.35;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
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
        preload="auto"
        playsInline
      />
    </div>
  );
}
