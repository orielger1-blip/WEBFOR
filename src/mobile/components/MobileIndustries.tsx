import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * MobileIndustries - Horizontal scroll pills
 * [💎 תכשיטים] [🏥 רפואה] [🏠 נדל"ן] →
 */

const industries = [
  { icon: '💎', name: 'תכשיטים' },
  { icon: '🏥', name: 'רפואה' },
  { icon: '🏠', name: 'נדל"ן' },
  { icon: '🍽️', name: 'מסעדות' },
  { icon: '🛒', name: 'קמעונאות' },
  { icon: '🚗', name: 'רכב' },
  { icon: '✈️', name: 'תיירות' },
  { icon: '💼', name: 'שירותים' },
];

const MobileIndustries = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20px' });

  return (
    <section
      ref={sectionRef}
      className="mobile-industries"
      dir="rtl"
      style={{
        padding: 'var(--mobile-spacing-md) 0',
        background: 'var(--mobile-bg-primary)',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Title */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3 }}
        style={{
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--mobile-text-muted)',
          textAlign: 'center',
          margin: '0 0 var(--mobile-spacing-sm)',
          letterSpacing: '0.5px',
        }}
      >
        מתמחים במגוון תעשיות
      </motion.p>

      {/* Horizontal Scroll Pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.1 }}
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          overflowY: 'hidden',
          paddingLeft: 'var(--mobile-spacing-md)',
          paddingRight: 'var(--mobile-spacing-md)',
          paddingBottom: '8px',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        className="mobile-industries-scroll"
      >
        {industries.map((industry, index) => (
          <div
            key={index}
            style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.15)',
              borderRadius: '100px',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontSize: '14px' }}>{industry.icon}</span>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--mobile-text-secondary)',
              }}
            >
              {industry.name}
            </span>
          </div>
        ))}
      </motion.div>

      <style>{`
        .mobile-industries-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default MobileIndustries;
