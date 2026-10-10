import React, { useState, useEffect } from 'react';
import { playSoftTap, playSparkle } from '../../utils/sound';

export default function GlowingLetter({ recipient }) {
  const lines = recipient.letterLines || [];
  const [revealedCount, setRevealedCount] = useState(1);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (revealedCount < lines.length) {
      const timer = setTimeout(() => {
        setRevealedCount((prev) => prev + 1);
        playSoftTap();
      }, 1600);
      return () => clearTimeout(timer);
    } else if (revealedCount >= lines.length && !isDone) {
      setIsDone(true);
      playSparkle();
    }
  }, [revealedCount, lines.length, isDone]);

  const handleRevealAll = () => {
    setRevealedCount(lines.length);
    setIsDone(true);
    playSparkle();
  };

  return (
    <div style={{ width: '100%', maxWidth: 540, margin: '0 auto' }}>
      <div
        className="glass-panel"
        style={{
          padding: '36px 32px',
          background: 'linear-gradient(145deg, rgba(20, 18, 10, 0.75) 0%, rgba(8, 7, 4, 0.85) 100%)',
          borderColor: 'rgba(230, 211, 163, 0.25)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(230, 211, 163, 0.12)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>✨</span>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#E6D3A3', textTransform: 'uppercase' }}>
              Handwritten For Medhaavi
            </span>
          </div>
          {!isDone && (
            <button
              onClick={handleRevealAll}
              style={{
                background: 'rgba(230, 211, 163, 0.1)',
                border: '1px solid rgba(230, 211, 163, 0.2)',
                color: '#E6D3A3',
                fontSize: 11,
                padding: '4px 10px',
                borderRadius: 99,
                cursor: 'pointer'
              }}
            >
              Reveal all lines
            </button>
          )}
        </div>

        <div style={{ minHeight: 280, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {lines.slice(0, revealedCount).map((line, idx) => (
            <p
              key={idx}
              className="animate-fade-in-up"
              style={{
                margin: 0,
                fontSize: idx === 0 ? 20 : 15.5,
                fontWeight: idx === 0 ? 700 : 400,
                color: idx === 0 ? '#FFFFFF' : 'rgba(244, 248, 246, 0.92)',
                lineHeight: 1.7,
                textShadow: idx === revealedCount - 1 ? '0 0 16px rgba(230, 211, 163, 0.6)' : 'none',
                transition: 'all 0.4s ease'
              }}
            >
              {line}
            </p>
          ))}
          {!isDone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#E6D3A3', fontSize: 13, opacity: 0.7 }}>
              <span className="animate-glow">✍️</span>
              <span style={{ fontStyle: 'italic', fontSize: 12 }}>Writing...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
