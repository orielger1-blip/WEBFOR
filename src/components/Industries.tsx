import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const industries = [
  { icon: '💎', name: 'תכשיטים ויהלומים' },
  { icon: '🏥', name: 'קליניקות רפואיות' },
  { icon: '🏠', name: 'נדל"ן' },
  { icon: '🍽️', name: 'מסעדות וקייטרינג' },
  { icon: '🛒', name: 'קמעונאות' },
  { icon: '🚗', name: 'רכב ושירותים' },
  { icon: '✈️', name: 'תיירות ונסיעות' },
  { icon: '💼', name: 'שירותים מקצועיים' },
];

const Industries = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
    },
  };

  return (
    <section id="industries" className="industries-section" ref={ref} dir="rtl">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">תעשיות</span>
          <h2 className="section-title">
            מתמחים במגוון
            <br />
            <span className="gradient-text">תעשיות</span>
          </h2>
          <p className="section-subtitle">
            בנינו סוכני AI לעשרות עסקים בתחומים מגוונים.
            הניסיון שלנו מאפשר התאמה מדויקת לכל תעשייה.
          </p>
        </motion.div>

        <motion.div
          className="industries-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              className="industry-card"
              variants={cardVariants}
              whileHover={{ y: -8 }}
            >
              <div className="industry-icon">{industry.icon}</div>
              <h3 className="industry-name">{industry.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Industries;
