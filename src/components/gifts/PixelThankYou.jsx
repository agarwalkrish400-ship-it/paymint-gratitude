import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playSparkle, playSoftTap, playSuccessChord } from '../../utils/sound';

export default function PixelThankYou({ recipient, onUnlock }) {
  const tokens = recipient.tokens || [];
  const [collected, setCollected] = useState(new Set());

  const handleTapToken = (id) => {
    if (collected.has(id)) return;
    playSoftTap();
    setCollected((prev) => {
      const next = new Set(prev);
      next.add(id);
      if (next.size === tokens.length) {
        playSuccessChord();
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00F5A0', '#00D084', '#FFE600']
        });
        if (onUnlock) onUnlock();
      }
      return next;
    });
  };

  const isAllCollected = collected.size === tokens.length;

  return (
    <div style={{ width: '100%', maxWidth: 520, margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '32px 24px', textAlign: 'center' }}>
        <div style={{ marginBottom: 20 }}>
          <span className="badge-pill" style={{ color: '#00F5A0', borderColor: 'rgba(0, 245, 160, 0.3)' }}>
            RETRO ARCADE TRIBUTE
          </span>
          <h3 style={{ fontSize: 18, fontWeight: 800, marginTop: 8, color: '#FFFFFF' }}>
            Catch the 5 Beta Tokens
          </h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
            Tap each floating mint coin to reveal what your support brought to Paymint.
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 28 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#00F5A0' }}>
            {collected.size} / {tokens.length} Collected
          </span>
          <div style={{ width: 140, height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 99, overflow: 'hidden' }}>
            <div
              style={{
                width: `${(collected.size / tokens.length) * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #00D084, #00F5A0)',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>

        {/* Token Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 14, marginBottom: 24 }}>
          {tokens.map((token) => {
            const isDone = collected.has(token.id);
            return (
              <button
                key={token.id}
                onClick={() => handleTapToken(token.id)}
                className={isDone ? '' : 'animate-float'}
                style={{
                  background: isDone
                    ? 'linear-gradient(135deg, rgba(0, 245, 160, 0.2) 0%, rgba(0, 208, 132, 0.1) 100%)'
                    : 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${isDone ? '#00F5A0' : 'rgba(255, 255, 255, 0.12)'}`,
                  borderRadius: 16,
                  padding: '16px 10px',
                  cursor: isDone ? 'default' : 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.25s ease',
                  boxShadow: isDone ? '0 0 18px rgba(0, 245, 160, 0.25)' : 'none'
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: isDone ? '#00F5A0' : 'rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    color: isDone ? '#000' : '#FFF',
                    fontWeight: 800,
                    boxShadow: isDone ? '0 0 12px #00F5A0' : 'none'
                  }}
                >
                  {isDone ? '✓' : '🪙'}
                </div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: isDone ? '#00F5A0' : 'rgba(255, 255, 255, 0.8)'
                  }}
                >
                  {token.text}
                </span>
              </button>
            );
          })}
        </div>

        {isAllCollected ? (
          <div className="animate-fade-in-up" style={{ padding: 14, background: 'rgba(0, 245, 160, 0.1)', borderRadius: 12, border: '1px solid #00F5A0' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#00F5A0' }}>
              🎉 All tokens captured! Letter unlocked below.
            </span>
          </div>
        ) : (
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', margin: 0 }}>
            Decorative tokens for gratitude experience • Not tied to wallet coin balance
          </p>
        )}
      </div>
    </div>
  );
}
