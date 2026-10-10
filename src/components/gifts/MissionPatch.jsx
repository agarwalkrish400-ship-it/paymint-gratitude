import React, { useState } from 'react';
import { playSoftTap, playSparkle } from '../../utils/sound';

export default function MissionPatch({ recipient }) {
  const missionLog = recipient.missionLog || [];
  const [activeLog, setActiveLog] = useState(0);

  const handleSelect = (idx) => {
    setActiveLog(idx);
    playSoftTap();
    if (idx === missionLog.length - 1) {
      playSparkle();
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: 540, margin: '0 auto' }}>
      <div
        className="glass-panel"
        style={{
          padding: '36px 28px',
          background: 'linear-gradient(145deg, rgba(6, 24, 31, 0.8) 0%, rgba(2, 6, 8, 0.9) 100%)',
          borderColor: 'rgba(34, 211, 238, 0.28)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 35px rgba(34, 211, 238, 0.15)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          {/* Mission Emblem */}
          <div
            style={{
              width: 84,
              height: 84,
              margin: '0 auto 16px',
              borderRadius: '50%',
              border: '2px solid #22D3EE',
              background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, rgba(2, 6, 8, 0.9) 80%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px rgba(34, 211, 238, 0.35)',
              position: 'relative'
            }}
            className="animate-glow"
          >
            <span style={{ fontSize: 32 }}>🚀</span>
          </div>

          <span
            className="badge-pill"
            style={{ color: '#22D3EE', borderColor: 'rgba(34, 211, 238, 0.3)', background: 'rgba(34, 211, 238, 0.1)' }}
          >
            MISSION COLLECTIBLE
          </span>
          <h3 style={{ fontSize: 18, fontWeight: 800, marginTop: 8, color: '#FFFFFF' }}>
            PAYMINT: PRE-BETA CREW
          </h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Recipient: Dharak Dave • Mission Telemetry Log
          </p>
        </div>

        {/* 4 Mission Stages */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 20 }}>
          {missionLog.map((stage, idx) => {
            const isSelected = activeLog === idx;
            return (
              <button
                key={stage.stage}
                onClick={() => handleSelect(idx)}
                style={{
                  padding: '12px 14px',
                  borderRadius: 12,
                  background: isSelected ? 'rgba(34, 211, 238, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${isSelected ? '#22D3EE' : 'rgba(255, 255, 255, 0.1)'}`,
                  color: isSelected ? '#22D3EE' : 'rgba(255, 255, 255, 0.8)',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontSize: 10, opacity: 0.6, letterSpacing: '0.08em' }}>STAGE 0{idx + 1}</div>
                <div>{stage.stage}</div>
              </button>
            );
          })}
        </div>

        {/* Stage Log Content */}
        <div
          className="animate-fade-in-up"
          key={activeLog}
          style={{
            background: 'rgba(0, 0, 0, 0.45)',
            border: '1px solid rgba(34, 211, 238, 0.2)',
            borderRadius: 14,
            padding: 18,
            marginBottom: 20
          }}
        >
          <div style={{ fontSize: 11, color: '#22D3EE', fontWeight: 700, letterSpacing: '0.1em' }}>
            LOG ENTRY: {missionLog[activeLog].stage}
          </div>
          <p style={{ fontSize: 13.5, color: '#F4F8F6', margin: '6px 0 0', lineHeight: 1.6 }}>
            {missionLog[activeLog].summary}
          </p>
        </div>

        {/* Final Mission Quote */}
        <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: 16 }}>
          <p style={{ margin: 0, fontSize: 13, fontStyle: 'italic', color: '#22D3EE' }}>
            "{recipient.finalQuote}"
          </p>
        </div>
      </div>
    </div>
  );
}
