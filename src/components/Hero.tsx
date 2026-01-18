import { motion } from 'framer-motion';
import ParticleNetwork from './ParticleNetwork';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const },
    },
  };

  return (
    <section className="hero" dir="rtl">
      <ParticleNetwork />
      <div className="hero-overlay"></div>

      <div className="hero-grid">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-badge" variants={itemVariants}>
            <span className="hero-badge-dot"></span>
            <span>סוכנים דיגיטליים מותאמים אישית</span>
          </motion.div>

          <motion.h1 className="hero-title" variants={itemVariants}>
            הסוכן שעובד
            <br />
            <span className="gradient-text">בשבילכם 24/7</span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            לא עוד בוט גנרי. אנחנו מפתחים סוכנים חכמים שמבינים את העסק שלכם,
            מדברים בשפה שלכם, ועובדים סביב השעון — כאילו הם חלק מהצוות.
          </motion.p>

          <motion.div className="hero-cta" variants={itemVariants}>
            <motion.a
              href="#contact"
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              קבעו שיחת ייעוץ
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
            <motion.a
              href="#solutions"
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 20, height: 20 }}>
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/>
              </svg>
              איך זה עובד
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-mockup"
          initial={{ opacity: 0, x: -50, rotateY: -10 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.4, 0, 0.2, 1] as const }}
        >
          <div className="phone-mockup">
            <div className="phone-notch"></div>
            <div className="phone-screen">
              <div className="wa-header">
                <div className="wa-header-avatar">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M6 20c0-4 3-6 6-6s6 2 6 6"/>
                  </svg>
                </div>
                <div className="wa-header-info">
                  <span className="wa-header-name">Agentive</span>
                  <span className="wa-header-status">מקליד...</span>
                </div>
              </div>
              <div className="wa-chat">
                <motion.div
                  className="wa-message wa-incoming"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  היי, אני מעוניין לשמוע על השירותים שלכם
                </motion.div>
                <motion.div
                  className="wa-message wa-outgoing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 }}
                >
                  שלום! שמחים שפנית אלינו 😊
                  <br /><br />
                  אנחנו מתמחים בבניית סוכנים דיגיטליים חכמים לעסקים.
                  <br /><br />
                  באיזה תחום העסק שלך פועל?
                </motion.div>
                <motion.div
                  className="wa-message wa-incoming"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.4 }}
                >
                  יש לי רשת חנויות תכשיטים
                </motion.div>
                <motion.div
                  className="wa-message wa-outgoing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3 }}
                >
                  מעולה! יש לנו ניסיון רב עם עסקים בתחום.
                  <br /><br />
                  רוצה לקבוע שיחה קצרה כדי שנבין איך נוכל לעזור?
                </motion.div>
              </div>
              <div className="wa-input">
                <span>הקלד הודעה</span>
              </div>
            </div>
          </div>
          <div className="mockup-glow"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
