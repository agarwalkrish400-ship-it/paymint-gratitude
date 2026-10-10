import React from 'react';

export default function LetterCard({ recipient }) {
  const paragraphs = recipient.letter.split('\n\n');

  return (
    <div style={{ width: '100%', maxWidth: 580, margin: '24px auto 0' }}>
      <div className="founder-letter-box">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'rgba(0, 245, 160, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14
            }}
          >
            ✉️
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: '#00F5A0', textTransform: 'uppercase' }}>
            A Founders' Note From Krish & Brijen
          </span>
        </div>

        {paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}

        <div className="founder-signature">
          <div style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.65)', marginBottom: 6 }}>
            {recipient.signOff.salutation}
          </div>
          <div className="name">{recipient.signOff.name}</div>
          <div className="title">{recipient.signOff.title}</div>
        </div>
      </div>
    </div>
  );
}
