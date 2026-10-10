import React, { useState } from 'react';
import { playSoftTap, playSuccessChord } from '../../utils/sound';

export default function GratitudeConstellation({ recipient }) {
  const stars = recipient.stars || [];
  const [activeStar, setActiveStar] = useState(null);
  const [revealed, setRevealed] = useState(new Set());

  // Star positions on a 100x100 canvas/SVG plane
  const positions = [
    { x: 50, y: 18 },  // top apex
    { x: 82, y: 40 },  // right top
    { x: 70, y: 82 },  // right bottom
    { x: 30, y: 82 },  // left bottom
    { x: 18, y: 40 }   // left top
  ];

  const handleStarClick = (idx) => {
    setActiveStar(idx);
    playSoftTap();
    setRevealed((prev) => {
      const next = new Set(prev);
      next.add(idx);
      if (next.size === stars.length) {
        playSuccessChord();
      }
      return next;
    });
  };

  const isConnected = revealed.size === stars.length;

  return (
    <div style={{ width: '100%', maxWidth: 520, margin: '0 auto' }}>
      <div
        className="glass-panel"
        style={{
          padding: '32px 24px',
          background: 'linear-gradient(145deg, rgba(12, 15, 32, 0.8) 0%, rgba(3, 4, 10, 0.9) 100%)',
          borderColor: 'rgba(129, 140, 248, 0.25)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 35px rgba(129, 140, 248, 0.12)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span
            className="badge-pill"
            style={{ color: '#818CF8', borderColor: 'rgba(129, 140, 248, 0.3)', background: 'rgba(129, 140, 248, 0.1)' }}
          >
            COSMIC CONSTELLATION
          </span>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 8, color: '#FFFFFF' }}>
            {recipient.giftTitle}
          </h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Tap the 5 glowing stars to trace the constellation of gratitude.
          </p>
        </div>

        {/* Constellation Canvas / SVG Area */}
        <div style={{ position: 'relative', width: '100%', height: 260, margin: '0 auto', maxWidth: 360 }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            {/* Draw connecting lines */}
            {isConnected && (
              <polygon
                points={positions.map((p) => `${p.x}%,${p.y}%`).join(' ')}
                fill="rgba(129, 140, 248, 0.08)"
                stroke="#818CF8"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="animate-glow"
              />
            )}
            {/* Draw internal nexus */}
            {isConnected && (
              <circle cx="50%" cy="52%" r="28" fill="none" stroke="rgba(0, 245, 160, 0.4)" strokeWidth="1" />
            )}
          </svg>

          {stars.map((star, idx) => {
            const pos = positions[idx];
            const isSeen = revealed.has(idx);
            const isSelected = activeStar === idx;

            return (
              <button
                key={star.id}
                onClick={() => handleStarClick(idx)}
                style={{
                  position: 'absolute',
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: isSelected ? 42 : 34,
                  height: isSelected ? 42 : 34,
                  borderRadius: '50%',
                  background: isSelected ? '#818CF8' : isSeen ? 'rgba(129, 140, 248, 0.3)' : 'rgba(255, 255, 255, 0.08)',
                  border: `2px solid ${isSelected ? '#FFFFFF' : isSeen ? '#818CF8' : 'rgba(255, 255, 255, 0.3)'}`,
                  color: isSelected ? '#03040A' : '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  cursor: 'pointer',
                  boxShadow: isSelected
                    ? '0 0 25px #818CF8'
                    : isSeen
                    ? '0 0 15px rgba(129, 140, 248, 0.5)'
                    : 'none',
                  transition: 'all 0.3s ease',
                  zIndex: 2
                }}
              >
                ★
              </button>
            );
          })}
        </div>

        {/* Selected Star Message Box */}
        <div style={{ minHeight: 74, marginTop: 12 }}>
          {activeStar !== null ? (
            <div
              className="animate-fade-in-up"
              style={{
                background: 'rgba(129, 140, 248, 0.08)',
                border: '1px solid rgba(129, 140, 248, 0.2)',
                borderRadius: 14,
                padding: '14px 18px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: '#818CF8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                STAR {activeStar + 1}: {stars[activeStar].title}
              </div>
              <div style={{ fontSize: 13.5, color: '#F4F8F6', marginTop: 4 }}>
                {stars[activeStar].text}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
              Tap any star to reveal its note.
            </div>
          )}
        </div>

        {/* Final Quote */}
        {isConnected && (
          <div
            className="animate-fade-in-up"
            style={{
              marginTop: 18,
              padding: 14,
              borderRadius: 12,
              background: 'rgba(129, 140, 248, 0.12)',
              border: '1px solid rgba(129, 140, 248, 0.3)',
              textAlign: 'center'
            }}
          >
            <p style={{ margin: 0, fontSize: 13.5, fontStyle: 'italic', color: '#A5B4FC', fontWeight: 600 }}>
              "{recipient.finalQuote}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
