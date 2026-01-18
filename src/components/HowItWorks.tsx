import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'חברו את הוואטסאפ',
    description: 'קשרו את חשבון הוואטסאפ העסקי שלכם בכמה קליקים. האינטגרציה המאובטחת שלנו מבטיחה שהנתונים שלכם מוגנים.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'התאימו את הבוט',
    description: 'הגדירו את העוזר הדיגיטלי שלכם עם קול המותג, המוצרים והכללים העסקיים שלכם. ללא צורך בתכנות.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'אמנו את הבינה המלאכותית',
    description: 'העלו את קטלוג המוצרים ושאלות נפוצות. הבינה המלאכותית לומדת את העסק שלכם כדי לספק תגובות מדויקות ומועילות.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 7h8M8 11h8M8 15h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'עלו לאוויר וצמחו',
    description: 'השיקו את הבוט וצפו בו מטפל באלפי שיחות. עקבו אחר הביצועים ומטבו בזמן אמת.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-it-works" className="how-it-works" ref={ref} dir="rtl">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="section-tag">איך זה עובד</span>
        <h2 className="section-title">
          התחילו בארבעה
          <br />
          <span className="gradient-text">צעדים פשוטים</span>
        </h2>
        <p className="section-subtitle">
          מהתקנה ועד לצמיחה, עשינו את התהליך חלק ככל האפשר.
          רוב העסקים עולים לאוויר תוך שעה.
        </p>
      </motion.div>

      <div className="steps-container">
        <div className="steps-line"></div>

        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="step"
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="step-content">
              <motion.div
                className="step-icon-wrapper"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="step-number">{step.number}</span>
                <div className="step-icon">{step.icon}</div>
              </motion.div>

              <div className="step-text">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            </div>

            <motion.div
              className="step-dot"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
