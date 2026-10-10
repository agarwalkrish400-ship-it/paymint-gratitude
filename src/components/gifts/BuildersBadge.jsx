import React, { useState } from 'react';
import { playSoftTap, playSparkle } from '../../utils/sound';

export default function BuildersBadge({ recipient }) {
  const [inspected, setInspected] = useState(false);
  const meta = recipient.badgeMeta || {};

  const handleInspect = () => {
    setInspected(!inspected);
    if (!inspected) {
      playSparkle();
    } else {
      playSoftTap();
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: 480, margin: '0 auto' }}>
      <div
        className="glass-panel"
        style={{
          padding: '36px 28px',
          background: 'linear-gradient(145deg, rgba(8, 21, 31, 0.75) 0%, rgba(2, 5, 8, 0.85) 100%)',
          borderColor: 'rgba(56, 189, 248, 0.25)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(56, 189, 248, 0.15)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          {/* Futuristic Hexagon Badge Icon */}
          <div
            style={{
              width: 80,
              height: 80,
              margin: '0 auto 16px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '24%',
                border: '2px solid #38BDF8',
                transform: 'rotate(45deg)',
                background: 'rgba(56, 189, 248, 0.1)',
                boxShadow: '0 0 25px rgba(56, 189, 248, 0.4)'
              }}
              className="animate-glow"
            />
            <span style={{ fontSize: 32, position: 'relative', zIndex: 1 }}>🛡️</span>
          </div>

          <span
            className="badge-pill"
            style={{ color: '#38BDF8', borderColor: 'rgba(56, 189, 248, 0.3)', background: 'rgba(56, 189, 248, 0.1)' }}
          >
            ENGINEERING APPRECIATION
          </span>

          <h3 style={{ fontSize: 19, fontWeight: 800, marginTop: 10, color: '#FFFFFF' }}>
            {meta.text}
          </h3>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 10,
              padding: '4px 12px',
              background: 'rgba(56, 189, 248, 0.08)',
              borderRadius: 6,
              border: '1px solid rgba(56, 189, 248, 0.2)',
              fontFamily: 'monospace',
              fontSize: 11,
              color: '#38BDF8'
            }}
          >
            <span>BUILD REF:</span>
            <span>{meta.buildId}</span>
          </div>
        </div>

        {/* Interactive inspection section */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleInspect}
            className="btn-secondary"
            style={{
              borderColor: 'rgba(56, 189, 248, 0.3)',
              color: '#38BDF8',
              fontSize: 13,
              marginBottom: 16
            }}
          >
            {inspected ? 'Hide telemetry signature' : 'Inspect build signature →'}
          </button>

          {inspected && (
            <div
              className="animate-fade-in-up"
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                borderRadius: 14,
                padding: 18,
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 8 }}>
                <span>CRYPTOGRAPHIC HASH:</span>
                <span>{meta.signature}</span>
              </div>
              <p style={{ margin: 0, fontSize: 14, fontStyle: 'italic', color: '#FFFFFF', lineHeight: 1.6 }}>
                "{recipient.revealQuote}"
              </p>
            </div>
          )}

          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 14, margin: '14px 0 0' }}>
            Decorative badge credential • Built for pre-beta contributor recognition
          </p>
        </div>
      </div>
    </div>
  );
}
