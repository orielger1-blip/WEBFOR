import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Mobile Problem Section for Servebot
 * Hebrew RTL layout with scroll-triggered animations
 * Highlights business pain points that Servebot solves
 */

interface ProblemCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const problemCards: ProblemCard[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    title: 'פניות שנופלות בין הכיסאות',
    description: 'לקוחות פונים בשעות לא שגרתיות, בסופי שבוע ובלילות. כל פנייה שלא נענתה היא עסקה שהלכה למתחרים.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'צוות עמוס ושחוק',
    description: 'אנשי המכירות והשירות שלכם מבלים שעות על שאלות חוזרות במקום להתמקד בעסקאות גדולות.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: 'הזדמנויות שמתפספסות',
    description: 'לידים חמים מתקררים כי אין מי שיענה להם מיד. המתחרים שמגיבים מהר לוקחים את העסקאות.',
  },
];

const MobileProblem = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="mobile-section"
      dir="rtl"
      style={{
        background: 'var(--mobile-bg-primary)',
      }}
    >
      {/* Section Header */}
      <motion.div
        className="mobile-section-header"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <span className="mobile-section-badge">הבעיה</span>
        <h2 className="mobile-section-title">
          כמה עסקאות אתם{' '}
          <span className="mobile-gradient-text">מפספסים</span> כל חודש?
        </h2>
      </motion.div>

      {/* Problem Cards Stack */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--mobile-spacing-md)',
        }}
      >
        {problemCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.15 * (index + 1),
              ease: 'easeOut',
            }}
            style={{
              background: 'var(--mobile-bg-card)',
              border: '1px solid var(--mobile-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--mobile-spacing-lg)',
              textAlign: 'right',
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent',
              transition: 'transform 0.2s ease, border-color 0.2s ease',
            }}
            whileHover={{
              scale: 1.02,
              borderColor: 'rgba(245, 158, 11, 0.3)',
            }}
            whileTap={{
              scale: 0.98,
            }}
          >
            {/* Icon Container */}
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(245, 158, 11, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--mobile-spacing-md)',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  color: 'var(--mobile-gold-primary)',
                }}
              >
                {card.icon}
              </div>
            </div>

            {/* Card Title */}
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--mobile-text-primary)',
                margin: '0 0 var(--mobile-spacing-xs)',
                lineHeight: 1.3,
              }}
            >
              {card.title}
            </h3>

            {/* Card Description */}
            <p
              style={{
                fontSize: '14px',
                color: 'var(--mobile-text-secondary)',
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MobileProblem;
