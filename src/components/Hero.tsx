import { motion } from 'framer-motion';
import ParticleNetwork from './ParticleNetwork';
import ChatPreviewCard from './ChatPreviewCard';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as const },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
        delay: 0.1
      },
    },
  };

  return (
    <section id="hero" className="hero" dir="rtl">
      <ParticleNetwork />
      <div className="hero-overlay"></div>

      {/* Mobile gradient background overlay */}
      <div className="hero-mobile-gradient"></div>

      <div className="hero-grid">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Animated badge/pill */}
          <motion.div
            className="hero-badge"
            variants={badgeVariants}
          >
            <span className="hero-badge-dot"></span>
            <span className="hero-badge-text">סוכנים דיגיטליים מותאמים אישית</span>
          </motion.div>

          {/* Impactful headline */}
          <motion.h1 className="hero-title" variants={itemVariants}>
            <span className="hero-title-line">הסוכן שעובד</span>
            <br />
            <span className="gradient-text hero-title-accent">בשבילכם 24/7</span>
          </motion.h1>

          {/* Clear value proposition */}
          <motion.p className="hero-subtitle" variants={itemVariants}>
            <span className="hero-subtitle-text">
              לא עוד בוט גנרי. אנחנו מפתחים סוכנים חכמים שמבינים את העסק שלכם,
              מדברים בשפה שלכם, ועובדים סביב השעון — כאילו הם חלק מהצוות.
            </span>
          </motion.p>

          {/* TWO prominent CTA buttons (stacked on mobile) */}
          <motion.div className="hero-cta" variants={itemVariants}>
            <motion.a
              href="#contact"
              className="btn-primary hero-btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="btn-text">קבעו שיחת ייעוץ חינם</span>
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
            <motion.a
              href="#solutions"
              className="btn-secondary hero-btn-secondary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="btn-text">גלו איך זה עובד</span>
            </motion.a>
          </motion.div>

          {/* Mobile-only chat preview card (below CTAs) */}
          <motion.div
            className="hero-chat-preview"
            variants={itemVariants}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <ChatPreviewCard />
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
                  <span className="wa-header-name">Servebot AI</span>
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
