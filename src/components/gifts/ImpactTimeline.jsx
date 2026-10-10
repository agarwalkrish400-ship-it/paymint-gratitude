import React, { useState } from 'react';
import { playSoftTap, playSuccessChord } from '../../utils/sound';

export default function ImpactTimeline({ recipient }) {
  const milestones = recipient.milestones || [];
  const [activeStep, setActiveStep] = useState(2); // default to 'TEST' (Vivek's milestone!)
  const [visited, setVisited] = useState(new Set([0, 1, 2]));

  const handleSelect = (idx) => {
    setActiveStep(idx);
    playSoftTap();
    setVisited((prev) => {
      const next = new Set(prev);
      next.add(idx);
      if (next.size === milestones.length) {
        playSuccessChord();
      }
      return next;
    });
  };

  const currentMilestone = milestones[activeStep] || milestones[0];

  return (
    <div style={{ width: '100%', maxWidth: 580, margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '32px 28px', border: '1px solid rgba(0, 229, 255, 0.25)' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <span className="badge-pill" style={{ color: '#00E5FF', borderColor: 'rgba(0, 229, 255, 0.3)', background: 'rgba(0, 229, 255, 0.1)' }}>
            INTERACTIVE EVOLUTION
          </span>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 8, color: '#FFFFFF' }}>
            The Cycle of Continuous Progress
          </h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Tap each phase to trace how early feedback transformed Paymint.
          </p>
        </div>

        {/* Milestone Node Track */}
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: 32, padding: '0 8px' }}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '8%',
              right: '8%',
              height: 2,
              background: 'rgba(255,255,255,0.1)',
              transform: 'translateY(-50%)',
              zIndex: 0
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '8%',
              width: `${(activeStep / (milestones.length - 1)) * 84}%`,
              height: 2,
              background: 'linear-gradient(90deg, #00F5A0, #00E5FF)',
              transform: 'translateY(-50%)',
              zIndex: 0,
              transition: 'width 0.3s ease'
            }}
          />

          {milestones.map((m, idx) => {
            const isActive = idx === activeStep;
            const isDone = visited.has(idx);
            return (
              <button
                key={m.step}
                onClick={() => handleSelect(idx)}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  background: isActive ? '#00E5FF' : isDone ? 'rgba(0, 229, 255, 0.2)' : 'rgba(20, 30, 28, 0.9)',
                  border: `2px solid ${isActive ? '#FFFFFF' : isDone ? '#00E5FF' : 'rgba(255,255,255,0.2)'}`,
                  color: isActive ? '#030806' : '#FFFFFF',
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: 11,
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 0 20px #00E5FF' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Current Milestone Detail Box */}
        <div
          className="animate-fade-in-up"
          key={activeStep}
          style={{
            background: 'rgba(0, 229, 255, 0.05)',
            border: '1px solid rgba(0, 229, 255, 0.2)',
            borderRadius: 16,
            padding: 24,
            marginBottom: 24
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#00E5FF', letterSpacing: '0.1em' }}>
              PHASE {activeStep + 1}: {currentMilestone.step}
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{currentMilestone.label}</span>
          </div>
          <p style={{ fontSize: 14.5, color: '#F4F8F6', lineHeight: 1.6, margin: 0 }}>
            {currentMilestone.desc}
          </p>
        </div>

        {/* Final Reveal Quote */}
        <div
          style={{
            textAlign: 'center',
            padding: '16px 20px',
            borderRadius: 12,
            background: 'rgba(255,255,255,0.03)',
            border: '1px dashed rgba(255,255,255,0.15)'
          }}
        >
          <p style={{ margin: 0, fontSize: 13.5, fontStyle: 'italic', color: '#00E5FF', fontWeight: 600 }}>
            "{recipient.finalQuote}"
          </p>
        </div>
      </div>
    </div>
  );
}
