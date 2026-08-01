'use client';
import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function TacticalOpticsConsole() {
  const [mode, setMode] = useState<number>(0); // 0: RGB, 1: FLIR, 2: NEGATIVE

  const changeOptics = (newMode: number, modeName: string) => {
    setMode(newMode);
    trackEvent('optics_mode_changed', { mode: modeName });
    window.dispatchEvent(
      new CustomEvent('skyscape:optics', { detail: { mode: newMode } })
    );
  };

  return (
    <div className="optics-hud-wrap" title="Tactical Viewfinder Optics Mode">
      <div className="optics-hud-label">OPTICS</div>
      <div className="optics-hud-btn-group">
        <button
          type="button"
          className={`optics-btn ${mode === 0 ? 'active rgb' : ''}`}
          onClick={() => changeOptics(0, 'RGB')}
          title="RGB Standard 4K Color"
        >
          RGB
        </button>
        <button
          type="button"
          className={`optics-btn ${mode === 1 ? 'active flir' : ''}`}
          onClick={() => changeOptics(1, 'FLIR')}
          title="FLIR Thermal Infrared Heatmap"
        >
          <span className="flir-dot" /> FLIR
        </button>
        <button
          type="button"
          className={`optics-btn ${mode === 2 ? 'active negative' : ''}`}
          onClick={() => changeOptics(2, 'NEGATIVE')}
          title="B&W Inverse Infrared Reconnaissance"
        >
          NEG IR
        </button>
      </div>
    </div>
  );
}
