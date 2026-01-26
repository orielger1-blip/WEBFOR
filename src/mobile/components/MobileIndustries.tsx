import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * MobileIndustries - Ultra-compact emoji strip
 * Single row of industry icons with text below
 * ~60px total height, clean and minimal
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
        padding: 'var(--mobile-spacing-lg) var(--mobile-spacing-md)',
        background: 'var(--mobile-bg-primary)',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'center',
      }}
    >
      {/* Emoji Row - Single horizontal line */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '10px',
          flexWrap: 'nowrap',
        }}
      >
        {industries.map((industry, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.3,
              delay: 0.03 * index,
              ease: 'easeOut',
            }}
            style={{
              fontSize: '20px',
              lineHeight: 1,
              flexShrink: 0,
            }}
            title={industry.name}
          >
            {industry.icon}
          </motion.span>
        ))}
      </motion.div>

      {/* Text Label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.3 }}
        style={{
          fontSize: '13px',
          fontWeight: 500,
          color: 'var(--mobile-text-muted)',
          margin: 0,
          letterSpacing: '0.3px',
        }}
      >
        מתמחים במגוון תעשיות
      </motion.p>
    </section>
  );
};

export default MobileIndustries;
