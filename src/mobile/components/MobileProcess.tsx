import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Mobile Process Section for Servebot
 * Hebrew RTL vertical timeline layout with scroll-triggered animations
 * Shows the 4-step agent building process
 */

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'שיחת היכרות',
    description: 'נפגש להבין את העסק שלכם לעומק — האתגרים, התהליכים, והיעדים. בסוף השיחה תקבלו המלצה ראשונית.',
  },
  {
    number: '02',
    title: 'אפיון ותכנון',
    description: 'נכתוב מסמך אפיון מפורט שמגדיר בדיוק מה הסוכן יעשה, איך הוא יגיב, ואיך הוא ישתלב במערכות שלכם.',
  },
  {
    number: '03',
    title: 'פיתוח ואימון',
    description: 'נבנה את הסוכן, נאמן אותו על המידע והשפה שלכם, ונבצע סימולציות לוודא שהוא מתנהג כמו שרציתם.',
  },
  {
    number: '04',
    title: 'השקה וליווי',
    description: 'נעלה את הסוכן לאוויר, נעקוב אחרי הביצועים, ונבצע אופטימיזציות שוטפות עם לוח בקרה מלא.',
  },
];

const MobileProcess = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      id="process"
      className="mobile-section"
      dir="rtl"
      style={{
        background: 'var(--mobile-bg-secondary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Section Header */}
      <motion.div
        className="mobile-section-header"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <span className="mobile-section-badge">התהליך</span>
        <h2 className="mobile-section-title">
          איך אנחנו{' '}
          <span className="mobile-gradient-text">בונים את הסוכן</span>
        </h2>
      </motion.div>

      {/* Timeline Container */}
      <div
        style={{
          position: 'relative',
          paddingRight: '40px', // Space for timeline on right (RTL)
        }}
      >
        {/* Vertical Timeline Line - Gold Gradient */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            right: '15px', // Position on right side for RTL
            top: '24px',
            bottom: '24px',
            width: '2px',
            background: 'linear-gradient(180deg, var(--mobile-gold-light) 0%, var(--mobile-gold-primary) 50%, var(--mobile-gold-dark) 100%)',
            transformOrigin: 'top',
            borderRadius: '2px',
            boxShadow: '0 0 8px rgba(245, 158, 11, 0.4)',
          }}
        />

        {/* Process Steps */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--mobile-spacing-xl)',
          }}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.3 + index * 0.15,
                ease: 'easeOut',
              }}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--mobile-spacing-md)',
              }}
            >
              {/* Step Number Circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.4 + index * 0.15,
                  type: 'spring',
                  stiffness: 200,
                }}
                style={{
                  position: 'absolute',
                  right: '-40px', // Align with timeline
                  top: '0',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--mobile-bg-secondary)',
                  border: '2px solid var(--mobile-gold-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--mobile-gold-primary)',
                  boxShadow: '0 0 12px rgba(245, 158, 11, 0.3)',
                  zIndex: 2,
                }}
              >
                {step.number}
              </motion.div>

              {/* Step Content Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  flex: 1,
                  background: 'var(--mobile-bg-card)',
                  border: '1px solid var(--mobile-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--mobile-spacing-lg)',
                  textAlign: 'right',
                  cursor: 'pointer',
                  WebkitTapHighlightColor: 'transparent',
                  transition: 'border-color 0.2s ease',
                }}
              >
                {/* Step Title */}
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: 'var(--mobile-text-primary)',
                    margin: '0 0 var(--mobile-spacing-xs)',
                    lineHeight: 1.3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--mobile-spacing-xs)',
                  }}
                >
                  <span
                    style={{
                      color: 'var(--mobile-gold-primary)',
                      fontWeight: 700,
                    }}
                  >
                    {step.number}
                  </span>
                  {step.title}
                </h3>

                {/* Step Description */}
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--mobile-text-secondary)',
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {step.description}
                </p>

                {/* Progress Indicator for Active Step Look */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + index * 0.15,
                    ease: 'easeOut',
                  }}
                  style={{
                    marginTop: 'var(--mobile-spacing-md)',
                    height: '2px',
                    background: 'linear-gradient(90deg, var(--mobile-gold-primary) 0%, transparent 100%)',
                    borderRadius: '2px',
                    opacity: 0.5,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Glow */}
      <div
        style={{
          position: 'absolute',
          right: '-50%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '100%',
          height: '300px',
          background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
    </section>
  );
};

export default MobileProcess;
