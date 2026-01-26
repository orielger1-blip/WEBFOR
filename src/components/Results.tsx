import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const capabilities = [
  {
    value: '24/7',
    label: 'זמינות מלאה',
    description: 'הסוכן עובד סביב השעון, גם כשאתם ישנים'
  },
  {
    value: 'זמן תגובה',
    suffix: 'מיידית',
    label: 'מענה מהיר',
    description: 'תשובה מיידית לכל פנייה, בכל שעה'
  },
  {
    value: 'ללא הגבלת',
    suffix: 'שיחות',
    label: 'כמות בלתי מוגבלת',
    description: 'אין מגבלה על כמות השיחות והפניות'
  },
  {
    value: '100%',
    label: 'התאמה אישית',
    description: 'כל סוכן נבנה במיוחד לעסק שלכם'
  },
];

const Results = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
    },
  };

  return (
    <section id="results" ref={ref} dir="rtl">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">יתרונות</span>
          <h2 className="section-title">
            למה לעבוד
            <br />
            <span className="gradient-text">עם סוכן חכם?</span>
          </h2>
          <p className="section-subtitle">
            סוכן דיגיטלי מביא יתרונות שאף עובד אנושי לא יכול להתחרות בהם.
          </p>
        </motion.div>

        <motion.div
          className="results-stats"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {capabilities.map((cap, index) => (
            <motion.div
              key={index}
              className="stat-card capability-card"
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <span className="stat-number">
                {cap.value}{cap.suffix && <span className="stat-suffix">{cap.suffix}</span>}
              </span>
              <span className="stat-label">{cap.label}</span>
              <p className="stat-description">{cap.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Results;
