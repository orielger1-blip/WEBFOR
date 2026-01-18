import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'שיחות טבעיות',
    description: 'בינה מלאכותית שמבינה הקשר וניואנסים, מספקת תגובות אנושיות שמשאירות את הלקוחות מעורבים.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'זמינות 24/7',
    description: 'לעולם לא תפספסו ליד. הבוט עובד סביב השעון, מטפל בפניות גם בזמן שאתם ישנים.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'תמיכה בריבוי עסקים',
    description: 'נהלו מספר עסקים מלוח בקרה אחד. כל עסק עם נתונים מבודדים והגדרות מותאמות אישית.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'התקנה פשוטה',
    description: 'התחברו לוואטסאפ בדקות. ללא צורך בתכנות. הגדרה פשוטה עם אפשרויות התאמה מתקדמות.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'העברה חכמה לנציג',
    description: 'הבינה המלאכותית יודעת מתי להעביר לאדם. מעבר חלק שמבטיח שנושאים מורכבים מקבלים יחס אישי.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'אנליטיקס בזמן אמת',
    description: 'עקבו אחר שיחות, זמני תגובה ושיעורי המרה. תובנות מבוססות נתונים לאופטימיזציה מתמדת.',
  },
];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  return (
    <section id="features" className="features" ref={ref} dir="rtl">
      <div className="section-bg">
        <div className="gradient-blur blur-1"></div>
        <div className="gradient-blur blur-2"></div>
      </div>

      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="section-tag">תכונות</span>
        <h2 className="section-title">
          כל מה שצריך כדי
          <br />
          <span className="gradient-text">להאיץ</span> את העסק שלך
        </h2>
        <p className="section-subtitle">
          תכונות מתקדמות שנועדו לעזור לך לאוטומט שירות לקוחות,
          להגדיל מכירות ולהצמיח את העסק ללא מאמץ.
        </p>
      </motion.div>

      <motion.div
        className="features-grid"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="feature-card"
            variants={cardVariants}
            whileHover={{
              y: -10,
              boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.25)',
              transition: { duration: 0.3 }
            }}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;
