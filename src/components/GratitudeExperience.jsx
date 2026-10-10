import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import AmbientBackground from './AmbientBackground';
import SoundToggle from './SoundToggle';
import LetterCard from './LetterCard';
import { playOpenChime, playSoftTap } from '../utils/sound';

// Gift Components
import FirstBelieversCard from './gifts/FirstBelieversCard';
import GlowingLetter from './gifts/GlowingLetter';
import ImpactTimeline from './gifts/ImpactTimeline';
import PixelThankYou from './gifts/PixelThankYou';
import BuildersBadge from './gifts/BuildersBadge';
import GratitudeConstellation from './gifts/GratitudeConstellation';
import FutureVault from './gifts/FutureVault';
import HumanSideBuilding from './gifts/HumanSideBuilding';
import BloomingIdea from './gifts/BloomingIdea';
import MissionPatch from './gifts/MissionPatch';
import TimeCapsule from './gifts/TimeCapsule';
import FinalRevealBox from './gifts/FinalRevealBox';

export default function GratitudeExperience({ recipient }) {
  // Screen 1 (Opening) -> Screen 2 (Gift & Letter)
  const [screen, setScreen] = useState(1);
  const [shareCopied, setShareCopied] = useState(false);

  const handleOpenGift = () => {
    playOpenChime();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.55 },
      colors: ['#00F5A0', '#00D084', '#FFFFFF']
    });
    setScreen(2);
  };

  const handleReplay = () => {
    playSoftTap();
    setScreen(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = async () => {
    playSoftTap();
    const shareUrl = window.location.href;
    const shareData = {
      title: `Paymint | Gift for ${recipient.name}`,
      text: `A personal pre-beta appreciation gift from Paymint for ${recipient.name}.`,
      url: shareUrl
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // User dismissed share dialog
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 3000);
    } catch (err) {
      alert('Link copied to clipboard: ' + shareUrl);
    }
  };

  const renderGiftComponent = () => {
    switch (recipient.giftType) {
      case 'first-believers':
        return <FirstBelieversCard recipient={recipient} />;
      case 'glowing-letter':
        return <GlowingLetter recipient={recipient} />;
      case 'impact-timeline':
        return <ImpactTimeline recipient={recipient} />;
      case 'pixel-thank-you':
        return <PixelThankYou recipient={recipient} />;
      case 'builders-badge':
        return <BuildersBadge recipient={recipient} />;
      case 'gratitude-constellation':
        return <GratitudeConstellation recipient={recipient} />;
      case 'future-vault':
        return <FutureVault recipient={recipient} />;
      case 'human-side':
        return <HumanSideBuilding recipient={recipient} />;
      case 'blooming-idea':
        return <BloomingIdea recipient={recipient} />;
      case 'mission-patch':
        return <MissionPatch recipient={recipient} />;
      case 'time-capsule':
        return <TimeCapsule recipient={recipient} />;
      case 'final-reveal':
        return <FinalRevealBox recipient={recipient} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Background Particles & Ambient Glow */}
      <AmbientBackground accentColor={recipient.theme?.accent || '#00F5A0'} />

      {/* Top Controls */}
      <SoundToggle />

      {/* Main Content Area */}
      <main style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px 40px' }}>
        
        {/* SCREEN 1: CINEMATIC OPENING */}
        {screen === 1 && (
          <div
            className="animate-fade-in-up"
            style={{
              maxWidth: 500,
              width: '100%',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 24
            }}
          >
            {/* Paymint Monogram / Logo Mark */}
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'rgba(0, 245, 160, 0.1)',
                border: '1px solid rgba(0, 245, 160, 0.3)',
                boxShadow: '0 0 30px rgba(0, 245, 160, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                fontWeight: 900,
                color: '#00F5A0'
              }}
              className="animate-glow"
            >
              P
            </div>

            <div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.45)',
                  marginBottom: 10,
                  display: 'block'
                }}
              >
                PAYMINT • THE PEOPLE BEHIND THE PROGRESS
              </span>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(26px, 5vw, 36px)',
                  fontWeight: 800,
                  lineHeight: 1.25,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  marginBottom: 12
                }}
              >
                Something small. Something personal. Just for you.
              </h1>
              <p
                style={{
                  fontSize: 16,
                  color: 'var(--text-muted)',
                  maxWidth: 380,
                  margin: '0 auto',
                  lineHeight: 1.5
                }}
              >
                A little thank-you from Paymint.
              </p>
            </div>

            <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <button
                onClick={handleOpenGift}
                className="btn-primary"
                id="open-gift-btn"
                style={{
                  fontSize: 16,
                  padding: '16px 36px'
                }}
              >
                Open your gift →
              </button>

              <button
                onClick={() => setScreen(2)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: 12,
                  cursor: 'pointer',
                  padding: '4px 8px'
                }}
              >
                Skip intro
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 2: PERSONALIZED EXPERIENCE & GIFT */}
        {screen === 2 && (
          <div
            className="animate-fade-in-up"
            style={{
              width: '100%',
              maxWidth: 680,
              display: 'flex',
              flexDirection: 'column',
              gap: 32
            }}
          >
            {/* Greeting Header */}
            <header style={{ textAlign: 'center' }}>
              <span
                className="badge-pill"
                style={{
                  marginBottom: 12,
                  color: recipient.theme?.accent || '#00F5A0',
                  borderColor: recipient.theme?.accentGlow || 'rgba(0, 245, 160, 0.3)'
                }}
              >
                PAYMINT PRE-BETA CIRCLE
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 6vw, 42px)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: '#FFFFFF',
                  lineHeight: 1.2
                }}
              >
                Hey, {recipient.name}. This one's for you.
              </h2>
              <p
                style={{
                  fontSize: 'clamp(14px, 3.5vw, 16px)',
                  color: 'var(--text-muted)',
                  marginTop: 8,
                  maxWidth: 480,
                  margin: '8px auto 0'
                }}
              >
                {recipient.subtitle}
              </p>
            </header>

            {/* Unique Digital Gift Component */}
            <section aria-label="Interactive Digital Gift">
              {renderGiftComponent()}
            </section>

            {/* Founder's Letter (For glowing-letter, it is already rendered in the interactive component) */}
            {recipient.giftType !== 'glowing-letter' && (
              <section aria-label="Founder's Note">
                <LetterCard recipient={recipient} />
              </section>
            )}

            {/* SCREEN 3: CLOSING & SHARE / REPLAY SECTION */}
            <footer
              style={{
                marginTop: 24,
                paddingTop: 32,
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 18
              }}
            >
              <div>
                <p style={{ fontSize: 13.5, color: 'var(--text-muted)', margin: 0 }}>
                  Made with appreciation. Shared with you personally.
                </p>
                <div style={{ marginTop: 6, fontStyle: 'italic', color: '#00F5A0', fontSize: 13, fontWeight: 600 }}>
                  — Krish, Founder, Paymint
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                  onClick={handleReplay}
                  className="btn-secondary"
                  id="replay-gift-btn"
                >
                  ↺ Replay my gift
                </button>

                <button
                  onClick={handleShare}
                  className="btn-secondary"
                  id="share-moment-btn"
                  style={{
                    color: shareCopied ? '#00F5A0' : 'var(--text-main)',
                    borderColor: shareCopied ? '#00F5A0' : 'var(--border-subtle)'
                  }}
                >
                  {shareCopied ? '✓ Link copied!' : '↗ Share this moment'}
                </button>
              </div>

              <p style={{ fontSize: 11, color: 'rgba(255, 255, 255, 0.3)', maxWidth: 360, margin: '8px 0 0' }}>
                Private personal link. Designed exclusively for {recipient.name}’s beta contribution.
              </p>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
}
