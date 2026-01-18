import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const plans = [
  {
    name: 'בסיסי',
    price: { monthly: 199, yearly: 159 },
    description: 'מושלם לעסקים קטנים שמתחילים.',
    features: [
      '1,000 הודעות בחודש',
      'מספר וואטסאפ אחד',
      'תגובות AI בסיסיות',
      'תמיכה במייל',
      'אנליטיקס בסיסי',
    ],
    highlighted: false,
  },
  {
    name: 'מקצועי',
    price: { monthly: 499, yearly: 399 },
    description: 'לעסקים צומחים שצריכים יותר עוצמה.',
    features: [
      '10,000 הודעות בחודש',
      '3 מספרי וואטסאפ',
      'AI מתקדם עם הבנת הקשר',
      'תמיכה בעדיפות',
      'לוח בקרה אנליטי מלא',
      'אינטגרציות מותאמות',
      'תזמון פגישות',
    ],
    highlighted: true,
  },
  {
    name: 'ארגוני',
    price: { monthly: 1499, yearly: 1199 },
    description: 'לארגונים גדולים עם צרכים מורכבים.',
    features: [
      'הודעות ללא הגבלה',
      'מספרי וואטסאפ ללא הגבלה',
      'אימון AI מותאם אישית',
      'תמיכה 24/7 עם מנהל ייעודי',
      'אנליטיקס מתקדם ו-API',
      'תמיכה בריבוי עסקים',
      'אפשרויות White-label',
      'התחייבות SLA',
    ],
    highlighted: false,
  },
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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
    <section id="pricing" className="pricing" ref={ref} dir="rtl">
      <div className="section-bg">
        <div className="gradient-blur blur-3"></div>
      </div>

      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="section-tag">מחירים</span>
        <h2 className="section-title">
          מחירים פשוטים
          <br />
          <span className="gradient-text">ושקופים</span>
        </h2>
        <p className="section-subtitle">
          בחרו את התוכנית שמתאימה לעסק שלכם.
        </p>

        <div className="pricing-toggle">
          <span className={!isYearly ? 'active' : ''}>חודשי</span>
          <motion.button
            className={`toggle-switch ${isYearly ? 'yearly' : ''}`}
            onClick={() => setIsYearly(!isYearly)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="toggle-thumb"
              animate={{ x: isYearly ? -24 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </motion.button>
          <span className={isYearly ? 'active' : ''}>
            שנתי
            <span className="save-badge">חסכו 20%</span>
          </span>
        </div>
      </motion.div>

      <motion.div
        className="pricing-grid"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}
            variants={cardVariants}
            whileHover={{
              y: -10,
              transition: { duration: 0.3 }
            }}
          >
            {plan.highlighted && (
              <div className="popular-badge">הכי פופולרי</div>
            )}

            <div className="pricing-card-header">
              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-description">{plan.description}</p>
            </div>

            <div className="pricing-card-price">
              <span className="currency">₪</span>
              <motion.span
                className="price"
                key={isYearly ? 'yearly' : 'monthly'}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isYearly ? plan.price.yearly : plan.price.monthly}
              </motion.span>
              <span className="period">/חודש</span>
            </div>

            <ul className="pricing-features">
              {plan.features.map((feature, i) => (
                <li key={i}>
                  <svg viewBox="0 0 24 24" fill="none" className="check-icon">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <motion.button
              className={`pricing-cta ${plan.highlighted ? 'btn-primary' : 'btn-secondary'}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {plan.highlighted ? 'צור קשר עכשיו' : 'צור קשר'}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Pricing;
