import React, { useState, useEffect } from 'react';
import { RECIPIENTS, RECIPIENT_SLUGS } from './data/recipients';
import GratitudeExperience from './components/GratitudeExperience';
import AmbientBackground from './components/AmbientBackground';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Parse recipient slug from query param (?to=slug or ?gift=slug), hash, or pathname
  const getSlugFromPath = (path) => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const qSlug = urlParams.get('to') || urlParams.get('gift') || urlParams.get('name') || urlParams.get('for');
      if (qSlug) return qSlug.toLowerCase();
    } catch (e) {}

    const hash = window.location.hash;
    if (hash) {
      const hashMatch = hash.match(/(?:thanks\/)?([a-z0-9-]+)\/?$/i);
      if (hashMatch) return hashMatch[1].toLowerCase();
    }

    const match = path.match(/(?:thanks\/)?([a-z0-9-]+)\/?$/i);
    return match ? match[1].toLowerCase() : null;
  };

  const recipientSlug = getSlugFromPath(currentPath);
  const currentRecipient = recipientSlug ? RECIPIENTS[recipientSlug] : null;

  // Update document title and meta
  useEffect(() => {
    if (currentRecipient) {
      document.title = `Paymint | Gift for ${currentRecipient.name}`;
    } else {
      document.title = 'Paymint | The People Behind The Progress';
    }
  }, [currentRecipient]);

  // Navigate helper
  const navigateTo = (slug) => {
    const path = `/thanks/${slug}`;
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If a valid recipient route is active, render their isolated gratitude experience
  if (currentRecipient) {
    return <GratitudeExperience recipient={currentRecipient} />;
  }

  // If an invalid `/thanks/...` route was entered
  if (currentPath.startsWith('/thanks/')) {
    return (
      <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
        <AmbientBackground />
        <div className="glass-panel animate-fade-in-up" style={{ padding: '40px 32px', maxWidth: 460 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🔒</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#FFF', marginBottom: 8 }}>
            Private Link Not Found
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 24 }}>
            This personal gratitude gift URL could not be found. Please check that you entered your unique personal link correctly.
          </p>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/');
              setCurrentPath('/');
            }}
            className="btn-secondary"
          >
            ← Return to portal
          </a>
        </div>
      </div>
    );
  }

  // Root Landing / Portal View (For founder Krish to preview all 12 links or test)
  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
      <AmbientBackground />
      <div
        className="animate-fade-in-up"
        style={{
          maxWidth: 720,
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            margin: '0 auto 20px',
            borderRadius: '50%',
            background: 'rgba(0, 245, 160, 0.12)',
            border: '1px solid #00F5A0',
            boxShadow: '0 0 35px rgba(0, 245, 160, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            fontWeight: 900,
            color: '#00F5A0'
          }}
          className="animate-glow"
        >
          P
        </div>

        <span className="badge-pill" style={{ marginBottom: 16 }}>
          FOUNDER'S APPRECIATION INITIATIVE
        </span>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 6vw, 44px)',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: 16
          }}
        >
          PAYMINT: THE PEOPLE BEHIND THE PROGRESS
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(16px, 3.5vw, 19px)',
            fontStyle: 'italic',
            color: '#00F5A0',
            maxWidth: 580,
            margin: '0 auto 36px',
            lineHeight: 1.6
          }}
        >
          "Every big idea starts with someone who believes in it before the world does."
        </p>

        {/* 12 Recipient Portal Directory for Founder Testing */}
        <div className="glass-panel" style={{ padding: '32px 28px', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#FFF' }}>
                Pre-Beta Tester Personal Links
              </h3>
              <p style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                Each recipient has their own isolated, personalized digital gift experience:
              </p>
            </div>
            <span style={{ fontSize: 12, color: '#00F5A0', fontWeight: 700 }}>
              12 Unique Gifts
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 12
            }}
          >
            {RECIPIENT_SLUGS.map((slug) => {
              const rec = RECIPIENTS[slug];
              return (
                <button
                  key={slug}
                  onClick={() => navigateTo(slug)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '14px 16px',
                    borderRadius: 14,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 245, 160, 0.4)';
                    e.currentTarget.style.background = 'rgba(0, 245, 160, 0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>
                      {rec.name}
                    </span>
                    <span style={{ fontSize: 11, color: '#00F5A0', fontWeight: 600 }}>
                      Open →
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>
                    {rec.giftTitle}
                  </div>
                  <div style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
                    /thanks/{slug}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: 28, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
          With gratitude, Krish • Founder, Paymint
        </div>
      </div>
    </div>
  );
}
