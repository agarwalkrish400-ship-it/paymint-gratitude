import React, { useState, useEffect } from 'react';
import { playSparkle, playSoftTap } from '../../utils/sound';

export default function BloomingIdea({ recipient }) {
  const words = recipient.growthWords || ['TIME', 'TRUST', 'FEEDBACK', 'GROWTH'];
  const [stage, setStage] = useState(0);

  const handleNextStage = () => {
    if (stage < words.length) {
      const next = stage + 1;
      setStage(next);
      if (next === words.length) {
        playSparkle();
      } else {
        playSoftTap();
      }
    }
  };

  const isFullyBloomed = stage >= words.length;

  return (
    <div style={{ width: '100%', maxWidth: 520, margin: '0 auto' }}>
      <div
        className="glass-panel"
        style={{
          padding: '36px 28px',
          background: 'linear-gradient(145deg, rgba(9, 26, 19, 0.8) 0%, rgba(3, 8, 6, 0.9) 100%)',
          borderColor: 'rgba(0, 245, 160, 0.28)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 35px rgba(0, 245, 160, 0.15)',
          textAlign: 'center'
        }}
      >
        <span
          className="badge-pill"
          style={{ color: '#00F5A0', borderColor: 'rgba(0, 245, 160, 0.3)', background: 'rgba(0, 245, 160, 0.1)' }}
        >
          ORGANIC EVOLUTION
        </span>

        <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 8, color: '#FFFFFF' }}>
          {recipient.giftTitle}
        </h3>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          {recipient.subtitle}
        </p>

        {/* Luminous Light Sculpture Canvas / Graphic */}
        <div style={{ position: 'relative', width: 140, height: 140, margin: '24px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(0, 245, 160, ${0.15 + stage * 0.1}) 0%, transparent 70%)`,
              filter: 'blur(16px)',
              transition: 'all 0.5s ease'
            }}
          />

          {/* Procedural Luminous Flower / Crystal Layers */}
          <svg width="120" height="120" viewBox="0 0 100 100" style={{ transform: `scale(${0.7 + stage * 0.12})`, transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            {/* Center Core */}
            <circle cx="50" cy="50" r="10" fill="#00F5A0" opacity="0.9" />
            {/* Petal layers expanding with stage */}
            {stage >= 1 && (
              <g stroke="#00F5A0" strokeWidth="1.5" fill="none" opacity="0.6" className="animate-glow">
                <ellipse cx="50" cy="30" rx="6" ry="16" />
                <ellipse cx="50" cy="70" rx="6" ry="16" />
              </g>
            )}
            {stage >= 2 && (
              <g stroke="#00D084" strokeWidth="1.5" fill="none" opacity="0.7">
                <ellipse cx="30" cy="50" rx="16" ry="6" />
                <ellipse cx="70" cy="50" rx="16" ry="6" />
              </g>
            )}
            {stage >= 3 && (
              <g stroke="#5EEAD4" strokeWidth="1" fill="none" opacity="0.8">
                <circle cx="50" cy="50" r="28" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="38" opacity="0.4" />
              </g>
            )}
            {stage >= 4 && (
              <g stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.9" className="animate-glow">
                <circle cx="50" cy="50" r="44" />
              </g>
            )}
          </svg>
        </div>

        {/* Growth Word Pillars */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {words.map((w, idx) => {
            const isRevealed = idx < stage;
            return (
              <span
                key={w}
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  padding: '6px 14px',
                  borderRadius: 8,
                  background: isRevealed ? 'rgba(0, 245, 160, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                  color: isRevealed ? '#00F5A0' : 'rgba(255, 255, 255, 0.2)',
                  border: `1px solid ${isRevealed ? '#00F5A0' : 'rgba(255, 255, 255, 0.08)'}`,
                  boxShadow: isRevealed ? '0 0 14px rgba(0, 245, 160, 0.3)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                {w}
              </span>
            );
          })}
        </div>

        {!isFullyBloomed ? (
          <button onClick={handleNextStage} className="btn-secondary" style={{ color: '#00F5A0', borderColor: 'rgba(0, 245, 160, 0.3)' }}>
            Nurture the seed ({stage}/{words.length}) →
          </button>
        ) : (
          <div className="animate-fade-in-up" style={{ color: '#00F5A0', fontSize: 13, fontWeight: 600 }}>
            ✨ In full bloom. Your thoughtful feedback nurtured Paymint’s early growth.
          </div>
        )}
      </div>
    </div>
  );
}
