import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const solutions = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    ),
    title: 'סוכן מכירות ושירות',
    description: 'סוכן שמבין את המוצרים שלכם, עונה על שאלות, מוביל לקוחות בתהליך הרכישה, ומעביר לידים חמים לצוות.',
    features: ['מענה לשאלות על מוצרים', 'איסוף פרטי לקוח', 'תיאום פגישות', 'העברה לנציג אנושי'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: 'סוכן תזמון פגישות',
    description: 'סוכן שמנהל את היומן שלכם, מתאם פגישות עם לקוחות, שולח תזכורות ומטפל בשינויים וביטולים.',
    features: ['סנכרון עם יומן Google/Outlook', 'תזכורות אוטומטיות', 'ניהול זמינות', 'אישורים וביטולים'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
    title: 'סוכן אוטומציה פנימית',
    description: 'סוכן שמבצע משימות פנימיות — מעבד נתונים, מייצר דוחות, מנהל מלאי ומתריע על אירועים חשובים.',
    features: ['עיבוד נתונים אוטומטי', 'התראות בזמן אמת', 'אינטגרציה עם מערכות', 'דוחות מותאמים'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'סוכן רב-ערוצי',
    description: 'סוכן שפועל בו-זמנית בוואטסאפ, באתר, בטלגרם ובפייסבוק — חוויה אחידה בכל הפלטפורמות.',
    features: ['WhatsApp Business', 'צ\'אט באתר', 'Telegram', 'Facebook Messenger'],
  },
];

const Solutions = () => {
  const ref = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

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
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
    },
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const cardWidth = carouselRef.current.offsetWidth * 0.85; // 85% card width
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, solutions.length - 1));
    }
  };

  const scrollToCard = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth * 0.85;
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="solutions" ref={ref} dir="rtl">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">הפתרונות</span>
          <h2 className="section-title">
            סוכנים שעובדים
            <br />
            <span className="gradient-text">בשבילכם</span>
          </h2>
          <p className="section-subtitle">
            כל סוכן נבנה בהתאמה אישית לצרכים שלכם.
            לא תבניות — פתרון ייחודי שמבין את העסק שלכם.
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <motion.div
          className="solutions-grid solutions-desktop"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              className="solution-card card"
              variants={cardVariants}
            >
              <div className="solution-icon">{solution.icon}</div>
              <h3 className="solution-title">{solution.title}</h3>
              <p className="solution-description">{solution.description}</p>
              <ul className="solution-features">
                {solution.features.map((feature, i) => (
                  <li key={i}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Carousel */}
        <div className="solutions-carousel-wrapper solutions-mobile">
          <motion.div
            className="solutions-carousel"
            ref={carouselRef}
            onScroll={handleScroll}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="solution-card card carousel-card"
              >
                <div className="solution-icon">{solution.icon}</div>
                <h3 className="solution-title">{solution.title}</h3>
                <p className="solution-description">{solution.description}</p>
                <ul className="solution-features">
                  {solution.features.map((feature, i) => (
                    <li key={i}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* Carousel Dots */}
          <div className="carousel-dots">
            {solutions.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${activeIndex === index ? 'active' : ''}`}
                onClick={() => scrollToCard(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default Solutions;
