import React, { useState } from 'react';
import { toggleMute, getMuteState, playSoftTap } from '../utils/sound';

export default function SoundToggle() {
  const [muted, setMuted] = useState(getMuteState());

  const handleToggle = () => {
    const next = toggleMute();
    setMuted(next);
    if (!next) {
      playSoftTap();
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="sound-toggle-btn"
      title={muted ? 'Unmute experience audio' : 'Mute audio'}
      aria-label={muted ? 'Unmute audio' : 'Mute audio'}
    >
      {muted ? (
        <>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="1" y1="1" x2="23" y2="23"></line>
            <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
            <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
            <line x1="12" y1="19" x2="12" y2="23"></line>
            <line x1="8" y1="23" x2="16" y2="23"></line>
          </svg>
          <span>Sound off</span>
        </>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, height: 12 }}>
            <span style={{ width: 2, height: '60%', background: '#00F5A0', borderRadius: 2 }} />
            <span style={{ width: 2, height: '100%', background: '#00F5A0', borderRadius: 2 }} />
            <span style={{ width: 2, height: '40%', background: '#00F5A0', borderRadius: 2 }} />
            <span style={{ width: 2, height: '80%', background: '#00F5A0', borderRadius: 2 }} />
          </div>
          <span style={{ color: '#00F5A0' }}>Audio on</span>
        </>
      )}
    </button>
  );
}
