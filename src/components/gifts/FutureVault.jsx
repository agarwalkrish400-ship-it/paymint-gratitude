import React, { useState } from 'react';
import { playOpenChime, playSoftTap } from '../../utils/sound';

export default function FutureVault({ recipient }) {
  const [unlocked, setUnlocked] = useState(false);
  const [activeKeepsake, setActiveKeepsake] = useState(0);
  const keepsakes = recipient.keepsakes || [];

  const handleUnlock = () => {
    setUnlocked(true);
    playOpenChime();
  };

  return (
    <div style={{ width: '100%', maxWidth: 540, margin: '0 auto' }}>
      <div
        className="glass-panel"
        style={{
          padding: '36px 28px',
          background: 'linear-gradient(145deg, rgba(8, 26, 20, 0.8) 0%, rgba(2, 8, 5, 0.9) 100%)',
          borderColor: 'rgba(16, 185, 129, 0.3)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 35px rgba(16, 185, 129, 0.15)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <span
            className="badge-pill"
            style={{ color: '#10B981', borderColor: 'rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.1)' }}
          >
            CONFIDENTIAL VAULT
          </span>
          <h3 style={{ fontSize: 19, fontWeight: 800, marginTop: 8, color: '#FFFFFF' }}>
            {recipient.giftTitle}
          </h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            {recipient.subtitle}
          </p>
        </div>

        {!unlocked ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div
              style={{
                width: 90,
                height: 90,
                margin: '0 auto 20px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(2, 8, 5, 0.8) 80%)',
                border: '2px solid #10B981',
                boxShadow: '0 0 30px rgba(16, 185, 129, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 36
              }}
              className="animate-glow"
            >
              🔒
            </div>

            <button onClick={handleUnlock} className="btn-primary" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
              Decrypt & Open Vault →
            </button>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 12 }}>
              Authorized biometric access for Ayush Khadakban
            </p>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            {/* Keepsake Selector Tabs */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
              {keepsakes.map((k, idx) => (
                <button
                  key={k.id}
                  onClick={() => {
                    setActiveKeepsake(idx);
                    playSoftTap();
                  }}
                  style={{
                    flex: 1,
                    minWidth: 120,
                    padding: '10px 12px',
                    borderRadius: 12,
                    border: `1px solid ${activeKeepsake === idx ? '#10B981' : 'rgba(255,255,255,0.1)'}`,
                    background: activeKeepsake === idx ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.03)',
                    color: activeKeepsake === idx ? '#10B981' : 'rgba(255,255,255,0.6)',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'center'
                  }}
                >
                  {k.label}
                </button>
              ))}
            </div>

            {/* Keepsake Content Card */}
            <div
              key={activeKeepsake}
              className="animate-fade-in-up"
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: 16,
                padding: 24
              }}
            >
              <div style={{ fontSize: 11, color: '#10B981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                KEEPSAKE 0{activeKeepsake + 1}
              </div>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', margin: '4px 0 10px' }}>
                {keepsakes[activeKeepsake].title}
              </h4>
              <p style={{ fontSize: 14, color: 'rgba(244, 248, 246, 0.9)', lineHeight: 1.6, margin: 0 }}>
                {keepsakes[activeKeepsake].content}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
