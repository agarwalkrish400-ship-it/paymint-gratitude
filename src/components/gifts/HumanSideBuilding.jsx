import React, { useState } from 'react';
import { playSoftTap, playSparkle } from '../../utils/sound';

export default function HumanSideBuilding({ recipient }) {
  const [opened, setOpened] = useState(false);

  const handleToggle = () => {
    setOpened(!opened);
    if (!opened) {
      playSparkle();
    } else {
      playSoftTap();
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: 540, margin: '0 auto' }}>
      <div
        className="glass-panel"
        style={{
          padding: '36px 30px',
          background: 'linear-gradient(145deg, rgba(24, 17, 6, 0.75) 0%, rgba(7, 4, 1, 0.85) 100%)',
          borderColor: 'rgba(245, 158, 11, 0.25)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 35px rgba(245, 158, 11, 0.12)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <span
            className="badge-pill"
            style={{ color: '#F59E0B', borderColor: 'rgba(245, 158, 11, 0.3)', background: 'rgba(245, 158, 11, 0.1)' }}
          >
            A FOUNDER REFLECTION
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 22,
              fontWeight: 600,
              color: '#FFFFFF',
              marginTop: 14,
              lineHeight: 1.4
            }}
          >
            "Behind every product are people who make the process better."
          </h3>
          <p style={{ fontSize: 13.5, color: 'rgba(244, 248, 246, 0.6)', marginTop: 8 }}>
            A note dedicated to Rushabh Kewat
          </p>
        </div>

        {/* Interactive card reveal */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleToggle}
            style={{
              background: opened ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${opened ? '#F59E0B' : 'rgba(245, 158, 11, 0.3)'}`,
              color: '#F59E0B',
              padding: '12px 22px',
              borderRadius: 99,
              fontSize: 13.5,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.25s ease'
            }}
          >
            <span>{opened ? '🌿 Close note' : '✨ ' + recipient.rememberTitle + ' →'}</span>
          </button>

          {opened && (
            <div
              className="animate-fade-in-up"
              style={{
                marginTop: 20,
                background: 'rgba(0, 0, 0, 0.45)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: 16,
                padding: 24,
                textAlign: 'left'
              }}
            >
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#F59E0B', fontWeight: 700, marginBottom: 8 }}>
                The Perspective
              </div>
              <p style={{ margin: 0, fontSize: 14.5, color: '#F4F8F6', lineHeight: 1.7, fontStyle: 'italic' }}>
                "{recipient.rememberNote}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
