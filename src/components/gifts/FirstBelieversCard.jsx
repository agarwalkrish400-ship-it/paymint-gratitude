import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playSparkle, playSoftTap } from '../../utils/sound';

export default function FirstBelieversCard({ recipient }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [flipped, setFlipped] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left - card.width / 2;
    const y = e.clientY - card.top - card.height / 2;
    setRotate({
      x: -(y / card.height) * 18,
      y: (x / card.width) * 18
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const triggerCelebrate = () => {
    playSparkle();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#00F5A0', '#00D084', '#FFFFFF']
    });
  };

  return (
    <div style={{ width: '100%', maxWidth: 440, margin: '0 auto' }}>
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          setFlipped(!flipped);
          playSoftTap();
        }}
        className="holo-card"
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          cursor: 'pointer',
          padding: 32,
          minHeight: 260,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'rgba(0, 245, 160, 0.15)',
                border: '1px solid #00F5A0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                color: '#00F5A0',
                fontSize: 14
              }}
            >
              P
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', color: '#00F5A0' }}>
              {recipient.badgeInfo.title}
            </span>
          </div>
          <span
            style={{
              fontSize: 10,
              fontFamily: 'monospace',
              color: 'rgba(255,255,255,0.4)',
              background: 'rgba(255,255,255,0.06)',
              padding: '3px 8px',
              borderRadius: 6
            }}
          >
            {recipient.badgeInfo.cardId}
          </span>
        </div>

        <div style={{ margin: '32px 0 24px' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.45)', marginBottom: 4 }}>
            Member Name
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            {recipient.name}
          </div>
          <div style={{ fontSize: 13, color: '#00D084', marginTop: 4, fontWeight: 600 }}>
            {recipient.badgeInfo.edition}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16 }}>
          <div>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)' }}>
              Status
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
              {recipient.badgeInfo.status}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00F5A0', boxShadow: '0 0 10px #00F5A0' }} />
            <span style={{ fontSize: 11, color: '#00F5A0', fontWeight: 600 }}>Verified Beta Contributor</span>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 14 }}>
        <button
          onClick={triggerCelebrate}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(0, 245, 160, 0.8)',
            fontSize: 12,
            cursor: 'pointer',
            padding: '4px 8px'
          }}
        >
          ✨ Celebrate this moment
        </button>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
          Honorary pre-beta member keepsake • Non-financial recognition
        </p>
      </div>
    </div>
  );
}
