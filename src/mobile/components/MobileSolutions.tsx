import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Mobile Solutions Section for Servebot
 * Hebrew RTL layout with horizontal scroll carousel
 * Features scroll snap, pagination dots, and touch-friendly swipe
 */

interface SolutionFeature {
  text: string;
}

interface SolutionCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: SolutionFeature[];
}

const solutionCards: SolutionCard[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <line x1="9" y1="10" x2="15" y2="10" />
        <line x1="12" y1="7" x2="12" y2="13" />
      </svg>
    ),
    title: 'סוכן מכירות ושירות',
    description: 'סוכן AI חכם שמנהל שיחות מכירה ושירות לקוחות 24/7, מזהה הזדמנויות ומסגור עסקאות.',
    features: [
      { text: 'מענה מיידי בכל שעה' },
      { text: 'זיהוי צרכי לקוח' },
      { text: 'העברה חלקה לנציג' },
      { text: 'דוחות וניתוח שיחות' },
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01" />
        <path d="M12 14h.01" />
        <path d="M16 14h.01" />
        <path d="M8 18h.01" />
        <path d="M12 18h.01" />
      </svg>
    ),
    title: 'סוכן תזמון פגישות',
    description: 'מתאם פגישות אוטומטי שמסנכרן יומנים, שולח תזכורות ומונע חפיפות.',
    features: [
      { text: 'סנכרון יומנים חכם' },
      { text: 'תזכורות אוטומטיות' },
      { text: 'ניהול ביטולים' },
      { text: 'אופטימיזציית זמנים' },
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    title: 'סוכן אוטומציה פנימית',
    description: 'אוטומציה של תהליכים פנימיים, ניהול משימות וסנכרון בין מערכות.',
    features: [
      { text: 'אוטומציית תהליכים' },
      { text: 'חיבור למערכות קיימות' },
      { text: 'ניהול workflow' },
      { text: 'התראות חכמות' },
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    title: 'סוכן רב-ערוצי',
    description: 'נוכחות אחידה בכל הערוצים - וואטסאפ, אתר, פייסבוק, אינסטגרם ועוד.',
    features: [
      { text: 'כל הערוצים במקום אחד' },
      { text: 'מעקב שיחות רציף' },
      { text: 'תגובה אחידה' },
      { text: 'ניתוח ערוצים' },
    ],
  },
];

// Checkmark icon component
const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '14px', height: '14px', flexShrink: 0 }}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const MobileSolutions = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });
  const [activeIndex, setActiveIndex] = useState(0);

  // Track scroll position to update active dot
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth * 0.85; // 85vw card width
    const gap = 16; // gap between cards

    // For RTL, scrollLeft is negative in some browsers
    const normalizedScroll = Math.abs(scrollLeft);
    const newIndex = Math.round(normalizedScroll / (cardWidth + gap));

    setActiveIndex(Math.min(Math.max(newIndex, 0), solutionCards.length - 1));
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Scroll to specific card when dot is clicked
  const scrollToCard = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.offsetWidth * 0.85;
    const gap = 16;
    const scrollPosition = index * (cardWidth + gap);

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="mobile-section"
      dir="rtl"
      style={{
        background: 'var(--mobile-bg-secondary)',
        paddingLeft: 0,
        paddingRight: 0,
        overflow: 'hidden',
      }}
    >
      {/* Section Header */}
      <motion.div
        className="mobile-section-header"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          paddingLeft: 'var(--mobile-spacing-md)',
          paddingRight: 'var(--mobile-spacing-md)',
        }}
      >
        <span className="mobile-section-badge">הפתרונות</span>
        <h2 className="mobile-section-title">
          סוכנים שעובדים{' '}
          <span className="mobile-gradient-text">בשבילכם</span>
        </h2>
        <p className="mobile-section-subtitle">
          כל סוכן מותאם לצרכים הספציפיים של העסק שלכם
        </p>
      </motion.div>

      {/* Horizontal Scroll Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div
          ref={scrollContainerRef}
          style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            overflowY: 'hidden',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
            paddingLeft: 'var(--mobile-spacing-md)',
            paddingRight: 'var(--mobile-spacing-md)',
            paddingBottom: 'var(--mobile-spacing-md)',
            // Hide scrollbar
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className="mobile-solutions-scroll"
        >
          {solutionCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1 * (index + 1),
                ease: 'easeOut',
              }}
              style={{
                flex: '0 0 85vw',
                maxWidth: '340px',
                minWidth: '280px',
                scrollSnapAlign: 'start',
                background: 'var(--mobile-bg-card)',
                border: '1px solid var(--mobile-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--mobile-spacing-lg)',
                textAlign: 'right',
              }}
            >
              {/* Icon Container */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%)',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--mobile-spacing-md)',
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    color: 'var(--mobile-gold-primary)',
                  }}
                >
                  {card.icon}
                </div>
              </div>

              {/* Card Title */}
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
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
                  margin: '0 0 var(--mobile-spacing-lg)',
                  lineHeight: 1.6,
                }}
              >
                {card.description}
              </p>

              {/* Features List */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--mobile-spacing-sm)',
                }}
              >
                {card.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--mobile-spacing-sm)',
                    }}
                  >
                    <div
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: 'rgba(245, 158, 11, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--mobile-gold-primary)',
                        flexShrink: 0,
                      }}
                    >
                      <CheckIcon />
                    </div>
                    <span
                      style={{
                        fontSize: '14px',
                        color: 'var(--mobile-text-secondary)',
                        lineHeight: 1.4,
                      }}
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: 'var(--mobile-spacing-lg)',
            paddingBottom: 'var(--mobile-spacing-xs)',
          }}
        >
          {solutionCards.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              aria-label={`Go to solution ${index + 1}`}
              style={{
                width: activeIndex === index ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                border: 'none',
                background: activeIndex === index
                  ? 'var(--mobile-gold-primary)'
                  : 'rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
                WebkitTapHighlightColor: 'transparent',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* CSS to hide scrollbar */}
      <style>{`
        .mobile-solutions-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default MobileSolutions;
