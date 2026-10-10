import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playOpenChime, playSparkle, playSoftTap } from '../../utils/sound';

export default function FinalRevealBox({ recipient }) {
  const [isOpened, setIsOpened] = useState(false);
  const [showLastThing, setShowLastThing] = useState(false);

  const handleOpenBox = () => {
    setIsOpened(true);
    playOpenChime();
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FBBF24', '#00F5A0', '#FFFFFF']
    });
  };

  const handleShowLastThing = () => {
    setShowLastThing(true);
    playSparkle();
  };

  return (
    <div style={{ width: '100%', maxWidth: 540, margin: '0 auto' }}>
      <div
        className="glass-panel"
        style={{
          padding: '36px 28px',
          background: 'linear-gradient(145deg, rgba(25, 20, 6, 0.8) 0%, rgba(7, 5, 1, 0.9) 100%)',
          borderColor: 'rgba(251, 191, 36, 0.3)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 35px rgba(251, 191, 36, 0.15)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <span
            className="badge-pill"
            style={{ color: '#FBBF24', borderColor: 'rgba(251, 191, 36, 0.3)', background: 'rgba(251, 191, 36, 0.1)' }}
          >
            THE FOUNDER'S BOX
          </span>
          <h3 style={{ fontSize: 18, fontWeight: 800, marginTop: 8, color: '#FFFFFF' }}>
            {recipient.giftTitle}
          </h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Designed exclusively for Kavya Shah
          </p>
        </div>

        {!isOpened ? (
          <div style={{ textAlign: 'center', padding: '24px 10px' }}>
            {/* Elegant Gift Box Icon / Ribbon */}
            <div
              style={{
                width: 90,
                height: 90,
                margin: '0 auto 20px',
                borderRadius: 20,
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%)',
                border: '2px solid #FBBF24',
                boxShadow: '0 0 30px rgba(251, 191, 36, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 38
              }}
              className="animate-glow"
            >
              🎁
            </div>

            <button
              onClick={handleOpenBox}
              className="btn-primary"
              style={{ background: 'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)', color: '#050401' }}
            >
              Untie Ribbon & Reveal Gift →
            </button>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            {/* Unboxed Appreciation Card */}
            <div
              style={{
                background: 'rgba(251, 191, 36, 0.08)',
                border: '1px solid rgba(251, 191, 36, 0.25)',
                borderRadius: 18,
                padding: 24,
                textAlign: 'center',
                marginBottom: 20
              }}
            >
              <div style={{ fontSize: 11, color: '#FBBF24', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Paymint Beta Appreciation Card
              </div>
              <h4 style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', margin: '8px 0 4px' }}>
                Kavya Shah
              </h4>
              <p style={{ fontSize: 13, color: '#FBBF24', fontWeight: 600 }}>
                Early Contributor • Invaluable Perspective
              </p>
            </div>

            {/* "One last thing..." Interactive Button */}
            {!showLastThing ? (
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <button
                  onClick={handleShowLastThing}
                  style={{
                    background: 'none',
                    border: '1px dashed rgba(251, 191, 36, 0.5)',
                    borderRadius: 99,
                    color: '#FBBF24',
                    padding: '10px 20px',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  One last thing... →
                </button>
              </div>
            ) : (
              <div
                className="animate-fade-in-up"
                style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  borderRadius: 16,
                  padding: 20,
                  marginTop: 16
                }}
              >
                <div style={{ fontSize: 10, color: '#FBBF24', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 6 }}>
                  FROM KRISH
                </div>
                <p style={{ margin: 0, fontSize: 14, color: '#F4F8F6', lineHeight: 1.6, fontStyle: 'italic' }}>
                  "{recipient.closingSurprise}"
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
