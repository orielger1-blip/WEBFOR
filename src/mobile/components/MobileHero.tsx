/**
 * MobileHero Component for Servebot
 * Hebrew RTL full-viewport hero section with premium animations
 * Performance-optimized with CSS keyframes (no heavy Framer Motion)
 *
 * Features:
 * - Full viewport height (100dvh with fallbacks)
 * - Centered, vertically stacked content
 * - Animated particle/gradient background
 * - Touch-optimized CTAs (min 44px)
 * - Safe area awareness for notched devices
 */

import { useEffect, useState } from 'react';

// Inline styles for CSS-in-JS (avoiding external CSS for component portability)
const styles = {
  // Keyframe animations as a style tag
  keyframes: `
    @keyframes heroFadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes heroFadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes heroScaleIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes heroPulse {
      0%, 100% {
        opacity: 0.4;
      }
      50% {
        opacity: 0.7;
      }
    }

    @keyframes heroFloat {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    @keyframes heroGradientShift {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    @keyframes heroParticleFloat1 {
      0%, 100% {
        transform: translate(0, 0) scale(1);
        opacity: 0.3;
      }
      25% {
        transform: translate(20px, -30px) scale(1.1);
        opacity: 0.5;
      }
      50% {
        transform: translate(-10px, -50px) scale(0.9);
        opacity: 0.4;
      }
      75% {
        transform: translate(-30px, -20px) scale(1.05);
        opacity: 0.6;
      }
    }

    @keyframes heroParticleFloat2 {
      0%, 100% {
        transform: translate(0, 0) scale(1);
        opacity: 0.2;
      }
      33% {
        transform: translate(-25px, 40px) scale(1.2);
        opacity: 0.4;
      }
      66% {
        transform: translate(15px, 20px) scale(0.8);
        opacity: 0.3;
      }
    }

    @keyframes heroParticleFloat3 {
      0%, 100% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 0.25;
      }
      50% {
        transform: translate(30px, -40px) rotate(180deg);
        opacity: 0.45;
      }
    }

    @keyframes heroGlowPulse {
      0%, 100% {
        opacity: 0.3;
        transform: scale(1);
      }
      50% {
        opacity: 0.5;
        transform: scale(1.1);
      }
    }

    @keyframes heroButtonShimmer {
      0% {
        background-position: -200% center;
      }
      100% {
        background-position: 200% center;
      }
    }

    /* Hero section viewport height with fallbacks */
    .mobile-hero-section {
      min-height: 100vh;
      min-height: 100dvh;
      min-height: -webkit-fill-available;
    }
  `,
};

const MobileHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Inject keyframe animations */}
      <style>{styles.keyframes}</style>

      <section
        id="hero"
        dir="rtl"
        className="mobile-hero-section"
        style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'calc(60px + env(safe-area-inset-top, 0px)) 20px calc(32px + env(safe-area-inset-bottom, 0px))',
          background: '#0a0a0f',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        {/* Animated Background Layer */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        >
          {/* Gradient Orbs */}
          <div
            style={{
              position: 'absolute',
              top: '10%',
              right: '10%',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(60px)',
              animation: 'heroGlowPulse 8s ease-in-out infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '20%',
              left: '5%',
              width: '250px',
              height: '250px',
              background: 'radial-gradient(circle, rgba(94, 234, 212, 0.12) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(50px)',
              animation: 'heroGlowPulse 10s ease-in-out infinite 2s',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(20, 184, 166, 0.08) 0%, transparent 60%)',
              borderRadius: '50%',
              filter: 'blur(80px)',
              animation: 'heroGlowPulse 12s ease-in-out infinite 1s',
            }}
          />

          {/* Floating Particles */}
          <div
            style={{
              position: 'absolute',
              top: '15%',
              right: '20%',
              width: '6px',
              height: '6px',
              background: '#14b8a6',
              borderRadius: '50%',
              boxShadow: '0 0 10px rgba(20, 184, 166, 0.5)',
              animation: 'heroParticleFloat1 15s ease-in-out infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '25%',
              left: '15%',
              width: '4px',
              height: '4px',
              background: '#5eead4',
              borderRadius: '50%',
              boxShadow: '0 0 8px rgba(94, 234, 212, 0.4)',
              animation: 'heroParticleFloat2 18s ease-in-out infinite 3s',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '30%',
              right: '25%',
              width: '5px',
              height: '5px',
              background: '#14b8a6',
              borderRadius: '50%',
              boxShadow: '0 0 12px rgba(20, 184, 166, 0.6)',
              animation: 'heroParticleFloat3 20s ease-in-out infinite 1s',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '60%',
              left: '30%',
              width: '3px',
              height: '3px',
              background: '#5eead4',
              borderRadius: '50%',
              boxShadow: '0 0 6px rgba(94, 234, 212, 0.4)',
              animation: 'heroParticleFloat1 22s ease-in-out infinite 5s',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '15%',
              left: '60%',
              width: '4px',
              height: '4px',
              background: '#14b8a6',
              borderRadius: '50%',
              boxShadow: '0 0 8px rgba(20, 184, 166, 0.5)',
              animation: 'heroParticleFloat2 16s ease-in-out infinite 2s',
            }}
          />

          {/* Subtle Grid Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(20, 184, 166, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(20, 184, 166, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              opacity: 0.5,
            }}
          />
        </div>

        {/* Content Container */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            maxWidth: '100%',
            width: '100%',
            gap: '24px',
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: 'rgba(20, 184, 166, 0.1)',
              border: '1px solid rgba(20, 184, 166, 0.25)',
              borderRadius: '100px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#14b8a6',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
              transitionDelay: '0.1s',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span>סוכנים דיגיטליים מותאמים אישית</span>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontSize: 'clamp(32px, 10vw, 48px)',
              fontWeight: 700,
              lineHeight: 1.15,
              margin: 0,
              color: '#ffffff',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
              transitionDelay: '0.25s',
            }}
          >
            <span style={{ display: 'block' }}>הסוכן שעובד</span>
            <span
              style={{
                display: 'block',
                background: 'linear-gradient(135deg, #5eead4 0%, #14b8a6 50%, #0f766e 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: isVisible ? 'heroGradientShift 6s ease-in-out infinite' : 'none',
              }}
            >
              בשבילכם 24/7
            </span>
          </h1>

          {/* Subtitle / Value Proposition */}
          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.75)',
              maxWidth: '340px',
              margin: 0,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
              transitionDelay: '0.4s',
            }}
          >
            סוכני AI חכמים שעונים ללקוחות, מתאמים פגישות וסוגרים עסקאות -
            בזמן שאתם ישנים
          </p>

          {/* CTA Buttons Stack */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              width: '100%',
              maxWidth: '320px',
              marginTop: '8px',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
              transitionDelay: '0.55s',
            }}
          >
            {/* Primary CTA */}
            <a
              href="#contact"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                minHeight: '52px',
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #5eead4 0%, #14b8a6 100%)',
                color: '#000000',
                fontSize: '17px',
                fontWeight: 600,
                textDecoration: 'none',
                borderRadius: '14px',
                border: 'none',
                boxShadow: '0 4px 24px rgba(20, 184, 166, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onTouchStart={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)';
              }}
              onTouchEnd={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>קבעו שיחת ייעוץ חינם</span>
            </a>

            {/* Secondary CTA */}
            <a
              href="#solutions"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                minHeight: '52px',
                padding: '14px 28px',
                background: 'rgba(255, 255, 255, 0.04)',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: 500,
                textDecoration: 'none',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
                transition: 'transform 0.2s ease, background 0.2s ease, border-color 0.2s ease',
              }}
              onTouchStart={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.transform = 'scale(0.97)';
                target.style.background = 'rgba(255, 255, 255, 0.08)';
                target.style.borderColor = 'rgba(20, 184, 166, 0.3)';
              }}
              onTouchEnd={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.transform = 'scale(1)';
                target.style.background = 'rgba(255, 255, 255, 0.04)';
                target.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
              </svg>
              <span>גלו איך זה עובד</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              marginTop: '24px',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
              transitionDelay: '0.7s',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>ללא התחייבות</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>תוצאות מהיום הראשון</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            opacity: isVisible ? 0.6 : 0,
            transition: 'opacity 0.7s ease-out',
            transitionDelay: '1s',
          }}
          aria-hidden="true"
        >
          <span
            style={{
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.5)',
              letterSpacing: '0.5px',
            }}
          >
            גלול למטה
          </span>
          <div
            style={{
              width: '24px',
              height: '40px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '8px',
            }}
          >
            <div
              style={{
                width: '3px',
                height: '8px',
                borderRadius: '2px',
                background: 'rgba(20, 184, 166, 0.6)',
                animation: 'heroFloat 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default MobileHero;
