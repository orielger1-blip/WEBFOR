import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const problems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    title: 'פניות שנופלות בין הכיסאות',
    description: 'לקוחות פונים בשעות לא שגרתיות, בסופי שבוע ובלילות. כל פנייה שלא נענתה היא עסקה שהלכה למתחרים.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'צוות עמוס ושחוק',
    description: 'אנשי המכירות והשירות שלכם מבלים שעות על שאלות חוזרות במקום להתמקד בעסקאות גדולות ויחסי לקוחות.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: 'הזדמנויות שמתפספסות',
    description: 'לידים חמים מתקררים כי אין מי שיענה להם מיד. המתחרים שמגיבים מהר יותר לוקחים את העסקאות.',
  },
];

const Problem = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
    },
  };

  return (
    <section id="problem" className="problem-section" ref={ref} dir="rtl">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">הבעיה</span>
          <h2 className="section-title">
            כמה עסקאות אתם
            <br />
            <span className="gradient-text">מפספסים</span> כל חודש?
          </h2>
          <p className="section-subtitle">
            עסקים רבים מאבדים הזדמנויות יקרות בגלל זמני תגובה איטיים
            וחוסר יכולת לתת שירות רציף ואיכותי.
          </p>
        </motion.div>

        <motion.div
          className="problem-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              className="problem-card card"
              variants={cardVariants}
            >
              <div className="problem-icon">{problem.icon}</div>
              <h3 className="problem-title">{problem.title}</h3>
              <p className="problem-description">{problem.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Problem;
