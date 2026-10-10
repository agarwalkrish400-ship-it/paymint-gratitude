import React, { useState } from 'react';
import { playOpenChime } from '../../utils/sound';

export default function TimeCapsule({ recipient }) {
  const [opened, setOpened] = useState(false);
  const highlights = recipient.capsuleHighlights || [];

  const handleOpen = () => {
    setOpened(true);
    playOpenChime();
  };

  return (
    <div style={{ width: '100%', maxWidth: 540, margin: '0 auto' }}>
      <div
        className="glass-panel"
        style={{
          padding: '36px 28px',
          background: 'linear-gradient(145deg, rgba(18, 21, 28, 0.8) 0%, rgba(5, 6, 8, 0.9) 100%)',
          borderColor: 'rgba(226, 232, 240, 0.25)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 35px rgba(226, 232, 240, 0.12)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <span
            className="badge-pill"
            style={{ color: '#E2E8F0', borderColor: 'rgba(226, 232, 240, 0.3)', background: 'rgba(226, 232, 240, 0.1)' }}
          >
            PERMANENT KEEPSAKE
          </span>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 8, color: '#FFFFFF' }}>
            {recipient.giftTitle}
          </h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Dedicated to Pehr Desai • Preserved from the early beginnings
          </p>
        </div>

        {!opened ? (
          <div style={{ textAlign: 'center', padding: '24px 10px' }}>
            <div
              style={{
                width: 100,
                height: 70,
                margin: '0 auto 20px',
                borderRadius: 14,
                border: '2px solid rgba(226, 232, 240, 0.4)',
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(0, 0, 0, 0.5) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
              className="animate-float"
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: '#00F5A0',
                  boxShadow: '0 0 15px #00F5A0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  color: '#000',
                  fontWeight: 800
                }}
              >
                P
              </div>
            </div>

            <p style={{ fontSize: 13, color: '#E2E8F0', fontWeight: 600, marginBottom: 18 }}>
              "{recipient.capsuleLabel}"
            </p>

            <button onClick={handleOpen} className="btn-primary" style={{ background: 'linear-gradient(135deg, #E2E8F0 0%, #94A3B8 100%)', color: '#030806' }}>
              Break Seal & Open Capsule →
            </button>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(226, 232, 240, 0.15)',
                    borderRadius: 14,
                    padding: '14px 18px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 10, color: '#00F5A0', fontWeight: 700, letterSpacing: '0.1em' }}>
                      {item.tag}
                    </span>
                    <span style={{ fontSize: 13, color: '#FFFFFF', fontWeight: 700 }}>{item.title}</span>
                  </div>
                  <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--text-muted)' }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', color: '#00F5A0', fontSize: 12.5, fontStyle: 'italic' }}>
              ✨ Time capsule unsealed. The personal letter follows below.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
