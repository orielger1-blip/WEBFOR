import { motion } from 'framer-motion';
import ParticleNetwork from './ParticleNetwork';
import ChatPreviewCard from './ChatPreviewCard';

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

          {/* Mobile-only chat preview card */}
          <motion.div className="hero-chat-preview" variants={itemVariants}>
            <ChatPreviewCard />
          </motion.div>

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
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <div className="wa-header-info">
                  <span className="wa-header-name">Agentive AI</span>
                  <span className="wa-header-status">פעיל</span>
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
                <span>שאל את הסוכן...</span>
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
