import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Mobile Results/Benefits Section for Servebot
 * Hebrew RTL layout with 2x2 grid stat cards
 * Features animated counters, gold gradients, and touch feedback
 */

interface StatCard {
  stat: string;
  label: string;
  description: string;
  isAnimatedNumber?: boolean;
  targetNumber?: number;
  prefix?: string;
  suffix?: string;
}

const statCards: StatCard[] = [
  {
    stat: '24/7',
    label: 'זמינות מלאה',
    description: 'הסוכן שלנו פעיל בכל שעה, בכל יום - כולל חגים וסופי שבוע',
  },
  {
    stat: '< 3 שניות',
    label: 'זמן תגובה',
    description: 'תגובה מיידית לכל פנייה, ללא המתנה בתור',
    isAnimatedNumber: true,
    targetNumber: 3,
    prefix: '< ',
    suffix: ' שניות',
  },
  {
    stat: '\u221E',
    label: 'ללא הגבלה',
    description: 'כמות בלתי מוגבלת של שיחות במקביל, ללא עומסים',
  },
  {
    stat: '100%',
    label: 'התאמה אישית',
    description: 'הסוכן מותאם בדיוק לעסק שלכם, לשפה ולסגנון שלכם',
    isAnimatedNumber: true,
    targetNumber: 100,
    suffix: '%',
  },
];

// Animated counter hook
const useAnimatedCounter = (
  target: number,
  duration: number = 2000,
  startAnimation: boolean = false
): number => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease out cubic for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [target, duration, startAnimation]);

  return count;
};

// Individual stat card component with animated counter
const StatCardComponent = ({
  card,
  index,
  isInView,
}: {
  card: StatCard;
  index: number;
  isInView: boolean;
}) => {
  const [isActive, setIsActive] = useState(false);
  const animatedValue = useAnimatedCounter(
    card.targetNumber || 0,
    1500,
    isInView && card.isAnimatedNumber
  );

  const getDisplayStat = () => {
    if (card.isAnimatedNumber && isInView) {
      return `${card.prefix || ''}${animatedValue}${card.suffix || ''}`;
    }
    return card.stat;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.5,
        delay: 0.1 * (index + 1),
        ease: 'easeOut',
      }}
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => setIsActive(false)}
      onTouchCancel={() => setIsActive(false)}
      style={{
        background: 'var(--mobile-bg-card)',
        border: '1px solid var(--mobile-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--mobile-spacing-lg)',
        textAlign: 'center',
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
        transition: 'transform 0.2s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        transform: isActive ? 'scale(0.97)' : 'scale(1)',
        boxShadow: isActive
          ? '0 0 30px rgba(245, 158, 11, 0.25), inset 0 0 20px rgba(245, 158, 11, 0.05)'
          : '0 4px 20px rgba(0, 0, 0, 0.2)',
        borderColor: isActive ? 'rgba(245, 158, 11, 0.4)' : 'var(--mobile-border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow effect overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isActive
            ? 'radial-gradient(circle at center, rgba(245, 158, 11, 0.08) 0%, transparent 70%)'
            : 'transparent',
          pointerEvents: 'none',
          transition: 'background 0.3s ease',
        }}
      />

      {/* Stat Number with Gold Gradient */}
      <div
        style={{
          fontSize: '36px',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: 'var(--mobile-spacing-xs)',
          lineHeight: 1.1,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {getDisplayStat()}
      </div>

      {/* Label */}
      <h3
        style={{
          fontSize: '16px',
          fontWeight: 600,
          color: 'var(--mobile-text-primary)',
          margin: '0 0 var(--mobile-spacing-xs)',
          lineHeight: 1.3,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {card.label}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: '13px',
          color: 'var(--mobile-text-secondary)',
          margin: 0,
          lineHeight: 1.5,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {card.description}
      </p>
    </motion.div>
  );
};

const MobileResults = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section
      ref={sectionRef}
      id="results"
      className="mobile-section"
      dir="rtl"
      style={{
        background: 'var(--mobile-bg-secondary)',
      }}
    >
      {/* Section Header */}
      <motion.div
        className="mobile-section-header"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <span className="mobile-section-badge">יתרונות</span>
        <h2 className="mobile-section-title">
          למה לעבוד עם{' '}
          <span className="mobile-gradient-text">סוכן חכם</span>?
        </h2>
        <p className="mobile-section-subtitle">
          היתרונות שיהפכו את העסק שלכם ליעיל יותר
        </p>
      </motion.div>

      {/* 2x2 Grid of Stat Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'var(--mobile-spacing-md)',
        }}
      >
        {statCards.map((card, index) => (
          <StatCardComponent
            key={index}
            card={card}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>

      {/* Bottom CTA hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
        style={{
          textAlign: 'center',
          marginTop: 'var(--mobile-spacing-xl)',
        }}
      >
        <p
          style={{
            fontSize: '14px',
            color: 'var(--mobile-text-muted)',
            margin: 0,
          }}
        >
          מוכנים לשדרג את העסק שלכם?
        </p>
      </motion.div>
    </section>
  );
};

export default MobileResults;
